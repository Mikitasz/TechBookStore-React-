import React, { useState, useEffect } from "react";
import { getBooks } from "../services/API/GetNewBooksAPI";
import { Link } from "react-router-dom";
import spin from "../assets/spin.svg";
const BASE_URL = "http://localhost:8000/";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="">
        <div className="text-center mt-5 font-body">
          <h1 className="text-5xl  ">Welcome to TechBookStore</h1>
        </div>
        <h2 className="text-4xl font-tiny text-center my-10 font-body">Newest</h2>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center  ">
            <div className="text-center">
              <img
                src={spin}
                alt="Spinner"
                className="mt-20 animate-spin w-20 h-20 mr-3 "
              />
              Loading
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-3 relative w-1/1 h-auto my-[-10px] ml-10 mr-10">
            {books.map((book) => (
              <div className="hover:scale-110" key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <div>
                    <img src={`${BASE_URL}${book.image}`} alt="bookImg" />
                    <div className="p-6 bg-blue-500 rounded-b-xl">
                      <h2 className="text-lg text-white  text-left">{book.name}</h2>
                      <p className="text-black font-bold">Price: {book.price}$</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
