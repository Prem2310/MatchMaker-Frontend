import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [currUser, setCurrUser] = useState({});

  useEffect(() => {
    try{
        const jwt = document.cookie.split("; ").find((row) => row.startsWith("LOGIN_INFO")).split("=")[1];

        fetch("http://localhost:5000/getLoggedInUser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: document.cookie
            .split("; ")
            .find((row) => row.startsWith("LOGIN_INFO"))
            .split("=")[1],
        },
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setCurrUser(data.user);
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    catch(err){
        console.log(err);
    }
    }, []);


    return (
        <div className="bg-white">
            <div className="flex justify-between p-3 ">
                <div>
                    <img src={logo} alt="logo" className="h-6" />
                </div>
                <div className="flex">
                    <a href="/" className="ml-10 text-lg hover:text-gray-400">
                        Home
                    </a>
                    <a href="/vision" className="ml-10 text-lg hover:text-gray-400">
                        Vision
                    </a>
                    <a href="/about" className="ml-10 text-lg hover:text-gray-400">
                        About Us
                    </a>
                    <a href="/searchUser" className="ml-10 text-lg hover:text-gray-400">
                        Peoples
                    </a>
                    <a href="/chats" className="ml-10 text-lg hover:text-gray-400">
                        Chat Room
                    </a>
                </div>
                <div className="flex">
                    {
                        currUser.username &&
                        <Link to="/profile" className="ml-10 text-lg hover:text-gray-400">
                        {currUser.username}
                        </Link>
                    }
                    
                    {
                        !currUser.username &&
                        <div>

                            <Link to="/signup" className="ml-10 text-lg hover:text-gray-400">
                                Sign Up
                            </Link>
                            <Link to="/login" className="ml-10 text-lg hover:text-gray-400">
                                Log In
                            </Link>
                        </div>
                    }
                </div>
            </div>
            <div>
                <hr className="dark:text-black-900" />
            </div>
        </div>
  );
};

export default Navbar;
