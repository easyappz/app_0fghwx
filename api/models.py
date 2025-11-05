from django.db import models
from django.conf import settings


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
        verbose_name="Пользователь",
    )
    phone = models.CharField(max_length=32, blank=True, verbose_name="Телефон")
    avatar = models.ImageField(
        upload_to="avatars/", blank=True, null=True, verbose_name="Аватар"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Обновлено")

    class Meta:
        verbose_name = "Профиль"
        verbose_name_plural = "Профили"
        indexes = [
            models.Index(fields=["user"], name="profile_user_idx"),
            models.Index(fields=["phone"], name="profile_phone_idx"),
        ]

    def __str__(self) -> str:
        return f"Profile(user={self.user_id})"


class Ad(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="ads",
        verbose_name="Владелец",
    )
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(
        max_digits=12, decimal_places=2, default=0, verbose_name="Цена"
    )
    image = models.ImageField(
        upload_to="ads/", blank=True, null=True, verbose_name="Изображение"
    )
    is_active = models.BooleanField(default=True, verbose_name="Активно")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Обновлено")

    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"
        indexes = [
            models.Index(fields=["title"], name="ad_title_idx"),
            models.Index(fields=["owner"], name="ad_owner_idx"),
            models.Index(fields=["price", "is_active"], name="ad_price_active_idx"),
        ]
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"Ad(id={self.pk}, title={self.title[:30]})"
