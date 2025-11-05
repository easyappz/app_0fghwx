from decimal import Decimal, InvalidOperation

from django.contrib.auth import get_user_model
from django.db.models import Q
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.filters import OrderingFilter
from drf_spectacular.utils import extend_schema

from .authentication import JWTAuthentication
from .jwt_utils import create_access_token, create_refresh_token, decode_jwt
from .models import Ad, Profile
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    MessageSerializer,
    RegisterSerializer,
    LoginSerializer,
    RefreshSerializer,
    UserPublicSerializer,
    ProfileSerializer,
    MeUpdateSerializer,
    AdListSerializer,
    AdDetailSerializer,
    AdCreateUpdateSerializer,
)


class HelloView(APIView):
    """
    A simple API endpoint that returns a greeting message.
    """

    @extend_schema(
        responses={200: MessageSerializer}, description="Get a hello world message"
    )
    def get(self, request):
        data = {"message": "Hello!", "timestamp": timezone.now()}
        serializer = MessageSerializer(data)
        return Response(serializer.data)


class AuthRegisterView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        profile = Profile.objects.get(user=user)
        access = create_access_token(user.id)
        refresh = create_refresh_token(user.id)
        return Response(
            {
                'user': UserPublicSerializer(user, context={'request': request}).data,
                'profile': ProfileSerializer(profile, context={'request': request}).data,
                'access': access,
                'refresh': refresh,
            },
            status=status.HTTP_201_CREATED,
        )


class AuthLoginView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email'].strip().lower()
        password = serializer.validated_data['password']

        User = get_user_model()
        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return Response({'detail': 'Неверные учетные данные.'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(password):
            return Response({'detail': 'Неверные учетные данные.'}, status=status.HTTP_400_BAD_REQUEST)

        if not hasattr(user, 'profile'):
            Profile.objects.get_or_create(user=user)
        access = create_access_token(user.id)
        refresh = create_refresh_token(user.id)
        return Response(
            {
                'user': UserPublicSerializer(user, context={'request': request}).data,
                'profile': ProfileSerializer(user.profile, context={'request': request}).data,
                'access': access,
                'refresh': refresh,
            }
        )


class TokenRefreshView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        serializer = RefreshSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        refresh = serializer.validated_data['refresh']
        try:
            payload = decode_jwt(refresh)
        except Exception:
            return Response({'detail': 'Неверный или истекший refresh токен.'}, status=status.HTTP_400_BAD_REQUEST)
        if payload.get('type') != 'refresh':
            return Response({'detail': 'Недопустимый тип токена.'}, status=status.HTTP_400_BAD_REQUEST)
        user_id = payload.get('sub')
        access = create_access_token(user_id)
        return Response({'access': access})


class MeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get(self, request):
        user = request.user
        profile, _ = Profile.objects.get_or_create(user=user)
        data = ProfileSerializer(profile, context={'request': request}).data
        return Response(data)

    def patch(self, request):
        user = request.user
        profile, _ = Profile.objects.get_or_create(user=user)

        serializer = MeUpdateSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        name = serializer.validated_data.get('name')
        phone = serializer.validated_data.get('phone')
        avatar = serializer.validated_data.get('avatar')

        updated = False
        if name is not None:
            user.first_name = name
            user.save(update_fields=['first_name'])
            updated = True
        if phone is not None:
            profile.phone = phone
            updated = True
        if avatar is not None:
            profile.avatar = avatar
            updated = True
        if updated:
            profile.save()

        data = ProfileSerializer(profile, context={'request': request}).data
        return Response(data)


class AdsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50


class AdsViewSet(viewsets.ModelViewSet):
    queryset = Ad.objects.all()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsOwnerOrReadOnly]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    pagination_class = AdsPagination
    filter_backends = [OrderingFilter]
    ordering_fields = ['created_at', 'price']
    ordering = ['-created_at']

    def get_permissions(self):
        perms = [IsOwnerOrReadOnly()]
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            perms.append(IsAuthenticated())
        return perms

    def get_queryset(self):
        qs = Ad.objects.all()
        if self.action in ['list']:
            qs = qs.filter(is_active=True)

        params = self.request.query_params
        q = params.get('q')
        owner = params.get('owner')
        min_price = params.get('min_price')
        max_price = params.get('max_price')

        if q:
            qs = qs.filter(Q(title__icontains=q) | Q(description__icontains=q))
        if owner:
            qs = qs.filter(owner_id=owner)
        if min_price:
            try:
                qs = qs.filter(price__gte=Decimal(min_price))
            except (InvalidOperation, ValueError):
                pass
        if max_price:
            try:
                qs = qs.filter(price__lte=Decimal(max_price))
            except (InvalidOperation, ValueError):
                pass

        return qs

    def get_serializer_class(self):
        if self.action == 'list':
            return AdListSerializer
        if self.action == 'retrieve':
            return AdDetailSerializer
        if self.action in ['create', 'update', 'partial_update']:
            return AdCreateUpdateSerializer
        return AdDetailSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        input_serializer = self.get_serializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        ad = input_serializer.save(owner=request.user)
        output = AdDetailSerializer(ad, context={'request': request})
        return Response(output.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        input_serializer = self.get_serializer(instance, data=request.data, partial=False)
        input_serializer.is_valid(raise_exception=True)
        ad = input_serializer.save()
        output = AdDetailSerializer(ad, context={'request': request})
        return Response(output.data)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        input_serializer = self.get_serializer(instance, data=request.data, partial=True)
        input_serializer.is_valid(raise_exception=True)
        ad = input_serializer.save()
        output = AdDetailSerializer(ad, context={'request': request})
        return Response(output.data)
