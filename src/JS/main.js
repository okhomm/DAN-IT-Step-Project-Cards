
import {Modal} from "./Modal.js";



document.querySelector('#login-btn').addEventListener('click',  () => { new Modal().user() })

if (localStorage.getItem("token")) {new Modal().authorization()}