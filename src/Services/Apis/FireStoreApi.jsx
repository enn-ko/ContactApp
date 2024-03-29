import {  addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../../../firebase.config";

let contactsRef = collection(firestore, 'contacts')
let trashRef = collection(firestore, 'trash')


export const postContactData = (object) => {
    addDoc(contactsRef, object)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  export const getAllContactData = (setAllContacts,userToken) => {
    const contactByToken = query(contactsRef, where("userToken", "==", userToken));

    onSnapshot(contactByToken, (response) => {
      setAllContacts(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  export const getContactById = (setContact, contactId) => {
    const singleQueryUser = query(contactsRef, where("contactId", "==", contactId));
    onSnapshot(singleQueryUser, (res) => {
      setContact(
        res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })[0]
      );
    });
  };

  export const deleteContact = (id) => {
    let docToDelete = doc(contactsRef, id);
    try {
      deleteDoc(docToDelete);
    } catch (err) {
      console.log(err);
    }
  };

  export const editComment = (contactId, updatedData) => {
    const contactDocRef = doc(contactsRef, contactId);

  
  
    updateDoc(contactDocRef, updatedData)
      .then(() => {
      })
      .catch((err) => {
        console.log('Error updating data:', err);
      });
  };

  export const updateTrash = (data) => {
    addDoc(trashRef, data) 

    .then(() => {

    })
    .catch((error) => {
      console.log(error)
    })

  }

  export const getAllTrashData = (setAllTrash,userToken) => {
    const contactByToken = query(trashRef, where("userToken", "==", userToken));

    onSnapshot(contactByToken, (response) => {
      setAllTrash(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  export const deleteTrash = (id) => {
    let docToDelete = doc(trashRef, id);
    try {
      deleteDoc(docToDelete);
    } catch (err) {
      console.log(err);
    }
  };