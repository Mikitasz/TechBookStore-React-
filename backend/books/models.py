from django.db import models
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ('name',)
        verbose_name_plural = "Categories"

    def __str__(self) -> str:
        return self.name[:50]


class Book(models.Model):
    category = models.ForeignKey(
        Category, related_name='books', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.FloatField()
    image = models.ImageField(upload_to='books_images', blank=True, null=True,)
    author = models.CharField(max_length=255)
    likes = models.IntegerField(default=0)

    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name[:50]


class AddedBooks(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    liked_books = models.ManyToManyField(
        Book, related_name='liked_by', blank=True)
    ordered_books = models.ManyToManyField(
        Book, related_name='ordered_by', blank=True)
    wishlist = models.ManyToManyField(
        Book, related_name='wished_by', blank=True)

    def __str__(self):
        return str(self.user_id)
