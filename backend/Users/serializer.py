from rest_framework import serializers
from django.contrib.auth.models import User


from rest_framework import serializers


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", 'first_name', 'last_name', 'email',]


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']




class UserLogInSerializer(serializers.Serializer):
    username = serializers.CharField()  # Use CharField for username
    password = serializers.CharField()


class UserLogOutSerializer(serializers.Serializer):
    message = serializers.CharField(default="Logout successful")
