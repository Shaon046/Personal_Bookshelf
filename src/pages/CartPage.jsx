import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'


const CartPage = () => {

const navigate=useNavigate()
const [userData,setUserData]=useState()

const shortenTitle = (title) => {
    if (title && title.length > 20) {
      return title.substring(0, 20) + "...";
    }
    return title;
  };


const backToHome=()=>{
    navigate('/')
}

// retrive data

useEffect(() => {
    const storedData = localStorage.getItem('bookshelf');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (


    <div className="min-h-screen w-full bg-slate-200 ">
    
<p className='flex justify-center items-center p-4 text-lg font-bold'>Bookshelf</p>

      {/* //CARDS */}
      
     
      <div className="mt-5 grid md:grid-cols-5 w-full md:w-2/3 mx-auto justify-items-center items-center gap-4">
        {userData && 
          userData.map((data, idx) => (
            <div
              className="min-h-[205px]  bg-white border-black rounded-lg border hover:border-blue px-2"
              key={idx}
            >
              

              {(
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
                    <span className="font-normal">{data.count}</span>
                  </p>
                  
                </>
              )}
            </div>
          ))}
      </div>
      <div className='flex justify-center items-center'>
      <button className=" bg-green-400 hover:bg-green-500 px-4 py-1 rounded-lg xs:text-sm md:text-lg" onClick={backToHome} > Back To Home</button>
      </div>
      
    </div>
  )
}

export default CartPage