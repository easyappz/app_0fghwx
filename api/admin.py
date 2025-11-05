from django.contrib import admin

from .models import Ad, Profile


@admin.register(Ad)
class AdAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'owner', 'price', 'is_active', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('is_active',)
    autocomplete_fields = ('owner',)
    ordering = ('-created_at',)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone')
    search_fields = ('user__email', 'user__first_name', 'phone')
    autocomplete_fields = ('user',)
