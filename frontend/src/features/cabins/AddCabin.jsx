import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opensWindowName="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
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
