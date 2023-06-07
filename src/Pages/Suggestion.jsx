import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { StateContext } from "../Services/Context/Context";

import svg from '../../img/suggession.svg'
import { useNavigate } from "react-router-dom";

const Suggestion = () => {
  const nav = useNavigate()

  const token = localStorage.getItem('token')


  useEffect(() => {
    if(!token) nav('/login')
  }, [])
  const { menuActive } = useContext(StateContext);

  return (
    <motion.div
      initial={{ marginLeft: "20%" }}
      animate={menuActive ? { marginLeft: 0 } : { marginLeft: "20%" }}
      transition={{ duration: 0.25 }}
      className="text-para px-8"
    >
      <div className="">
          <img src={svg}  className="w-[40%] h-auto mx-auto" alt="" />
        <h4 className="text-primary text-center font-medium text-3xl ">
          Good. There are no new suggestions.
        </h4>
      </div>
    </motion.div>
  );
};

export default Suggestion;
