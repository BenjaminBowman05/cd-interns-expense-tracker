import axios from 'axios';

const USER_BASE_API_URL = 'http://localhost:8080/user';

export function getAllUsers(){
    return axios.get(USER_BASE_API_URL);
}

export function createUser(user){
    return axios.post(USER_BASE_API_URL,user);
}

export function getUserById(id){
    return axios.get(`${USER_BASE_API_URL}/${id}`);
}

export function updateUser(id, user){
    return axios.put(`${USER_BASE_API_URL}/${id}`, user);
}

export function deleteUser(id){
    return axios.delete(`${USER_BASE_API_URL}/${id}`);
}
