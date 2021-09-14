import React, {useEffect, useState} from 'react'
import Login from "./Login"
// import '../styles/NavBar.scss'

import useLocalStorage from "../hooks/useLocalStorage";
import {Simulate} from "react-dom/test-utils";
import timeUpdate = Simulate.timeUpdate;

const NavBar = () => {
  const [loginDetail, setLoginDetail] = useState({})

  useEffect(() => {
    const loginToken = localStorage.getItem("jwt-token")
    if (loginToken)
      fetch("http://localhost:4000/users/verify",{
        headers: {
          'authorization': loginToken
        }
      })
        .then(r => r.json())
        .then(json => {
          console.log(json)
          if(json.email){
            setLoginDetail({
              ...json,
              loggedIn: true
            })
          }
        })
  }, [])

  const [login, setLogin] = useState(true)
  const toggleLogin = () => setLogin(!login)
  return (
    <nav className="navbar bg-primary sticky top-0 p-1">
      <div className="h-12 flex items-center text-white p-1">
        <div className="h-10 w-10 bg-logo bg-cover ml-1"/>
        <span className="mr-auto p-1 pl-2">E Shop</span>
        <div className="flex-1 h-7 px-2 md:hidden">
          <input type="text" className="h-full w-full rounded text-center text-black p-2 focus:border-gray-700"
                 placeholder="search"/>
        </div>
        <span className="p-1 cursor-pointer" onClick={toggleLogin}>
          <span className="lg:hidden md:inline sm:hidden p-1">Login</span>
          <span className="p-1">
            <i className="fa-solid fa-circle-user"/>
          </span>
        </span>
        <span className="p-1 cursor-pointer">
          <span className="lg:hidden md:inline sm:hidden p-1">Cart</span>
          <span className="p-1">
            <i className="fas fa-shopping-cart"/>
          </span>
        </span>
      </div>
      <div className="flex-1 h-7 px-2 md:block hidden mb-1">
        <input type="text" className="h-full w-full rounded text-center text-black p-2 focus:border-gray-700"
               placeholder="search"/>
      </div>
      {
        login ? <Login toggleLogin={toggleLogin} loginDetail={loginDetail}/> : null
      }
    </nav>
  )
}

export default NavBar;
