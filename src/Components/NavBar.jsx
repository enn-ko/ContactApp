import { BiMenu } from "react-icons/bi";
import { GrCircleQuestion } from "react-icons/gr";
import { TbSettings } from "react-icons/tb";
import { TbGridDots } from "react-icons/tb";
import { BiUserCircle } from "react-icons/bi";
import { MdSearch } from "react-icons/md";





import user from "../../img/user.png";
import { useContext } from "react";
import { StateContext } from "../Services/Context/Context";
const NavBar = () => {

 
  

  const {menuActive, setMenuActive,isToggledVisible,setIsToggledVisible} = useContext(StateContext)

  function handleToggleSearch (){
    // setIsToggleVisible((prevState) => !prevState);
    setIsToggledVisible(!isToggledVisible)

  }

  return (
    <div className="flex justify-between items-center md:gap-5 md:px-6 pt-2">
      <div className="flex items-center justify-start gap-3 basis-[18%]">
        <button onClick={() =>  setMenuActive(!menuActive)} className="p-3 hover:bg-gray-200 duration-200 rounded-full">

        <BiMenu className="text-2xl" />
        </button>
        <div className="flex justify-start items-center gap-2">
          <img src={user} alt="user png"  className="w-[2.5rem] hidden md:block"/>
          <p className="text-xl">Contacts</p>
        </div>
      </div>
      <div className="flex items-center justify-between md:ml-5 flex-1">
        <button 
        onClick={handleToggleSearch}
        className="md:hidden flex flex-col items-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
          <MdSearch className="text-xl"/>
          {isToggledVisible && (
          <div className="bg-gray-200 px-3 py-3 basis-[60% ] absolute top-2.5 right-4 items-center justify-start gap-5 rounded-md" id="navbar-search">
            <input type="text" placeholder="Search" className="focus:outline-none bg-transparent flex-1" />
          </div>
        )}
        </button>
     
        <div className="bg-gray-200 px-3 py-3 basis-[60%] hidden md:flex items-center justify-start gap-5 rounded-md" id="navbar-search">
        <button>
          <MdSearch className="text-xl"/>
        </button>
        <input type="text" placeholder="Search" className="focus:outline-none bg-transparent flex-1" />
        </div>
      <div/>
      <div className="flex items-center justify-start gap-6 px-5">
        <GrCircleQuestion className="text-2xl"/>
        <TbSettings className="text-2xl"/>
      </div>

      </div>
      <div className="flex items-center gap-5">
        <TbGridDots className="text-xl"/>
        <BiUserCircle className="text-4xl"/>
      </div>
    </div>
  );
};

export default NavBar;
