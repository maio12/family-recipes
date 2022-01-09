import React, { useContext } from "react";
import Page from "../Page";

import { GlobalContext } from "../../context/GlobalState";
import { LoginSignupModal } from "../../components/Modal/LoginSignupModal";
import { Backdrop } from "../../components/Backdrop/Backdrop";

export const SplashPage = () => {
  const {
    openLoginDialog,
    openSignupDialog,
    closeLoginSignupDialog,
    modalLoginOpen,
    modalSignupOpen,
  } = useContext(GlobalContext);
  const handleModalClose = () => {
    closeLoginSignupDialog();
  };

  return (
    <Page>
      <div>
        {/* <button className="splash__button" type="primary" size="large">
          <Link to="/redirect">Login or Signup with Google</Link>
        </button> */}
        <button
          className="splash-button__login"
          type="primary"
          size="large"
          onClick={() => openLoginDialog()}
        >
          Login
        </button>
        {modalLoginOpen && <LoginSignupModal type={"login"} />}

        <button
          className="splash-button__signup"
          type="primary"
          size="large"
          onClick={() => openSignupDialog()}
        >
          Create an account
        </button>
        {modalSignupOpen && <LoginSignupModal type={"signup"} />}
        {(modalLoginOpen || modalSignupOpen) && (
          <Backdrop onBackdropClick={() => handleModalClose()} />
        )}
      </div>
    </Page>
  );
};
