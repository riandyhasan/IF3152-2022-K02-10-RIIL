import { Auth } from "./Auth.js";
const modalSuccess = document.getElementById("login-success-modal");
const modalFailed = document.getElementById("login-failed-modal");
const modalEmpty = document.getElementById("login-empty-modal");

export class Login {

  static validateForm(user_password){
    return user_password !== '';
  }

  static sendForm(user_password){
    const validation = Login.validateForm(user_password);
    if(validation){
      if(Auth.validateAuth(user_password)){
        modalSuccess.style.display = "block";
      }else{
        modalFailed.style.display = "block";
      }
    }else{
      modalEmpty.style.display = "block";
    }
  }
}