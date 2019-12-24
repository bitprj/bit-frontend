import axios from 'axios';
// import decode from 'jwt-decode';

import { API_URL } from './API_URL';

class AuthService {
    async login(username, password) {
        const url = `${API_URL}/user/login`;

        axios.post(url).then(response => {
            // console.log('token', response.data.access_token);
            const token = response.data.access_token;
            localStorage.setItem('userType', 'student')
            localStorage.setItem('token', token);
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
        const token = localStorage.getItem('token')
        return token != null;
    }

    logout() {
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
    }
}

export default AuthService;