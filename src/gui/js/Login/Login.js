import { Auth } from "./Auth.js";

export class Login {

  static validateForm(user_password){
    return user_password !== '';
  }

  static sendForm(user_password){
    const validation = Login.validateForm(user_password);
    if(validation){
      if(Auth.validateAuth(user_password)){
        alert('Login berhasil');
        window.ipcRender.send('homeShow');
      }else{
        alert('Password salah!');
      }
    }else{
      alert('Mohon isi password!');
    }

  }

}