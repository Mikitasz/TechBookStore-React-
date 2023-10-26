import { GetUser } from "../services/API/GetCurrentUserApi";
import React, { useState, useEffect } from "react";
import { ChangeLastName } from "../services/API/ChangeLastNameAPI";
import { ChangeFirstName } from "../services/API/ChangeFirstNameAPI";

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
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Book 1",
      image: "book.svg",
    },
    {
      id: 2,
      title: "Book 2",
      image: "book.svg",
    },
    {
      id: 3,
      title: "Book 3",
      image: "book.svg",
    },
    {
      id: 4,
      title: "Book 4",
      image: "book.svg",
    },
    {
      id: 5,
      title: "Book 5",
      image: "book.svg",
    },
    {
      id: 6,
      title: "Book 6",
      image: "book.svg",
    },
  ]);

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

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const changeSection = (section) => {
    setActiveSection(section);
    setCurrentPage(1);
    setOldPassword("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getBooksToDisplay = () => {
    switch (activeSection) {
      case "wishlist":
        return books;
      case "likes":
        return books;
      case "orders":
        return books;
      default:
        return [];
    }
  };

  const totalPages = Math.ceil(getBooksToDisplay().length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBooks = getBooksToDisplay().slice(startIndex, endIndex);

  const handlePasswordChange = () => {
    // Implement password change logic here
  };

  const handleEmailChange = () => {
    // Implement email change logic here
  };

  const handleFirstNameChange = async () => {
    try {
      await ChangeFirstName(newFirstName);

      console.log("Last name changed successfully:");
      window.location.reload();
    } catch (error) {
      console.log("Error changing last name:", error);
    }
  };

  const handleLastNameChange = async () => {
    try {
      await ChangeLastName(newLastName);

      window.location.reload();

      console.log("Last name changed successfully:");
    } catch (error) {
      console.log("Error changing last name:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-lg  flex flex-row relative">
      
      <div className="flex-1">
        <div className="mt-4">
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
            onClick={() => changeSection("wishlist")}
            className={`${
              activeSection === "wishlist"
                ? "bg-blue-500 text-white"
                : "bg-blue-200"
            } p-2 rounded-md mx-2`}
          >
            Wishlist
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
          <div className="mt-4">
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
      </div>

      <div className="flex-1">
        <div className="text-center">
          <h2 className="text-2xl font-bold mt-4">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        {(activeSection === "wishlist" ||
          activeSection === "likes" ||
          activeSection === "orders") && (
          <div className="mt-4">
            <p>{activeSection === "wishlist" ? "Wishlist" : ""}</p>
            <p>{activeSection === "likes" ? "Likes" : ""}</p>
            <p>{activeSection === "orders" ? "My Orders" : ""}</p>
            <div className="flex flex-wrap justify-left">
              {displayedBooks.map((book) => (
                <div key={book.id} className="m-2">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-24 h-24 object-cover rounded transition transform hover:scale-110"
                  />
                  <p className="text-center mt-2">{book.title}</p>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-4">
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
      </div>
    </div>
  );
};

export default ProfilePage;
