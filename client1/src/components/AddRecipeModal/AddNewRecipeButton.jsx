import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

import { Modal } from "../Modal/Modal";
import { Backdrop } from "../Backdrop/Backdrop";

export const AddNewRecipeButton = () => {
  const { modalOpen, openDialog, closeDialog } = useContext(GlobalContext);

  const handleModalClose = () => closeDialog();

  return (
    <div className="add-recipe__button--area">
      <button className="add-recipe__button" onClick={() => openDialog()}>
        Add new recipe
      </button>
      {modalOpen && <Modal />}
      {modalOpen && <Backdrop onBackdropClick={handleModalClose} />}
    </div>
  );
};
