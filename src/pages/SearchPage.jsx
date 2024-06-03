import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const SearchPage = () => {
  const [userInput, setUserInput] = useState("");
  const [fetchedData, setFetchedData] = useState();
  const [loading, setLoading] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);


  const [bookshelf,setBookshelf]=useState([])

  const navigate=useNavigate()
  const inputOnChangeHandler = (eve) => {
    let input = eve.target.value;

    setUserInput(input);

    if (input.trim() !== "") {
      setInputTouched(true);
    } else {
      setInputTouched(false);
    }

    setLoading(true);
  };

  const shortenTitle = (title) => {
    if (title && title.length > 20) {
      return title.substring(0, 20) + "...";
    }
    return title;
  };

  const AddToBookshelfHandler = (title, count) => {
    

    setBookshelf((prev)=>([...prev,{title:title,count:count} ]))
  };



  
//store to local storage

useEffect(()=>{

  localStorage.setItem('bookshelf', JSON.stringify(bookshelf));

},[bookshelf])




const myBookShelf=()=>{
  navigate("/bookshelf")
}


  useEffect(() => {
    const delay = setTimeout(() => {
      axios
        .get(
          `https://openlibrary.org/search.json?q=${userInput}&limit=10&page=1`
        )
        .then((response) => {
          const filteredBooks = response.data.docs.filter((book) =>
            book.title.toLowerCase().includes(userInput.toLowerCase())
          );
          setFetchedData(filteredBooks);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 1000);

    return () => clearTimeout(delay);
  }, [userInput]);

  console.log(fetchedData && fetchedData);

  return (
    <div className="min-h-screen w-full bg-slate-200 ">
      {/* //Navbar */}
      <div className=" grid gird  xs:grid-cols-2    md:grid-cols-3 py-2 xs:px-4">
        <div className="flex flex-col justify-center items-center xs:col-start-1 xs:col-end-2   md:col-start-2 md:col-end-3">
          <label
            htmlFor="book-search"
            className="xs:text-sm md:text-lg font-semibold"
          >
            Search by book name:
          </label>
          <input
            type="text"
            id="book-search"
            name="book-search"
            className="mt-2  border border-gray-400 rounded p-1"
            onChange={inputOnChangeHandler}
          />
        </div>

        <div className="justify-self-center self-center ">
          <button className="bg-green-400 hover:bg-green-500 px-4 py-1 rounded-lg xs:text-sm md:text-lg" onClick={()=>myBookShelf()} >
            {" "}
            My Bookshelf
          </button>
        </div>
      </div>

      {/* //CARDS */}
      {loading && (
        <div>
          {" "}
          <p className="flex justify-center items-center">Loading... </p>{" "}
        </div>
      )}

      {inputTouched && !loading && fetchedData && fetchedData.length === 0 && (
        <p className="flex justify-center items-center">No data found</p>
      )}

      <div className="mt-5 grid md:grid-cols-5 w-full md:w-2/3 mx-auto justify-items-center items-center gap-4">
        {fetchedData &&
          fetchedData.map((data, idx) => (
            <div
              className="min-h-[205px]  bg-white border-black rounded-lg border hover:border-blue px-2"
              key={idx}
            >
              {/* {  !data && data.length === 0 && <p> No book found</p>} */}

              {data.title && (
                <>
                  {" "}
                  <p className=" py-3 font-bold">
                    Book Title:{" "}
                    <span className="font-normal">
                      {shortenTitle(data.title)}{" "}
                    </span>
                  </p>
                  <p className=" py-3 font-bold">
                    Edition Count:{" "}
                    <span className="font-normal">{data.edition_count}</span>
                  </p>
                  <div className="flex justify-center items-center pt-5">
                    <button
                      className="bg-green-600 hover:bg-green-700  text-white font-semibold px-4 py-2 rounded-xl text-xs"
                      onClick={() =>
                        AddToBookshelfHandler(data.title, data.edition_count)
                      }
                    >
                      Add to Bookshelf
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
