from rest_framework import serializers
from .models import Book, Category
from .models import AddedBooks

class AddedBooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddedBooks
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class BookLsitSerializer(serializers.Serializer):

    book_id = serializers.IntegerField()
    category = serializers.CharField()
