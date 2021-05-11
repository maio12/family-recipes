import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import {Modal} from './Modal';
import {Backdrop} from './Backdrop';

export const AddNewRecipeButton = () => {
    const {modalOpen, modalClose, openDialog, closeDialog} = useContext(GlobalContext);

    const handleModalClose = () => closeDialog();

    return (
        <div className="add-recipe__button--area">
            <button className="add-recipe__button" onClick={openDialog}>Add new recipe</button>
            {modalOpen && <Modal />}
            {modalOpen && <Backdrop onBackdropClick={handleModalClose} />}
        </div>
    )
}