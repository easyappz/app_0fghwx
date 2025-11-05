from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    HelloView,
    AuthRegisterView,
    AuthLoginView,
    TokenRefreshView,
    MeView,
    AdsViewSet,
)

router = DefaultRouter()
router.register(r'ads', AdsViewSet, basename='ad')

urlpatterns = [
    path('hello/', HelloView.as_view(), name='hello'),
    path('auth/register/', AuthRegisterView.as_view(), name='auth-register'),
    path('auth/login/', AuthLoginView.as_view(), name='auth-login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='auth-refresh'),
    path('auth/me/', MeView.as_view(), name='auth-me'),
    path('', include(router.urls)),
]
