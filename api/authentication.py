from typing import Optional, Tuple

from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from .jwt_utils import decode_jwt


class JWTAuthentication(BaseAuthentication):
    keyword = 'Bearer'

    def authenticate(self, request) -> Optional[Tuple[object, None]]:
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None
        parts = auth_header.split()
        if len(parts) != 2 or parts[0] != self.keyword:
            raise AuthenticationFailed('Неверный формат заголовка Authorization. Ожидается "Bearer <token>".')
        token = parts[1]
        try:
            payload = decode_jwt(token)
        except Exception:
            raise AuthenticationFailed('Неверный или истекший токен.')

        token_type = payload.get('type')
        if token_type != 'access':
            raise AuthenticationFailed('Недопустимый тип токена для доступа.')

        user_id = payload.get('sub')
        if not user_id:
            raise AuthenticationFailed('Неверный токен: отсутствует идентификатор пользователя.')

        User = get_user_model()
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise AuthenticationFailed('Пользователь не найден.')

        return (user, None)
