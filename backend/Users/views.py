from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import UserSerializer, LoginSerializer, CurrentUserSerializer, LogoutResponseSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth import login, logout
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class change_last_name(APIView):
    def post(self, request):
        new_last_name = request.data.get('last_name')

        if new_last_name is not None:
            # Update the last name for the current user (you may need to implement user authentication)
            request.user.last_name = new_last_name
            request.user.save()
            return Response({'message': 'Last name updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)


class change_first_name(APIView):
    def post(self, request):
        new_first_name = request.data.get('first_name')

        if new_first_name is not None:
            # Update the last name for the current user (you may need to implement user authentication)
            request.user.first_name = new_first_name
            request.user.save()
            return Response({'message': 'Last name updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)

    # Perform last name change logic (e.g., update the User model)
    # Return an appropriate response


class CurrentUserView(APIView):

    def get(self, request):
        try:

            authorization_header = request.META.get('HTTP_AUTHORIZATION', '')

            if not authorization_header.startswith('Token '):
                # The header should start with 'Token ' followed by the token value
                return Response({'detail': 'Invalid Authorization header format'}, status=status.HTTP_400_BAD_REQUEST)

            # Remove 'Token ' from the header
            token_value = authorization_header[6:]
            try:
                # Check if the token exists
                token = Token.objects.get(key=token_value)
                user = token.user
            except Token.DoesNotExist:
                return Response({'detail': 'Token does not exist'}, status=status.HTTP_400_BAD_REQUEST)

            serializer = CurrentUserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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

            authorization_header = request.META.get('HTTP_AUTHORIZATION', '')
            if not authorization_header.startswith('Token '):
                # The header should start with 'Token ' followed by the token value
                return Response({'detail': 'Invalid Authorization header format'}, status=status.HTTP_400_BAD_REQUEST)

            # Remove 'Token ' from the header
            token_value = authorization_header[6:]
            token = Token.objects.get(key=token_value)  # Retrieve the token
            token.delete()  # Delete the token
            serializer = LogoutResponseSerializer(
                data={"message": "Logout successful"})
        except Token.DoesNotExist:
            serializer = LogoutResponseSerializer(
                data={"message": "Token does not exist"})

        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
