import { motion } from "framer-motion";
import { useContext, useEffect, useState,useMemo } from "react";
import { StateContext } from "../Services/Context/Context";
import { FaPlus } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { LuBookDown } from "react-icons/lu";
import { BiInfoCircle } from "react-icons/bi";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiPlus } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllContactData } from "../Services/Apis/FireStoreApi";
import { useLogoutMutation } from "../Services/Apis/authApi";
import { removeUser } from "../Services/slice/userSlice";
import { useDispatch } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { BsColumns } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { GrFormClose } from "react-icons/gr";
import Swal from "sweetalert2";





const SideBar = () => {

  

  const location = useLocation()

  const nav = useNavigate()

  const [logout] = useLogoutMutation()

  const token = localStorage.getItem('token')

  const dispatch = useDispatch()

  const [modalActive, setModalActive] = useState(false);

  
  const [allContacts, setAllContacts] = useState([])
  useMemo(() => {
    getAllContactData(setAllContacts,token)
  }, [])

  const swalWithButtons = Swal.mixin({
    customClass: {
        confirmButton: "bg-button text-white px-3 py-2 rounded-md text-xl ml-3 mx-3",
        cancelButton: "bg-red-500 text-white px-3 py-2 rounded-md text-xl",
    },
    buttonsStyling: false
  })


const handleLogout = () => {

    swalWithButtons.fire({
        title: 'Are you sure?',
        text: "You want to be LogOut!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes,logout!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(async(result) => {
        if (result.isConfirmed) {
          try {
            const {data} = await logout(token)
            console.log(data)
            dispatch(removeUser())
            if(data.success) nav('/login')
            
          } catch (error) {
            console.log(error)
          }
          swalWithButtons.fire(
            'Logout!',
            'Your account has been logout.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithButtons.fire(
            'Cancelled',
            'Your account is safe :)',
            'error'
          )
        }
      })
      





    
}

  // const handleLogout = async () => {
  //   try {
  //     const {data} = await logout(token)
  //     console.log(data)
  //     dispatch(removeUser())
  //     if(data.success) nav('/login')
      
  //   } catch (error) {
  //     console.log(error)
  //   }
   
  // }
  
  const { menuActive } = useContext(StateContext);
  const [contact, setContact] = useState(false)
  const [often, setOften] = useState(false)
  const [other, setOther] = useState(false)

  const [consolidate, setConsolidate] = useState(false)
  const [trash, setTrash] = useState(false)



  useEffect(() => {
    if(location.pathname == '/') setContact(true)
    if(location.pathname=='/suggestion') setConsolidate(true)

  }, [])


  return (
    <motion.div
    className=" w-[57%] sm:w-[33%] md:w-[29%] lg:w-[21%] md:none max-h-full bg-background absolute px-2 overflow-y-auto top-20 left-0"
      initial={{x:0}}

      animate={menuActive ? { x: -400 } : { x: 0}}
      transition={{ duration: 0.25 }}
      // className={` basis-[16%]`}
    >
      <div className="px-2 mt-5">
        <button onClick={() =>  setModalActive(!modalActive)} className="flex items-center justify-between gap-3 bg-button shadow px-5 py-3 rounded-full">
          <FaPlus className="text-white"/>
          <span className="text-md text-button-text font-semibold">Create contact</span>
          <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0,
                      height: "2rem",
                      width: "5rem",
                    }}
                    animate={
                      modalActive
                        ? {
                            opacity: 1,
                            scale: 1,
                            height: "6rem",
                            width: "15rem",
                          }
                        : {
                            opacity: 0,
                            scale: 0,
                            height: "2rem",
                            width: "5rem",
                          }
                    }
                    transition={{ duration: 0.2 }}
                    className="absolute top-0   right-0 px-4 py-6 bg-button text-button-text shadow-lg rounded-sm z-50"
                  >
                    <GrFormClose onClick={() => setModalActive(false)} className="absolute top-0 right-0 text-2xl cursor-pointer"/>
                    <div className="">
                      <Link to={'/new'}>
                      <div className="flex items-center justify-start gap-5 mb-3">
                        <FaRegUser />
                        <span>Add contact</span>
                      </div>
                      </Link>
                      <div className="flex items-center justify-start gap-5">
                        <LuUsers />
                        <span>To other contact</span>
                      </div>
                    </div>
                  </motion.div>
        </button>
      </div>

      <div className=" mt-5">
        <div className="">
          <Link to={'/'}>
          <button onClick={() => (setContact(true), setOften(false), setOther(false), setConsolidate(false), setTrash(false))} className={`flex items-center justify-start gap-8  px-6  rounded-e-full py-2 w-full ${contact? "bg-button text-button-text":"hover:bg-[#4f546b]"}`}>
            <FaRegUser />
            <p>Contact</p>
            <span>{allContacts.length}</span>
          </button>
          </Link>
          <button onClick={() => (setContact(false), setOften(true), setOther(false), setConsolidate(false), setTrash(false))} className={`flex items-center justify-start gap-8   px-6  rounded-e-full py-2 w-full ${often?'bg-button text-button-text' :'hover:bg-[#4f546b]'}`}>
            <RxCounterClockwiseClock />
            <p>Often</p>
          </button>
          <button  onClick={() => (setContact(false), setOften(false), setOther(true), setConsolidate(false), setTrash(false))} className={`flex items-center justify-between gap-8   px-6  rounded-e-full py-2 w-full ${other? "bg-button text-button-text ": "hover:bg-[#4f546b]"}`}>
            <div className="flex items-center justify-start gap-4">
              <LuBookDown />
              <p className="flex-1">Other Contacts</p>
            </div>
            <BiInfoCircle />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="px-6 mb-3">Clear and manage</h4>
        <Link to={'/suggestion'}>
        <button  onClick={() => (setContact(false), setOften(false), setOther(false), setConsolidate(true), setTrash(false))} className={`flex items-center justify-start gap-8    px-6  rounded-e-full py-2 w-full ${consolidate? "bg-button text-button-text": "hover:bg-[#4f546b]"}`}>
          <MdOutlineAutoFixHigh />
          <p className="truncate">To consolidate and prepare</p>
        </button>
        </Link>
        <Link to={'/trash'}>
        <button  onClick={() => (setContact(false), setOften(false), setOther(false), setConsolidate(false), setTrash(true))} className={`flex items-center justify-start gap-8   px-6  rounded-e-full py-2 w-full ${trash? 'bg-button text-button-text':'hover:bg-[#4f546b] '}`}>
          <RiDeleteBin6Line />
          <p>Trash can</p>
        </button>
        </Link>

        <button onClick={handleLogout} className="px-3 py-2 bg-button text-button-text rounded-md mt-5 w-full">
          Log Out
        </button>
      </div>

      <div className="flex items-center justify-between gap-8   px-6  rounded-e-full py-2 mt-8">
        <p>Indicator</p>
        <BiPlus className="text-xl font-bold" />
      </div>
    </motion.div>
  );
};

export default SideBar;
