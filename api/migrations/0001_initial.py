from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(blank=True, max_length=32, verbose_name='Телефон')),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='avatars/', verbose_name='Аватар')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Создано')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Обновлено')),
                ('user', models.OneToOneField(on_delete=models.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Профиль',
                'verbose_name_plural': 'Профили',
            },
        ),
        migrations.CreateModel(
            name='Ad',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Заголовок')),
                ('description', models.TextField(verbose_name='Описание')),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=12, verbose_name='Цена')),
                ('image', models.ImageField(blank=True, null=True, upload_to='ads/', verbose_name='Изображение')),
                ('is_active', models.BooleanField(default=True, verbose_name='Активно')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Создано')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Обновлено')),
                ('owner', models.ForeignKey(on_delete=models.CASCADE, related_name='ads', to=settings.AUTH_USER_MODEL, verbose_name='Владелец')),
            ],
            options={
                'verbose_name': 'Объявление',
                'verbose_name_plural': 'Объявления',
                'ordering': ['-created_at'],
            },
        ),
        migrations.AddIndex(
            model_name='profile',
            index=models.Index(fields=['user'], name='profile_user_idx'),
        ),
        migrations.AddIndex(
            model_name='profile',
            index=models.Index(fields=['phone'], name='profile_phone_idx'),
        ),
        migrations.AddIndex(
            model_name='ad',
            index=models.Index(fields=['title'], name='ad_title_idx'),
        ),
        migrations.AddIndex(
            model_name='ad',
            index=models.Index(fields=['owner'], name='ad_owner_idx'),
        ),
        migrations.AddIndex(
            model_name='ad',
            index=models.Index(fields=['price', 'is_active'], name='ad_price_active_idx'),
        ),
    ]
