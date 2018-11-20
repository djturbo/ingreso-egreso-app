import { Injectable, Pipe } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


import * as fb from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

import * as actions from '../shared/redux/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TAG = 'AuthService :: ';

  activateAction = new actions.UI.ActivateLoadingAction();
  desactivateAction = new actions.UI.DesactivateLoadingAction();

  private userSubscription: Subscription;
  private _user: User;

  constructor(
    private _afAuth: AngularFireAuth,
    private _router: Router,
    private _ngFDB: AngularFirestore,
    private _store: Store<AppState>) {

  }

  initAuthListener(): void {
    this._afAuth.authState.subscribe((fbUser: fb.UserInfo) => {
      if (fbUser) {
        this.userSubscription = this._ngFDB.doc(`${fbUser.uid}/user`).valueChanges()
        .subscribe( userObj => {
          const user: User = <User>userObj;
          console.log(this.TAG, 'initAuthListener() getting user: ', user);
          this._store.dispatch(new actions.SetUserAction(user));
          this._user = user;
        } );
      } else {
        this._user = null;
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
        }
      }
    });
  }

  createUser( username: string, email: string, password: string): Promise<any> {

    this._store.dispatch(this.activateAction);

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
            this._store.dispatch(this.desactivateAction);
        })
        .catch(error => {
          this._store.dispatch(this.desactivateAction);
          reject(error);
        });
    });
  }
  logIn(email: string, password: string): Promise<fb.auth.UserCredential> {
    this._store.dispatch(this.activateAction);
    return new Promise<fb.auth.UserCredential>( (resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(email, password)
            .then( (success) => {
              this._store.dispatch(this.desactivateAction);
              resolve(success);
            })
            .catch( (err) => {
              this._store.dispatch(this.desactivateAction);
              reject(err);
            });
    });
  }
  logOut(): Promise<void> {
    this._store.dispatch(new actions.UnsetUserAction());
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

  public get user(): User {
    return { ...this._user };
  }
}
