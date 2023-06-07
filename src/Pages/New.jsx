import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../Services/Context/Context";
import {  postContactData } from "../Services/Apis/FireStoreApi";
import moment from "moment/moment";
import { getUniqueID } from "../Services/Common/Uuid/UniqueId";
import {LuImagePlus} from 'react-icons/lu'
import { uploadContactImage } from "../Services/Apis/ImageUploadApi";





const New = () => {
  const nav = useNavigate();
  const { menuActive } = useContext(StateContext);

  const [progresspercent, setProgressPercent] = useState(0);

  

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem('user'))


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("")

  const userName = user.name
  const userEmail = user.email

  



 const id = getUniqueID()


  const getTime = () => moment().format('llll')
  const contactData = { email, name, phone,  address, jobTitle,imgUrl, createDate: getTime(), updateDate: getTime(),contactId:id,userToken: token,userName,userEmail };


  

  const handleCreateContact= (e) => {
    e.preventDefault();
    postContactData(contactData)
    nav('/')
    
  }

 
const fileRef = useRef()

 

 

  useEffect(() => {
    if (!token) nav("/login");
  }, []);
  return (
    <motion.div
      initial={{ marginLeft: "20%" }}
      animate={menuActive ? { marginLeft: 0 } : { marginLeft: "20%" }}
      transition={{ duration: 0.25 }}
      className={`mt-8 bg-transparent ${menuActive ? "px-8" : ""}`}
    >
      <form onSubmit={handleCreateContact} action="" className=" w-[20rem]">
        <div onClick={() => fileRef.current.click()} className="w-[10rem] h-[10rem] mb-8 bg-button rounded-full grid place-items-center cursor-pointer" >
          <LuImagePlus className="text-button-text text-4xl"/>
        </div>
        <input ref={fileRef} onChange={(event) => uploadContactImage(event.target.files[0], setImgUrl, setProgressPercent)} type="file" name="" id="" className="hidden" />
        <div className="">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
            required
          />
        </div>
        <div className="my-5">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Phone"
            required

            className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2 "
          />
        </div>
        <div className="">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Email"
            className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
          />
        </div>
        <div className="my-5">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            required
            placeholder="Address"
            className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
          />
        </div>
        <div className="my-5">
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            type="text"
            placeholder="Job title"
            className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2"
          />
        </div>
        <div className="">
          <button className="bg-button px-3 py-2 text-button-text rounded-md">
            Add Contact
          </button>
        </div>
      </form>

      
    </motion.div>
  );
};

export default New;
