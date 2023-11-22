from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import AddedBooks
from django.db.models import Count
from rest_framework.decorators import action
from .serializer import BookSerializer, BookLsitSerializer, CategorySerializer, AddedBooksSerializer
from .models import Book, Category
from django.contrib.auth.models import User
from .models import AddedBooks
from .serializer import BookLsitSerializer
from rest_framework import generics
from rest_framework import permissions, viewsets
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class BookLikesCount(APIView):
    def get(self, request, book_id):
        book_likes_count = AddedBooks.objects.filter(
            liked_books=book_id).count()

        # Отправляем количество лайков в ответе
        return Response({'likes_count': book_likes_count})


class UserLikedBooksCount(APIView):
    def get(self, request, user_id):
        # Здесь user_id - это идентификатор пользователя, для которого вы хотите получить количество лайков для его любимых книг.
        # Предполагается, что вы передаете user_id в URL.

        try:
            user = User.objects.get(pk=user_id)

            # Получаем список книг, которые пользователь добавил в любимые, и количество лайков для каждой из них
            liked_books = user.addedbooks.liked_books.values(
                'id', 'name', 'image').annotate(total_likes=Count('id'))

            # Отправляем список книг и их количество лайков в ответе
            return Response({'user_id': user_id, 'liked_books_count': liked_books})
        except User.DoesNotExist:
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)


class UserOrderBooksCount(APIView):
    def get(self, request, user_id):
        # Здесь user_id - это идентификатор пользователя, для которого вы хотите получить количество лайков для его любимых книг.
        # Предполагается, что вы передаете user_id в URL.

        try:
            user = User.objects.get(pk=user_id)

            # Получаем список книг, которые пользователь добавил в любимые, и количество лайков для каждой из них
            ordered_books = user.addedbooks.ordered_books.values(
                'id', 'name', 'image').annotate(total_likes=Count('id'))

            # Отправляем список книг и их количество лайков в ответе
            return Response({'user_id': user_id, 'order_books_count': ordered_books})
        except User.DoesNotExist:
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)


class UserLikedBooks(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id, book_id):
        # Здесь user_id - это идентификатор пользователя, а book_id - идентификатор книги, которую пользователь хочет добавить в любимые.

        try:
            user = User.objects.get(pk=user_id)
            book = Book.objects.get(pk=book_id)

            authenticated_user = request.user

            if user == authenticated_user:
                try:
                    user.addedbooks.liked_books.add(book)

                except:
                    user_profile = AddedBooks.objects.create(user=user)
                    user.addedbooks.liked_books.add(book)

                return Response({'message': f'Книга {book.name} добавлена в список любимых книг пользователя {user.username}'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Вы не имеете разрешения на выполнение этой операции.'}, status=status.HTTP_403_FORBIDDEN)
        except User.DoesNotExist:
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)
        except Book.DoesNotExist:
            return Response({'message': 'Книга не найдена'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, book_id):
        # Здесь user_id - идентификатор пользователя, а book_id - идентификатор книги, которую пользователь хочет удалить из любимых.

        try:
            user = User.objects.get(pk=user_id)
            book = Book.objects.get(pk=book_id)

            # Удаляем книгу из списка "liked_books" пользователя
            user.addedbooks.liked_books.remove(book)

            return Response({'message': f'Книга {book.name} удалена из списка любимых книг пользователя {user.username}'})
        except User.DoesNotExist:
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)
        except Book.DoesNotExist:
            return Response({'message': 'Книга не найдена'}, status=status.HTTP_404_NOT_FOUND)


class UserOrderedBooks(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id, book_id):
        # Здесь user_id - это идентификатор пользователя, а book_id - идентификатор книги, которую пользователь хочет добавить в любимые.

        try:
            user = User.objects.get(pk=user_id)
            book = Book.objects.get(pk=book_id)

            authenticated_user = request.user

            if user == authenticated_user:
                try:
                    user.addedbooks.ordered_books.add(book)

                except:
                    user_profile = AddedBooks.objects.create(user=user)
                    user.addedbooks.ordered_books.add(book)

                return Response({'message': f'Книга {book.name} добавлена в список заказа книг пользователя {user.username}'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Вы не имеете разрешения на выполнение этой операции.'}, status=status.HTTP_403_FORBIDDEN)
        except User.DoesNotExist:
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)
        except Book.DoesNotExist:
            return Response({'message': 'Книга не найдена'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, book_id):
        # Здесь user_id - идентификатор пользователя, а book_id - идентификатор книги, которую пользователь хочет удалить из любимых.

        try:
            user = User.objects.get(pk=user_id)
            book = Book.objects.get(pk=book_id)

            # Удаляем книгу из списка "liked_books" пользователя
            user.addedbooks.ordered_books.remove(book)

            return Response({'message': f'Книга {book.name} удалена из списка заказа книг пользователя {user.username}'})
        except User.DoesNotExist:
            return Response({'message': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)
        except Book.DoesNotExist:
            return Response({'message': 'Книга не найдена'}, status=status.HTTP_404_NOT_FOUND)


class BookNewestView(APIView):
    def get(self, request):
        books = Book.objects.all().order_by('-created_at')[0:6]

        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)


class CategoryView(APIView):
    def get(self, request):
        category = Category.objects.all()

        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)


class BookAllView(APIView):
    def get(self, request):
        books = Book.objects.all()

        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)


class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class IncrementViewCount(generics.UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def perform_update(self, serializer):
        instance = serializer.save(
            view_count=serializer.instance.view_count + 1)
