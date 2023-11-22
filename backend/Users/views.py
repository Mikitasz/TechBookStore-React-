from django.contrib.auth.models import User
from .serializer import UserRegisterSerializer, UserLogInSerializer, UserLogOutSerializer, CurrentUserSerializer
from django.http import Http404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.contrib.auth import update_session_auth_hash
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from books import serializer


class UserRegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        password = serializer.validated_data['password']

        hashed_password = make_password(password)

        serializer.validated_data['password'] = hashed_password

        user = serializer.save()
        Token.objects.create(user=user)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogInView(APIView):
    def post(self, request):
        serializer = UserLogInSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = authenticate(request, username=username, password=password)

            if user is not None:

                print(request.headers)
                token, create = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogOutView(APIView):
    def post(self, request):
        try:

            authorization_header = request.META.get('HTTP_AUTHORIZATION', '')

            if not authorization_header.startswith('Token '):

                return Response({'detail': 'Invalid Authorization header format'}, status=status.HTTP_400_BAD_REQUEST)

            token_value = authorization_header[6:]
            token = Token.objects.get(key=token_value)
            token.delete()
            serializer = UserLogOutSerializer(
                data={"message": "Logout successful"})
        except Token.DoesNotExist:
            serializer = UserLogOutSerializer(
                data={"message": "Token does not exist"})

        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


class ChangeLastName(APIView):
    def post(self, request):

        new_last_name = request.data.get('last_name')

        if new_last_name is not None:

            request.user.last_name = new_last_name
            request.user.save()
            return Response({'message': 'Last name updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)


class ChangeFirstName(APIView):
    def post(self, request):
        new_first_name = request.data.get('first_name')

        if new_first_name is not None:
            # Update the last name for the current user (you may need to implement user authentication)
            request.user.first_name = new_first_name
            request.user.save()
            return Response({'message': 'First name updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)


class ChangeEmailView(APIView):
    def post(self, request):
        user = request.user
        print(user)
        new_email = request.data.get("email")
        password = request.data.get("password")
        print(new_email)
        print(password)

        if not user.check_password(password):
            return Response({"error": "Incorrect password"}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=new_email).exclude(username=user.username).exists():
            return Response({"error": "Email is already in use"}, status=status.HTTP_400_BAD_REQUEST)
        user.email = new_email
        user.save()

        return Response({"message": "Email updated successfully"}, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    def post(self, request):
        # Get the current user
        user = request.user

        # Extract the current password and new password from the request data
        current_password = request.data.get("current_password")
        print(current_password)
        new_password = request.data.get("new_password")
        print(new_password)

        # Check if the current password is correct for the user
        if not user.check_password(current_password):
            return Response({"error": "Incorrect current password"}, status=status.HTTP_400_BAD_REQUEST)

        # Set the user's new password
        user.set_password(new_password)
        user.save()

        # Update the user's session to prevent them from being logged out
        update_session_auth_hash(request, user)

        return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)


class GetId(APIView):
    def get(self, request):

        return Response(request.user.id)
