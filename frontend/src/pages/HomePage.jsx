import React, { useState, useEffect } from "react";
import { getBooks } from "../services/GetBooksAPI";
import { Link } from "react-router-dom";
const BASE_URL = "http://127.0.0.1:8000/";
const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    async function fetchData() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="text-center mt-[-10px]">
        <h1 className="text-5xl font-regular">Welcome to TechBookStore</h1>
      </div>
      <h2 className="text-4xl font-tiny text-center my-10">Newest</h2>
      <div className="grid grid-cols-6 gap-3 relative w-1/1 h-auto my-[-10px] ml-10 mr-10">
        {books.map((book) => (
          <div className="hover:scale-110" key={book.id}>
            <Link to="#">
              <div>
                <img src={`${BASE_URL}${book.image}`} alt="bookImg" />
                <div className="p-6 bg-green-100 rounded-b-xl">
                  <h2 className="text-small text-left">{book.name}</h2>
                  <p className="text-gray-500">Price: {book.price}$</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;