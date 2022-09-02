// import api from "../../service/api";
// import { GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE } from "./actionTypes";
import { userConstants } from "../../constants/userConstants";
import { userService } from "../../services/user.service";
import history from "../../utils/history";
import { pushNotification } from "../../utils/notifications";

export const userActions = {
  loading,
  updateAdmin,
  forgotpassword,
  resetpassword
};




function updateAdmin(id, user) {
  return (dispatch) => {
    dispatch(request());

    userService.updateAdmin(id, user).then(
      (user) => {
        dispatch(success(user));
        history.push("/dashboard");
        pushNotification("profile update successfully", "success");
      },
      (error) => {
        dispatch(failure(error.toString()));
        console.log("error", error);
        pushNotification(error.response.data.message, "error");
      }
    );
  };

  function request(id) {
    return { type: userConstants.UPDATEADMIN_REQUEST };
  }
  function success(userData) {
    return { type: userConstants.UPDATEADMIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATEADMIN_FAILURE, error };
  }
}

function forgotpassword(userEmail) {
  return (dispatch) => {
    dispatch(loading(true));
    userService.forgotpassword(userEmail).then(
      (userEmail) => {
        dispatch(success(userEmail));
        dispatch(loading(false));
        pushNotification("Email sent successfully", "success");
      },
      (error) => {
        dispatch(loading(false));
        pushNotification(error.response.data.message, "error");
      }
    );
  };
  function success(userEmail) {
    return { type: userConstants.FORGOTPASSWORD };
  }
}

function resetpassword(userToken, newPassword) {
  return (dispatch) => {
    dispatch(loading(true));
    userService.resetpassword(userToken, newPassword).then(
      (userToken) => {
        dispatch(loading(false));
        history.push("/login");
        pushNotification("Password Changed successfully", "success");
      },
      (error) => {
        dispatch(loading(false));
        pushNotification(error.response.data.message, "error");
      }
    );
  };
}


function loading(loading) {
  return { type: userConstants.SHOW_LOADING, loading };
}