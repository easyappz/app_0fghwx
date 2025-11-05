import time
from typing import Any, Dict
import jwt

SECRET = 'easyappz-secret'
ALGORITHM = 'HS256'
ACCESS_TTL = 3600  # 1 hour
REFRESH_TTL = 604800  # 7 days


def _now_ts() -> int:
    return int(time.time())


def _build_payload(user_id: int, token_type: str, ttl: int) -> Dict[str, Any]:
    iat = _now_ts()
    exp = iat + ttl
    return {
        'sub': user_id,
        'type': token_type,
        'iat': iat,
        'exp': exp,
    }


def create_access_token(user_id: int) -> str:
    payload = _build_payload(user_id, 'access', ACCESS_TTL)
    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)


def create_refresh_token(user_id: int) -> str:
    payload = _build_payload(user_id, 'refresh', REFRESH_TTL)
    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)


def decode_jwt(token: str) -> Dict[str, Any]:
    return jwt.decode(token, SECRET, algorithms=[ALGORITHM])
