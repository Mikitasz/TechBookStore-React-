from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", 'first_name', 'last_name', 'email', 'password',]


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", 'first_name', 'last_name', 'email',]


class LogoutResponseSerializer(serializers.Serializer):
    message = serializers.CharField(default="Logout successful")


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
