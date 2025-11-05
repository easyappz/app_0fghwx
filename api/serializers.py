from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Ad, Profile


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)
    timestamp = serializers.DateTimeField(read_only=True)


class UserPublicSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='first_name')

    class Meta:
        model = get_user_model()
        fields = ['id', 'name', 'email']
        read_only_fields = ['id', 'name', 'email']


class AdShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = ['id', 'title', 'price']


class AdListSerializer(serializers.ModelSerializer):
    owner = UserPublicSerializer(read_only=True)
    image = serializers.ImageField(read_only=True)

    class Meta:
        model = Ad
        fields = ['id', 'title', 'price', 'image', 'owner', 'created_at']
        read_only_fields = ['id', 'image', 'owner', 'created_at']


class AdDetailSerializer(serializers.ModelSerializer):
    owner = UserPublicSerializer(read_only=True)
    image = serializers.ImageField(read_only=True)

    class Meta:
        model = Ad
        fields = [
            'id', 'title', 'description', 'price', 'image', 'is_active',
            'owner', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']


class AdCreateUpdateSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Ad
        fields = ['title', 'description', 'price', 'image', 'is_active']


class ProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    avatar = serializers.ImageField(read_only=True)
    ads = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['name', 'email', 'phone', 'avatar', 'ads', 'created_at', 'updated_at']
        read_only_fields = ['name', 'email', 'ads', 'created_at', 'updated_at']

    def get_name(self, obj):
        return obj.user.first_name

    def get_email(self, obj):
        return obj.user.email

    def get_ads(self, obj):
        qs = obj.user.ads.all().order_by('-created_at')
        return AdShortSerializer(qs, many=True, context=self.context).data


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    phone = serializers.CharField(max_length=32, required=False, allow_blank=True)

    def validate_email(self, value):
        User = get_user_model()
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('Пользователь с таким email уже существует.')
        return value

    def create(self, validated_data):
        User = get_user_model()
        name = validated_data.get('name', '').strip()
        email = validated_data['email'].strip().lower()
        password = validated_data['password']
        phone = validated_data.get('phone', '')

        user = User.objects.create(
            username=email,
            first_name=name,
            email=email,
        )
        user.set_password(password)
        user.save()
        Profile.objects.create(user=user, phone=phone)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class RefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()


class MeUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    phone = serializers.CharField(max_length=32, required=False, allow_blank=True)
    avatar = serializers.ImageField(required=False, allow_null=True)
