from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import UserSerializer, LoginSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import login, logout
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password, check_password


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        password = serializer.validated_data['password']

        # Hash the password
        hashed_password = make_password(password)

        # Set the hashed password in the serializer
        serializer.validated_data['password'] = hashed_password

        # Create the user with the hashed password

        user = serializer.save()
        Token.objects.create(user=user)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        try:
            token = Token.objects.get(user=request.user)

            token.delete()
        except Token.DoesNotExist:
            print("dosent exist")

        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    def get(self, request):
        output = [
            {
                'username': output.username,
                'email': output.email,
                "first_name": output.first_name,
                'last_name': output.last_name,
                'password': output.password,
            } for output in User.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serialize = UserSerializer(data=request.data)
        if serialize.is_valid(raise_exception=True):
            serialize.save()
            return Response(serialize.data)
# Create your views here.