from django.db import models
from django.contrib.auth.models import User
from books.models import Book

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    wish_books = models.ManyToManyField(Book, related_name='wished_by', blank=True)
    liked_books = models.ManyToManyField(Book, related_name='liked_by', blank=True)
    read_books = models.ManyToManyField(Book, related_name='read_by', blank=True)
