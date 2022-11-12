import { Login } from "./Login.js";

const togglePassword = document.querySelector('#togglePassword');
const buttonLogin = document.querySelector('#btn-login');
const password = document.querySelector('#id_password');

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
})

fetch('http://127.0.0.1:5000/produk')
  .then((response) => response.json())
  .then((data) => console.log(data));