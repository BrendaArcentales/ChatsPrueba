import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private afAuth: AngularFireAuth) {}

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password).then(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }

  logoutUser() {
    return new Promise<any>((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth
          .signOut()
          .then(() => {
            console.log('Log out');
            (res) => resolve(res);
          })
          .catch((error) => {
            reject();
          });
      }
    });
  }

  recoverPasswordUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.sendPasswordResetEmail(value.email).then(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }

  userDetails() {
    return this.afAuth.user;
  }
}
