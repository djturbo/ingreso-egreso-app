import { Injectable, Pipe } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


import * as fb from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TAG = 'AuthService :: ';
  constructor(
    private _afAuth: AngularFireAuth,
    private _router: Router,
    private _ngFDB: AngularFirestore) {

  }

  initAuthListener(): void {
    this._afAuth.authState.subscribe((fbUser: fb.UserInfo) => {
      console.log(this.TAG, 'initAuthListener() user: ', fbUser);
    });
  }

  createUser( username: string, email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        this._afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((success: any) => {
          console.log('Usuario registrado user: ', success);
          const user: User = {
            uid: success.user.uid,
            name: username,
            email: success.user.email
          };
          this._ngFDB.doc(`${ user.uid }/user`)
            .set( user )
            .then(() => resolve(success))
            .catch((error) => reject(error));

        })
        .catch(error => reject(error));
    });
  }
  logIn(email: string, password: string): Promise<any> {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logOut(): Promise<void> {
    return this._afAuth.auth.signOut();
  }

  isAuth(): Observable<any> {
    return this._afAuth.authState
    .pipe(
      map(
        fbUser => {
          if ( fbUser === null) {
            this._router.navigate(['/login']);
          }
          return (fbUser !== null);
        }
    ));
  }
}
