import axios from 'axios';

const SELECTIONS_BASE_API_URL = 'http://localhost:8080/selections';

export function getAllSelections(){
    return axios.get(SELECTIONS_BASE_API_URL);
}

export function createSelections(selections){
    return axios.post(SELECTIONS_BASE_API_URL,selections);
}

export function getSelectionsById(id){
    return axios.get(`${SELECTIONS_BASE_API_URL}/${id}`);
}

export function updateSelections(id, selections){
    return axios.put(`${SELECTIONS_BASE_API_URL}/${id}`, selections);
}

export function deleteSelections(id){
    return axios.delete(`${SELECTIONS_BASE_API_URL}/${id}`);
}
