import { useContext, useState } from "react";
import { useRegisterMutation } from "../Services/Apis/authApi";
import { useNavigate,Link } from "react-router-dom";
import {BsFillEyeSlashFill,BsFillEyeFill} from 'react-icons/bs'
import { StateContext } from "../Services/Context/Context";

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPassword_confirmation] = useState('')

  const contactData = {name, email, password, password_confirmation}
  const {isToggleVisible,setIsToggleVisible} = useContext(StateContext)

   // <<------toggleToggledbtn----->>
   function handleToggleVisible (){
    setIsToggleVisible((prevState) => !prevState);
  }

  const nav = useNavigate()


const [register] = useRegisterMutation()

const handleRegister = async (e) => {
  try {
    e.preventDefault()
    const {data} = await register(contactData)
    if(data.success) nav('/login')
  } catch (error) {
    console.log(error)
  }
 
}
  return (
    <div className=" flex  bg-btc item center justify-around h-screen">
    {/* register div */}
    <div className=" px-5 h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} action="" className="  w-full  inline">
        <div>
          <p className="  text-htc text-4xl font-mplus-rounded ">
            Create an account
          </p>
          <p className=" text-ptc font-mplus-rounded text-lg">
            Save your contacts with this site
          </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className=" py-3 w-full bg-transparent block border-0 border-b-2 focus:outline-none border-ptc focus:border-bc text-ptc text-transform: capitalize"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className=" py-3 w-full bg-transparent block border-0 border-b-2 focus:outline-none border-ptc focus:border-bc  text-ptc"
            required
          />
          <div className="relative flex items-center">
          <button
            className="absolute inset-y-0 right-0 flex items-center text-gray-600"
            onClick={handleToggleVisible}>
            {isToggleVisible ? (
                <BsFillEyeFill className='text-2xl text-gray-500 dark:text-gray-400'/>) : (
                <BsFillEyeSlashFill className='text-2xl text-gray-500 dark:text-gray-400'/>
            )}
            </button>
          <input
            type={isToggleVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className=" py-3  w-full bg-transparent block border-0 border-b-2 focus:outline-none border-ptc focus:border-bc text-ptc"
            required
          />
          </div>
     
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
            placeholder="Confirm Password"
            className="py-3  w-full block bg-transparent  border-b-2  border-ptc focus:outline-none  focus:border-bc text-ptc"
            required
          />
          <div>
            <p className=" text-ptc my-3">
              Already have an account?{" "}
              <Link to={"/login"}>
                <span className=" italic font-semibold">Log In</span>
              </Link>
            </p>
          </div>
          <button className=" rounded-2xl  w-full px-8 py-2 bg-transparent hover:bg-bc text-bc font-semibold hover:text-btc border border-btc hover:border-transparent">
            Create account
          </button>
        </div>
      </form>
    </div>
    {/* Pic div */}
    <div className=" h-screen hidden lg:flex">
      <img
        className=" rounded-2xl  w-full py-3"
        src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
        alt=""
        aria-hidden="true"
      />
    </div>
  </div>
   
  );
};

export default Register;
