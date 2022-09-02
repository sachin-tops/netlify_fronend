// import api from "../utils/interceptor";
import api from "../utils/interceptor";
import { toast } from "react-toastify";
import * as actions from "./index";
//  import jwtDecode from "jwt-decode";
//  import { getUser } from './actions';
import { tokenService } from "../services/tokenService";
import history from "../utils/history";

export const register = (user) => {
  return (dispatch) => {
    dispatch(actions.userSignupRequest());
    api
      .post(`/auth/register`, user)
      .then((token) => {
        history.push("/dashboard");
        localStorage.setItem("token", token.data.tokens.access.token);
        dispatch(actions.userSignupSuccess(token));
       
       
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(actions.userSignupFailure(errorMessage,"danger"));
        console.log(error);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};



// export const loadUser = (refreshToken) => {
//   return (dispatch) => {
//     dispatch(actions.loadUserRequest());
//     api
//       .post("auth/refresh-tokens", refreshToken)
//       .then((token) => {
//         // console.log(refreshToken)
//         localStorage.setItem("token", token.data.access.token);
//          localStorage.setItem("refreshToken", token.data.refresh.token);
        
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         dispatch(actions.loadUserFailure(errorMessage));
//         toast.error(error.errorMessage, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       });
//   };
// };


// export const loadUser = (refreshToken) => {
//   return (dispatch) => {
//     dispatch(actions.loadUserRequest());
//     api
//       .post("auth/refresh-tokens", refreshToken)
//       .then((token) => {
//         // localStorage.setItem("token", token.data.tokens.access.token);
//         localStorage.setItem("refreshTokens", token.data.tokens.refresh.token);
//         dispatch(actions.loadUserSuccess(token));
//         const { sub: userId } = jwtDecode(token.data.tokens.access.token);
//         console.log(userId);
//         const loadUserDetails = (userId) => {
//           api.get(`users/${userId}`).then((results) => {
//             console.log(results.data);
//             dispatch(getUser(results.data))
//             // dispatch(actions.loadUserSuccess(user.data));
//           });
//         };
//         loadUserDetails(userId);

//         // console.log("sachin",refreshToken)
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         dispatch(actions.loadUserFailure(errorMessage));
//         toast.error(error.errorMessage, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       });
//   };
// };

export const login = (user) => {
  return (dispatch) => {
    dispatch(actions.userLoginRequest());
    api
      .post(`/auth/login`, user)
      .then((token) => {
          tokenService.setUser(token.data);
        // console.log(token)
         localStorage.setItem("token", token.data.tokens.access.token);
         localStorage.setItem("refreshToken", token.data.tokens.refresh.token);
        dispatch(actions.userLoginSuccess(token));

       
          
          // console.log("sachin",refreshToken)
      
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(actions.userLoginFailure(errorMessage));
        console.log(error);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,

        });
        return Promise.reject(error);
      });

  };
};


// export const logOut = () => {
//   return (dispatch) => {
//     dispatch(actions.userLogout());
//     // const refreshToken = { refreshToken: tokenService.getLocalRefreshToken() };
//      api
//         .post("auth/logout", refreshToken)
//         .then((token) => {
//           // localStorage.setItem("token", token.data.tokens.access.token);
//           localStorage.setItem("refreshToken", token.data.tokens.refresh.token);
//           // dispatch(actions.loadUserSuccess(token));
          
          
//           // console.log("sachin",refreshToken)
//         })
//   };
// };

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("redux");
  return (dispatch) => {
    dispatch(actions.userLogout());
  };
};