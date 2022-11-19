import { Login } from "./Login.js";

const togglePassword = document.querySelector('#togglePassword');
const buttonLogin = document.querySelector('#btn-login');
const password = document.querySelector('#id_password');
const modalFailed = document.getElementById("login-failed-modal");
const modalEmpty = document.getElementById("login-empty-modal");
const okFailed = document.getElementById("button-ok-failed");
const okEmpty = document.getElementById("button-ok-empty");

togglePassword.addEventListener('click', () => {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
}); ``

buttonLogin.addEventListener('click', () => {
  const user_password = password.value; 
  Login.sendForm(user_password);
});

password.addEventListener('keypress', e => {
  const user_password = password.value;
  if(e.key === 'Enter') Login.sendForm(user_password);
});

okFailed.addEventListener('click', () => {
  modalFailed.style.display = "none";
});

okEmpty.addEventListener('click', () => {
  modalEmpty.style.display = "none";
})

window.addEventListener('click', e => {
  if (e.target == modalFailed) {
    modalFailed.style.display = "none";
  }
  if(e.target == modalEmpty){
    modalEmpty.style.display = "none";
  }
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')


