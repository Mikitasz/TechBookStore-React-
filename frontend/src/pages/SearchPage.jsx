import React, { useState, useEffect } from "react";
import { getBooks } from "../services/API/GetAllBooksAPI";
import { Link } from "react-router-dom";
import spin from "../assets/spin.svg";
import { getCategory } from "../services/API/GetCategoryNameAPI";
const BASE_URL = "http://localhost:8000/";


const ITEMS_PER_PAGE = 9; // Number of items to display per page

const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [cat, setCat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All"); 


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
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCategory();
        setCat(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  const categoryMapping = {};
  cat.forEach((category) => {
    categoryMapping[category.name] = category.id;
  });
  
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply category filter
  const filteredBooksByCategory =
    selectedCategory === "All"
      ? filteredBooks
      : filteredBooks.filter(
          (book) => book.category === Number(selectedCategory)
        );

  const paginatedBooks = filteredBooksByCategory.slice(startIndex, endIndex);

  // List of categories
  const categories = [...new Set(cat.map((c) => c.name))];
  categories.unshift("All"); // Add "All" category to show all books

  return (
    <div className="flex flex-col mt-16">
      <div className="flex">
        <div className="w-1/4 p-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to the first page when searching
            }}
            className="border p-2 rounded shadow-md"
          />
          <div className="mt-4">
            <label className="text-sm font-semibold">Select a Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded shadow-md"
            >
              {categories.map((category, index) => (
                <option key={index} value={categoryMapping[category]}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-4/5 h-1/8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="text-center">
                <img
                  src={spin}
                  alt="Spinner"
                  className="mt-20 animate-spin w-10 h-10 mr-3"
                />
                Loading
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3 relative w-4/6 my-[-10px] ml-10 mr-10">
                {paginatedBooks.map((book) => (
                  <div className="hover:scale-110" key={book.id}>
                    <Link to={`/search/books/${book.id}`}>
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
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-2"
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-2"
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={endIndex >= filteredBooksByCategory.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
