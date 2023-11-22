import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookDetail } from "../services/API/BookDetailAPI";
import { getLikes } from "../services/API/GetLikesApi"; // Добавлен импорт toggleLike
import { toggleLike } from "../services/API/UpdateLikes";
import { deleteleLike } from "../services/API/DeleteLikes";
import { GetId } from "../services/API/GetIdAPI";
import { getUserLikeBooks } from "../services/API/GetUserLikesBooks";
import { toggleOrder } from "../services/API/UpdateOrderAPI";
import { deleteorder } from "../services/API/DeleteOrderApi";
import { getUserorderBooks } from "../services/API/GetUserOrderBooks";
const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isOrder, setIsOrder] = useState(false); // Добавлено состояние для отслеживания, добавлена ли книга в список любимых
  const [userid, setUserid] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    async function fetchBookDetail() {
      try {
        const data = await getBookDetail(bookId);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book detail:", error);
      }
    }

    async function fetchBookLikes() {
      try {
        const likesData = await getLikes(bookId);
        const likesCount = likesData.likes_count;
        setLikes(likesCount);
        setIsLiked(likesData.liked); // Установите isLiked в true, если книга уже в списке любимых
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    }

    fetchBookDetail();
    fetchBookLikes();
  }, [bookId]);
  useEffect(() => {
    async function fetchUserId() {
      try {
        const data = await GetId();
        const booksData = await getUserLikeBooks(data);
        const booksOrder = await getUserorderBooks(data);

        setUserid(data);
        const orderBooks = booksOrder.order_books_count;
        const isBookOrder = orderBooks.some(
          (book) => book.id === Number(bookId)
        );
        const likedBooks = booksData.liked_books_count;
        const isBookLiked = likedBooks.some(
          (book) => book.id === Number(bookId)
        );

        setIsLiked(isBookLiked);
        setIsOrder(isBookOrder);
      } catch (error) {
        console.error("Error fetching book detai222l:", error);
      }
    }

    fetchUserId();
  }, [bookId]);

  const handleLike = async () => {
    if (isLiked) {
      // Если книга уже в списке любимых, удалите ее
      try {
        await deleteleLike(userid, bookId);
        setIsLiked(false);
        setLikes(likes - 1);
      } catch (error) {
        console.error("Error removing like:", error);
      }
    } else {
      // Если книга не в списке любимых, добавьте ее
      try {
        await toggleLike(userid, bookId);
        setIsLiked(true);
        setLikes(likes + 1);
      } catch (error) {
        console.error("Error adding like:", error);
      }
    }
  };

  const handleOrder = async () => {
    if (isOrder) {
      // Если книга уже в списке любимых, удалите ее
      try {
        await deleteorder(userid, bookId);
        setIsOrder(false);
      } catch (error) {
        console.error("Error removing like:", error);
      }
    } else {
      // Если книга не в списке любимых, добавьте ее
      try {
        await toggleOrder(userid, bookId);
        setIsOrder(true);
      } catch (error) {
        console.error("Error adding like:", error);
      }
    }
  };

  const handleShowViews = () => {
    setViews(views + 1);
  };

  if (!book) {
    return <div className="text-center mt-8">Loading book details...</div>;
  }

  return (
    <div className="p-6 border border-gray-200 shadow-lg rounded-lg flex relative">
      <div className="w-1/4">
        <img src={book.image} alt={book.name} />
      </div>
      <div className="w-3/4 ml-4">
        <h2 className="text-3xl font-semibold mb-4">{book.name}</h2>
        <p className="text-gray-700 text-lg">Author: {book.author}</p>
        <p className="text-gray-700 text-lg">Description: {book.description}</p>
        <p className="text-gray-700 text-lg">Category: {book.category}</p>
        <p className="text-gray-700 text-lg">Price: {book.price}$</p>

        <div className="mt-4 space-x-2">
          <button
            onClick={handleLike}
            className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ${
              isLiked ? "bg-red-500" : ""
            }`}
          >
            {isLiked ? "Unlike" : "Like"} ({likes})
          </button>
          <button
            onClick={handleOrder}
            className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ${
              isOrder ? "bg-red-500" : ""
            }`}
          >
            {isOrder ? "Unorder" : "order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
