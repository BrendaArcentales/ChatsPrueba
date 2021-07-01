import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';

export class TODO {
  $key: string;
  userMessage: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class ChatsService {

  constructor(
    private ngFirestore: AngularFirestore,
    private router: Router
  ) { }

  create(todo: TODO) {
    return this.ngFirestore.collection('mensajes').add(todo);
  }

  getTasks() {
    return this.ngFirestore.collection('mensajes').snapshotChanges();
  }
  getUserName(id:string){
    return this.ngFirestore.collection('usuarios').doc(id).valueChanges();
  }

}
