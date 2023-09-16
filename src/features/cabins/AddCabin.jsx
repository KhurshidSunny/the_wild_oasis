import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opensWindowName="cabin-form">
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opensWindowName="table">
        <Button>show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isShowModal, setIsShowModal] = useState(false);
//   function handlCloseModal() {
//     setIsShowModal(false);
//   }
//   return (
//     <div>
//       <Button onClick={() => setIsShowModal((show) => !show)}>Add Cabin</Button>
//       {isShowModal && (
//         <Modal onCloseModal={handlCloseModal}>
//           <CreateCabinForm onCloseModal={handlCloseModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
