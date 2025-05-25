from django.contrib import admin
from .models import React
from django.contrib.auth import get_user_model

admin.site.register(React)

User = get_user_model()
# Register your models here.

if not User.objects.filter(username="admin123").exists():
    User.objects.create_superuser("admin123", "admin@example.com", "tempPassword123")