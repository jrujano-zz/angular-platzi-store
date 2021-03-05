import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  createUser(email: string, password: string): any {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string): any {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  logout(): any{
    return this.afAuth.signOut();
  }

  hasUSer(): any{
    return this.afAuth.authState;
  }

}
