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

from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static



from .views import BookNewestView, BookDetail, IncrementViewCount, BookAllView, CategoryView,BookLikesCount,UserLikedBooksCount,UserLikedBooks,UserOrderedBooks,UserOrderBooksCount

urlpatterns = [
    path('user_order_books_count/<int:user_id>/',UserOrderBooksCount.as_view(),name="usergetorder"),
    path('user-order/<int:user_id>/<int:book_id>/',UserOrderedBooks.as_view(),name="user-order"),
    path('get-likes-for-one-book/<int:book_id>/', BookLikesCount.as_view(), name='book-likes-count'),
    path('user_liked_books/<int:user_id>/<int:book_id>/', UserLikedBooks.as_view(), name='user-liked-books'),
    path('user_liked_books_count/<int:user_id>/', UserLikedBooksCount.as_view(), name='user-liked-books-count'),
    path('category/', CategoryView.as_view(), name='category'),
    path('all/', BookAllView.as_view(), name='allbooks'),
    path('c/<int:pk>/increment-view/',
         IncrementViewCount.as_view(), name='increment-view-count'),
    path('books/<int:pk>/', BookDetail.as_view(), name='book-detail'),
    path('newest/', BookNewestView.as_view(), name="BookList"),

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
