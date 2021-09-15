import React, {useEffect, useState} from 'react';

// @ts-ignore
const Login = ({toggleLogin, loginDetail, setLoginDetail}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const [create, setCreate] = useState(false)

  useEffect(() => {
    setCreate(false)
  }, [])

  const submitForm = (event: any) => {
    if (create) {
      console.log("create", name, email, password, confirm)
      fetch("http://localhost:4000/users/register", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirm
        }) // body data type must match "Content-Type" header
      }).then(r => r.json())
        .then(json => {
          const token = json.token
          if (token) {
            localStorage.setItem("jwt-token", token)
            setLoginDetail({
              name: json.name,
              email: json.email,
              loggedIn: true
            })
          }
        })
      // call /user/register
    } else {
      // call /user/login
      console.log("create", name, email, password, confirm)
      fetch("http://localhost:4000/users/login", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        }) // body data type must match "Content-Type" header
      }).then(r => r.json())
        .then(json => {
          const token = json.token
          if (token) {
            localStorage.setItem("jwt-token", token)
            setLoginDetail({
              name: json.name,
              email: json.email,
              loggedIn: true
            })
          }
        })
    }
    event.preventDefault()
  }
  const logoutUser = () => {
    localStorage.removeItem("jwt-token")
    setLoginDetail({
      loggedIn: false
    })
  }
  return (
    <div
      className="fixed text-gray-500 top-0 left-0 right-0 bottom-0 bg-popup flex justify-center items-center overflow-auto">
      <div className="bottom-0 left-0 right-0 top-0 absolute z-0" onClick={toggleLogin}/>
      <div className="bg-white w-5/6 xl:w-popup z-10 text-center rounded-md">
        {
          loginDetail.loggedIn ? <>
            <div className="flex justify-center text-center border-t-2 p-4 flex-col" onSubmit={submitForm}>
              <div>
                <div className="h-32 w-32 bg-user inline-block bg-no-repeat bg-cover"/>
              </div>
              <div className="flex w-5/6 flex-col inline m-auto">
                <span className="ml-2 p-1 text-2xl">{loginDetail.name}</span>
              </div>
              <div className="flex w-5/6 flex-col inline m-auto">
                <span className="ml-2 p-1">{loginDetail.email}</span>
              </div>
              <br/>
              <button
                className="w-5/6 bg-primary rounded-lg text-white m-auto text-center p-2"
                onClick={logoutUser}>Logout
              </button>
            </div>
          </> : <>
            <div className="text-center text-xl p-2">{create ? "Create Account" : "Login"}</div>
            <form className="flex justify-center text-center border-t-2 p-3 flex-col" onSubmit={submitForm}>
              {
                create ?
                  <div className="flex w-5/6 flex-col inline text-left m-auto">
                    <span className="ml-2 p-1">Full Name</span>
                    <input type="text" placeholder="Full Name" required={true}
                           onChange={(e) => setName(e.target.value)} value={name}
                           className="w-full rounded text-center text-black p-2 focus:border-gray-700 border-2"/>
                  </div> : null
              }
              <div className="flex w-5/6 flex-col inline text-left m-auto">
                <span className="ml-2 p-1">Email Address</span>
                <input type="email" placeholder="Email" required={true}
                       onChange={(e) => setEmail(e.target.value)} value={email}
                       className="w-full rounded text-center text-black p-2 focus:border-gray-700 border-2"/>
              </div>
              <div className="flex w-5/6 flex-col inline text-left m-auto">
                <span className="ml-2 p-1">Password</span>
                <input type="password" placeholder="password" required={true}
                       onChange={(e) => setPassword(e.target.value)} value={password}
                       className="w-full rounded text-center text-black p-2 focus:border-gray-700 border-2"/>
              </div>
              {
                create ?
                  <div className="flex w-5/6 flex-col inline text-left m-auto">
                    <span className="ml-2 p-1">Confirm Password</span>
                    <input type="password" placeholder="confirm" required={true}
                           onChange={(e) => setConfirm(e.target.value)} value={confirm}
                           className="w-full rounded text-center text-black p-2 focus:border-gray-700 border-2"/>
                  </div> : null
              }
              <br/>
              <button className="w-5/6 bg-primary rounded-lg text-white m-auto text-center p-2">
                {create ? "Create" : "Login"}
              </button>
            </form>
            <span className="text-gray-400">------ OR ------</span>
            <br/>
            <div className="flex justify-center text-center p-3 flex-col">
              <button
                className="w-5/6 bg-primary rounded-lg text-white m-auto text-center p-2"
                onClick={() => setCreate(!create)}> {create ? "Login" : "Create Account"}
              </button>
            </div>
          </>
        }
        <br/>
      </div>
    </div>
  );
};

export default Login;
