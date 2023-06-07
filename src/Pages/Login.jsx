import { useEffect, useState } from "react"
import { useLoginMutation } from "../Services/Apis/authApi"
import { useNavigate,Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../Services/slice/userSlice"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const contactData = {email, password}

  const [login] = useLoginMutation()
  const nav = useNavigate()

  const dispatch = useDispatch()

  


  const handleLogin =async (e) => {
    try {
      e.preventDefault()
      const {data}= await login(contactData)
      console.log(data)
      dispatch(addUser(data))
      if(data.success) nav('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=" flex bg-btc item center justify-around h-screen">
    <div className=" px-5 h-screen items-center justify-center flex">
      <form onSubmit={handleLogin} action="" className="  w-full  inline">
        <div>
          <p className="  text-htc text-4xl font-mplus-rounded ">Log in</p>
          <p className=" text-ptc font-mplus-rounded text-lg">
            Now you dont have to memorise your contacts
          </p>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className=" py-3 w-full bg-transparent block border-0 border-b-2 focus:outline-none border-ptc focus:border-bc  text-ptc"
          />
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className=" py-3  w-full bg-transparent block border-0 border-b-2 focus:outline-none border-ptc focus:border-bc text-ptc"
          />

          <div>
            <p className=" text-ptc my-3">
              Already have an account?{" "}
              <Link to={"/register"}>
                <span className=" italic font-semibold">Sign In</span>
              </Link>
            </p>
          </div>
          <button className=" rounded-2xl  w-full px-8 py-2 bg-transparent hover:bg-bc text-bc font-semibold hover:text-btc border border-btc hover:border-transparent">
            Log in
          </button>
        </div>
      </form>
    </div>
    {/* Pic div */}
    <div className=" h-screen flex">
      <img
        className=" rounded-2xl  w-full py-5 px-3"
        src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
        alt=""
        aria-hidden="true"
      />
    </div>
  </div>

  )
}

export default Login
