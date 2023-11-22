import React, { useState, useEffect } from "react";
import { GetUser } from "../services/API/GetCurrentUserApi";
import { ChangeLastName } from "../services/API/ChangeLastNameAPI";
import { ChangeFirstName } from "../services/API/ChangeFirstNameAPI";
import { Link } from "react-router-dom";
import { getUserLikeBooks } from "../services/API/GetUserLikesBooks"; // Импорт функции для получения книг пользователя
import { GetId } from "../services/API/GetIdAPI";
import { getUserorderBooks } from "../services/API/GetUserOrderBooks";
const BASE_URL = "http://localhost:8000/media/";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [activeSection, setActiveSection] = useState("info");
  const [editUserInfo, setEditUserInfo] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [likedBooks, setLikedBooks] = useState([]);
  const [orderedBooks, setOrderedBooks] = useState([]); // Состояние для хранения книг, добавленных в избранное

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetUser();

        setUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchOrderedBooks() {
      try {
        const userId = await GetId();
        const orderedBooksData = await getUserorderBooks(userId);

        setOrderedBooks(orderedBooksData);
      } catch (error) {
        console.error("Error fetching ordered books:", error);
      }
    }
    fetchOrderedBooks();
  }, []);
  useEffect(() => {
    async function fetchLikedBooks() {
      try {
        const userId = await GetId();

        const booksData = await getUserLikeBooks(userId);

        setLikedBooks(booksData);
      } catch (error) {
        console.error("Error fetching liked books:", error);
      }
    }
    fetchLikedBooks();
  }, []);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const changeSection = (section) => {
    setActiveSection(section);
    setCurrentPage(1);
    setOldPassword("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const likedBooksArray = likedBooks.liked_books_count || [];
  const totalPages = Math.ceil(likedBooksArray.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBooks = likedBooksArray.slice(startIndex, endIndex);

  const orderBooksArray = orderedBooks.order_books_count || [];
  const totalPagesOrder = Math.ceil(orderBooksArray.length / itemsPerPage);
  const startIndexOrder = (currentPage - 1) * itemsPerPage;
  const endIndexOrder = startIndexOrder + itemsPerPage;
  const displayedOrderBooks = orderBooksArray.slice(
    startIndexOrder,
    endIndexOrder
  );

  const handlePasswordChange = () => {
    // Implement password change logic here
  };

  const handleEmailChange = () => {
    // Implement email change logic here
  };

  const handleFirstNameChange = async () => {
    try {
      await ChangeFirstName(newFirstName);
      console.log("First name changed successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error changing first name:", error);
    }
  };

  const handleLastNameChange = async () => {
    try {
      await ChangeLastName(newLastName);
      window.location.reload();
      console.log("Last name changed successfully");
    } catch (error) {
      console.log("Error changing last name:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-lg  ">
      
        <div className="mt-4 flex justify-center ">
          <button
            onClick={() => changeSection("info")}
            className={`${
              activeSection === "info"
                ? "bg-blue-500 text-white"
                : "bg-blue-200"
            } p-2 rounded-md mx-2`}
          >
            User Info
          </button>

          <button
            onClick={() => changeSection("likes")}
            className={`${
              activeSection === "likes"
                ? "bg-blue-500 text-white"
                : "bg-blue-200"
            } p-2 rounded-md mx-2`}
          >
            Likes
          </button>
          <button
            onClick={() => changeSection("orders")}
            className={`${
              activeSection === "orders"
                ? "bg-blue-500 text-white"
                : "bg-blue-200"
            } p-2 rounded-md mx-2`}
          >
            My Orders
          </button>
        </div>

        {activeSection === "info" && (
          <div className="mt-4 ">
            <div>
              <p>User Information:</p>
              <p>Name: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>First Name: {user.first_name}</p>
              <p>Last Name: {user.last_name}</p>
              <button
                onClick={() => setEditUserInfo(!editUserInfo)}
                className="bg-blue-500 text-white rounded-md p-2 mt-2"
              >
                {editUserInfo ? "Hide Edit" : "Edit User Info"}
              </button>
            </div>

            {editUserInfo && (
              <div className="mt-4">
                <p>Change Password:</p>
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={handlePasswordChange}
                  className="bg-blue-500 text-white rounded-md p-2 mt-2"
                >
                  Change Password
                </button>
                <p>Change Email:</p>
                <input
                  type="email"
                  placeholder="New Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={currentPassword} // Use the same oldPassword state for password verification
                  onChange={(e) => setcurrentPassword(e.target.value)}
                />
                <button
                  onClick={handleEmailChange}
                  className="bg-blue-500 text-white rounded-md p-2 mt-2"
                >
                  Change Email
                </button>
                <p>Change First Name:</p>
                <input
                  type="text"
                  placeholder="New First Name"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                />

                <button
                  onClick={handleFirstNameChange}
                  className="bg-blue-500 text-white rounded-md p-2 mt-2"
                >
                  Change First Name
                </button>
                <p>Change Last Name:</p>
                <input
                  type="text"
                  placeholder="New Last Name"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                />
                <button
                  onClick={handleLastNameChange}
                  className="bg-blue-500 text-white rounded-md p-2 mt-2"
                >
                  Change Last Name
                </button>
              </div>
            )}
          </div>
        )}
     

      {activeSection === "likes" && (
        <div className="mt-20 ">
          <div className="flex justify-center">
            {displayedBooks.map((book) => (
              <div key={book.id} className="m-2">
                <Link to={`/books/${book.id}`}>
                  <div className="bg-white rounded-lg p-4 shadow-md transition transform hover:scale-105 flex flex-col items-center">
                    <img
                      src={`${BASE_URL}${book.image}`}
                      alt={book.title}
                      className="w-24 h-32 object-cover rounded-lg mb-2 justify-center"
                    />
                    <div>
                      <p
                        className="text-lg font-semibold"
                        style={{
                          width: "120px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {book.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-blue-200"
                  } p-2 rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSection === "orders" && (
        <div className="mt-20">
          <div className="flex flex-wrap justify-center">
            {displayedOrderBooks.map((book) => (
              <div key={book.id} className="m-2 ">
                <Link to={`/books/${book.id}`}>
                  <div className="bg-white rounded-lg p-4 shadow-md transition transform hover:scale-105 flex flex-col items-center">
                    <img
                      src={`${BASE_URL}${book.image}`}
                      alt={book.title}
                      className="w-24 h-32 object-cover rounded-lg mb-2 "
                    />
                    <div>
                      <p
                        className="text-lg font-semibold"
                        style={{
                          width: "120px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {book.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              {Array.from({ length: totalPagesOrder }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-blue-200"
                  } p-2 rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
