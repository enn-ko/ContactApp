import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editComment, getContactById } from "../Services/Apis/FireStoreApi";
import { StateContext } from "../Services/Context/Context";
import { motion } from "framer-motion";
import EditContactForm from "../Components/EditContactForm";
import { LuImagePlus } from "react-icons/lu";
import { uploadContactImage } from "../Services/Apis/ImageUploadApi";

const Person = () => {
  const [contact, setContact] = useState({});
  const nav = useNavigate();
  const { id } = useParams();

  useMemo(() => {
    getContactById(setContact, id);
  }, []);

  // const [name, setName] = useState(contact?.name);
  // const [phone, setPhone] = useState(contact?.phone);
  // const [email, setEmail] = useState(contact?.email);
  // const [address, setAddress] = useState(contact?.address);
  // const [jobTitle, setJobTitle] = useState(contact?.jobTitle);

  const fileRef = useRef(null);
  const [progresspercent, setProgressPercent] = useState(0);
  const [inputImage, setInputImage] = useState(0);

  const [imgUrl, setImgUrl] = useState("");

  const handleImageUpload = (event) => {
    uploadContactImage(event.target.files[0], setImgUrl, setProgressPercent);

    const file = event?.target?.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setInputImage(imageURL);
    }
  };

  const { menuActive } = useContext(StateContext);

  const token = localStorage.getItem("token");
  const username = contact?.name;

  const [editActive, setEditActive] = useState(false);

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
      <div className="">
        <div className="pb-4 mr-8 border-b-2 ">
          {editActive ? (
            <div className="">
              <div
                onClick={() => fileRef.current.click()}
                className="w-[8rem] h-[8rem] mb-8 bg-button rounded-full grid place-items-center cursor-pointer overflow-hidden"
              >
                {inputImage? (
                  <img src={inputImage} className="block w-full h-full" alt="" />
                    
                ): (

                    <LuImagePlus className="text-button-text text-4xl" />
                )}
              </div>
              <input
                ref={fileRef}
                onChange={(event) => handleImageUpload(event)}
                type="file"
                name=""
                id=""
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex items-center justify-start gap-8">
              {contact?.imgUrl ? (
                <div className="w-[10rem] h-[10rem] rounded-full overflow-hidden">
                  <img src={contact?.imgUrl} className="block" alt="" />
                </div>
              ) : (
                <div className="w-[10rem] h-[10rem] rounded-full bg-green-500 grid place-items-center">
                  <h1 className="text-5xl">{username && username[0]}</h1>
                </div>
              )}
              <h1 className="text-xl">{username}</h1>
            </div>
          )}

          <div className="text-right w-[80%]">
            <button
              onClick={() => setEditActive(!editActive)}
              className="bg-blue-400 px-4 py-2 rounded-md "
            >
              To prepare
            </button>
          </div>
        </div>

        <div className="">
          {editActive ? (
            <EditContactForm
              contact={contact}
              imgUrl={imgUrl}
              inputImage={inputImage}
            />
          ) : (
            <div className="mt-10 flex items-center justify-start gap-10">
              <div className="border px-6 py-4 basis-[40%]">
                <h4>Contact details</h4>
                <p>{contact?.email}</p>
                <p>{contact?.phone}</p>
              </div>
              <div className="">
                <h6>Records</h6>
                <p>Last update time : {contact?.updateDate}</p>
                <p>Last update time : {contact?.createDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Person;
