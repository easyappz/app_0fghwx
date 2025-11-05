from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Разрешаем безопасные методы всем; небезопасные проверяются на уровне объекта
        if request.method in SAFE_METHODS:
            return True
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        owner = getattr(obj, 'owner', None)
        return owner == request.user
