import axios from 'axios';
// import decode from 'jwt-decode';

import { API_URL } from './API_URLs';

class AuthService {
    async login(username, password) {
        const url = `${API_URL}/user/login`;

        axios.post(url).then(response => {
            // console.log('token', response.data.access_token);
            // const token = response.data.access_token;
            const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzgyNzg1MDcsImV4cCI6MTU3ODM2NDkwNywianRpIjoiN2NiMzFkNDgtZDIxNy00MjU3LTk1ODctY2ZiOTkyYWNlNzFiIiwiaWQiOjQsInJscyI6IlN0dWRlbnQiLCJyZl9leHAiOjE1NzgzNjQ5MDd9.cr7bgCT52cD1cCA1hDhYcilSdPAfje0StTe_AmXt4sw"
            const userType = response.data.user_type;

            this.setUserType(userType)
            this.setToken(token);
        })

        // change to this later on
        // axios.post(url, {
        //     email: this.state.email,
        //     password: this.state.password
        // }).then(response => this.setToken(response.data.access_token));
    }

    getUserInfo() {
        // axios.get(url, {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // }).then(res => this.setState({
        //     user: res.data
        // })).catch(err => {
        //     this.authService.removeToken();
        //     this.props.history.push("/login");
        // })
    }

    userAuthenticated() {
        const token = this.getToken();
        return token != null;
    }

    logout() {
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
    }

    setUserType(userType) {
        return localStorage.setItem('userType', userType)
    }

    getUserType() {
        return localStorage.getItem('userType')
    }

    /**
     * Note: idk if this is temp but setting token thru local storage is not safe bc it can be accessed with 
     * javascript. a better place is through cookies with 'htmlonly' property so it can't be accessed
     * through javascript
     * 
     * Also thru research there appears to be something called 'authorization code flow' which is serverside
     */
    setToken(token) {
        return localStorage.setItem('token', token)
    }

    getToken() {
        return localStorage.getItem('token')
    }
}

export default AuthService;
