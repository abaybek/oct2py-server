import axios from 'axios';
// import qs from 'qs';

export default {
    code: {
        sendCode: source =>{
            console.log('Sending with axios', source);
            return axios.post('/api/v1/scripts/runscript/', {code: source});
        },
        getCodeResult: uuid => {
            console.log('Uuid number of task', uuid);
            return axios.get(`/api/v1/scripts/result/?job=${uuid}`)
        }
    }
}