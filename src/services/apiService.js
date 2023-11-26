import axios from 'axios';
export const getDocumentById = (id) =>{
    return axios.get(`https://docstory-jangelcepeda.b4a.run/documents/${id}`)
                .then(response => response.data);
}