"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from Users.views import RegisterView,LoginView,LogoutView,CurrentUserView,change_last_name,change_first_name,get_csrf_token
from books.views import CategoryView,BookView




urlpatterns = [
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),

    path('change-first-name/', change_first_name.as_view(), name='change_first_name'),
    path('change-last-name/', change_last_name.as_view(), name='change_last_name'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('current/',CurrentUserView.as_view(),name='current')
    
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

