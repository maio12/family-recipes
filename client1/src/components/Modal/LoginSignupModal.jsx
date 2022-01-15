import { LOGIN, SIGNUP } from "../../constants/constants";
import { Login } from "../LoginSignupModal/Login";
import { Signup } from "../LoginSignupModal/Signup";

export const LoginSignupModal = ({ type }) => {
  return (
    <div className="modal">
      {type === LOGIN && <Login />}
      {type === SIGNUP && <Signup />}
    </div>
  );
};
