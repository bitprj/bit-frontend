import { backend } from "./AxiosInstances";

class AuthService {
  async postLogin(username, password) {
    const endpoint = "user/login";
    return backend.post(endpoint, {
      username,
      password
    });
  }

  // const userType = response.data.user_type;
  // this.setUserType(userType)
  // this.setToken(token);

  userAuthenticated() {
    // const token = this.getToken();
    // return token != null;
  }

  // logout() {
  //     localStorage.removeItem('userType');
  //     localStorage.removeItem('token');
  // }

  // setUserType(userType) {
  //     return localStorage.setItem('userType', userType)
  // }

  // getUserType() {
  //     return localStorage.getItem('userType')
  // }

  // /**
  //  * Note: idk if this is temp but setting token thru local storage is not safe bc it can be accessed with
  //  * javascript. a better place is through cookies with 'htmlonly' property so it can't be accessed
  //  * through javascript
  //  *
  //  * Also thru research there appears to be something called 'authorization code flow' which is serverside
  //  */
  // setToken(token) {
  //     return localStorage.setItem('token', token)
  // }

  // getToken() {
  //     return localStorage.getItem('token')
  // }
}

export default AuthService;
