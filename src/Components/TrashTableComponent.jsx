import { BiUserCircle } from "react-icons/bi";
import { deleteTrash, postContactData } from "../Services/Apis/FireStoreApi";
import Swal from "sweetalert2";

const TrashTableComponent = ({ trash }) => {
    const trashId = trash?.id
    const swalWithButtons = Swal.mixin({
        customClass: {
            confirmButton: "bg-button text-white px-3 py-2 rounded-md text-xl ml-3 mx-3",
            cancelButton: "bg-red-500 text-white px-3 py-2 rounded-md text-xl",
        },
        buttonsStyling: false
      })


    const handleTrashDelete = () => {

        swalWithButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,recover!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                deleteTrash(trashId)
        postContactData(trash)
              swalWithButtons.fire(
                'Deleted!',
                'Your contact has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithButtons.fire(
                'Cancelled',
                'Your imaginary contact is safe :)',
                'error'
              )
            }
          })
          





        
    }
  return (
    <tr className="trashRow">
      <td className="flex items-center justify-start gap-2">
        <div className="w-10 h-10">
          <BiUserCircle className="text-4xl " />
        </div>

        {trash?.name}
      </td>
      <td>Deleted in Google Contacts (web).</td>
      <td>{trash?.deletionDate}</td>

      <td>
        <div onClick={handleTrashDelete} className="recoverBtn">
          <button>recover</button>
        </div>
      </td>
    </tr>
  );
};

export default TrashTableComponent;
