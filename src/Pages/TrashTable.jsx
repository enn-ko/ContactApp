import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTrashData } from "../Services/Apis/FireStoreApi";
import { motion } from "framer-motion";
import TrashTableComponent from "../Components/TrashTableComponent";
import { StateContext } from "../Services/Context/Context";

const TrashTable = () => {
  const [allTrash, setAllTrash] = useState([]);
  const nav = useNavigate();

  const token = localStorage.getItem("token");
  const { menuActive } = useContext(StateContext);

  useMemo(() => {
    getAllTrashData(setAllTrash, token);
  }, []);

  useEffect(() => {
    if (!token) nav("/login");
  }, []);
  return (
    <motion.div
      initial={{ marginLeft: "20%" }}
      animate={menuActive ? { marginLeft: 0 } : { marginLeft: "20%" }}
      transition={{ duration: 0.25 }}
      className={`flex-1 px-8  `}
    >
      <table className="table-auto w-full px-5 font-medium ">
        <thead>
            <tr>
                <td className="w-[30%]">Name</td>
                <td className="w-[30%]">Why is in the trash?</td>
                <td className="w-[30%]">date of deletion</td>
            </tr>
        </thead>
        <tbody>
            {allTrash?.map(trash => <TrashTableComponent key={trash.id} trash={trash}/>)}
        </tbody>
      </table>
    </motion.div>
  );
};

export default TrashTable;
