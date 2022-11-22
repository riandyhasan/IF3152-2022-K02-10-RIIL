export class Auth {
  static authPassword = 'RIILBGT';

  static validateAuth(user_password){
    return user_password === Auth.authPassword;
  }

}