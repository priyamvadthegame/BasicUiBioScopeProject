import { Injectable } from '@angular/core';
var CryptoJS = require("crypto-js");
const SecureStorage = require('secure-web-storage');
const SECRET_KEY = 'secret_key';
@Injectable()
export class StorageService {
constructor() { }
public secureStorage = new SecureStorage(sessionStorage, {
// Encrypt the localstorage data
encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    data = data.toString();
    return data;
},
// Decrypt the encrypted data
decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    data = data.toString(CryptoJS.enc.Utf8);
    return data;
},
hash:function hash(key){
    return key;
}
}
);

}