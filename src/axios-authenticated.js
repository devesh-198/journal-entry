import axios from 'axios';

// Firebase Realtime database root URl 
const instance = axios.create({
    baseURL: 'https://journalify-962fa-default-rtdb.firebaseio.com/'
});

export default instance;