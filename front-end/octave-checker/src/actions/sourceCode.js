import api from '../api';

export const sendCode = (code) =>
    api.code
       .sendCode(code);
    //    .then(code => console.log(code));

export const getCodeResult = (uuid) =>
    api.code
       .getCodeResult(uuid)
    //    .then(res => {res.status, res.data})
    //    .then(result => console.log(result))