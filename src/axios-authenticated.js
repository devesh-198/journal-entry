import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://journalify-962fa-default-rtdb.firebaseio.com/'
});

export default instance;