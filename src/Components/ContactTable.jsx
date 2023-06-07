import { useContext, useEffect, useMemo, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillMinusSquare } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
import { CgToggleSquareOff } from "react-icons/cg";
import { LuBookDown } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsColumns } from "react-icons/bs";

import { StateContext } from "../Services/Context/Context";
import { motion } from "framer-motion";
import ContactTableComponent from "./ContactTableComponent";
import { getAllContactData, postContactData } from "../Services/Apis/FireStoreApi";
import { useNavigate } from "react-router-dom";
import { useGetContactQuery } from "../Services/Apis/ContactApi";
const ContactTable = () => {

  const [allContacts, setAllContacts] = useState([])

  const nav = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) nav("/login");
  }, []);

  // const { data } = useGetContactQuery(token);


  const { menuActive } = useContext(StateContext);

  const [checkedAmount, setCheckedAmount] = useState(0);
  const [minusClick, setMinusClick] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalActive2, setModalActive2] = useState(false);

  // const contacts = data?.contacts.data;

  useMemo(() => {
    getAllContactData(setAllContacts,token)
  }, [])

  

  return (
    <motion.div
      initial={{ marginLeft: "20%" }}
      animate={menuActive ? { marginLeft: 0 } : { marginLeft: "20%" }}
      transition={{ duration: 0.25 }}
      className={`flex-1 px-8 overflow-x-auto h-screen`}
    >
      <table className="table-auto w-full px-5 font-medium ">
        <thead className="">
          {checkedAmount <= 0 ? (
            <tr className="border-b-[1px] ">
              <th className="text-start w-1/5">Name</th>
              <th className="text-start w-1/5">Email</th>
              <th className="text-start  w-1/5">Phone</th>
              <th className="text-start">Job title</th>
              <motion.th
                initial={{ opacity: 0, display: "none" }}
                animate={
                  menuActive
                    ? { opacity: 1, display: "inline-block" }
                    : { opacity: 0, display: "none" }
                }
                transition={{ duration: 0.45 }}
                className="text-start"
              >
                
              </motion.th>

              <th
                colSpan={menuActive ? 1 : 2}
                className="text-end relative font-primary"
              >
                <div className="flex items-center justify-end gap-4">
                  <AiFillPrinter className="text-xl" />
                  <FiDownload className="text-xl" />
                  <FiUpload className="text-xl" />
                  <HiOutlineDotsVertical
                    onClick={() => setModalActive2(!modalActive2)}
                    className="text-xl cursor-pointer"
                  />
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0,
                      height: "2rem",
                      width: "5rem",
                    }}
                    animate={
                      modalActive2
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
                    className="absolute top-[3rem]   right-0 px-4 py-6 bg-button text-button-text shadow-lg rounded-sm z-50"
                  >
                    <div className="">
                      <div className="flex items-center justify-start gap-5">
                        <FiUpload />
                        <span>Display pixel density</span>
                      </div>
                      <div className="flex items-center justify-start gap-5">
                        <BsColumns />
                        <span>Change column order</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </th>
            </tr>
          ) : (
            <tr className="border-b-[1px]">
              <th className="text-start w-1/5">
                <div className="flex items-center justify-start gap-3">
                  <button>
                    <AiFillMinusSquare
                      onClick={() => setMinusClick(!minusClick)}
                      className="text-2xl"
                    />
                  </button>
                  <BsFillCaretDownFill className="text-md" />
                  <span>{checkedAmount} selected</span>
                </div>
              </th>
              <th className="w-1/5"></th>
              <th className=" w-1/5"></th>
              <th></th>
              <th></th>

              <th colSpan={menuActive ? 1 : 2} className="text-end relative">
                <div className="flex items-center justify-end gap-4">
                  <AiFillPrinter className="text-xl" />
                  <FiDownload className="text-xl" />
                  <FiUpload className="text-xl" />
                  <HiOutlineDotsVertical
                    onClick={() => setModalActive2(!modalActive2)}
                    className="text-xl cursor-pointer"
                  />
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0,
                      height: "1rem",
                      width: "2rem",
                    }}
                    animate={
                      modalActive2
                        ? {
                            opacity: 1,
                            scale: 1,
                            height: "6rem",
                            width: "15rem",
                          }
                        : {
                            opacity: 0,
                            scale: 0,
                            height: "1rem",
                            width: "2rem",
                          }
                    }
                    transition={{ duration: 0.2 }}
                    className="absolute top-[3rem]   right-0 px-4 py-6 bg-button text-button-text shadow-lg rounded-sm z-50"
                  >
                    <div className="">
                      <div className="flex items-center justify-start gap-5">
                        <FiUpload />
                        <span>Display pixel density</span>
                      </div>
                      <div className="flex items-center justify-start gap-5">
                        <BsColumns />
                        <span>Change column order</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </th>
            </tr>
          )}
        </thead>
        <tbody className="max-h-[50vh] overflow-y-auto">
          <tr>
            <td>
              <p className="my-3">Contacts ({allContacts?.length})</p>
            </td>
          </tr>
          {allContacts?.map((contact, i) => (
            <ContactTableComponent
              key={i}
              contact={contact}
              setCheckedAmount={setCheckedAmount}
              checkedAmount={checkedAmount}
              minusClick={minusClick}
            />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ContactTable;
