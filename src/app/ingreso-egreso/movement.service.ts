import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';
import * as actions from '../shared/redux/actions';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private readonly TAG = 'MovementService :: ';
  private movementListenerSubscription: Subscription;
  private movementItemsSubscription: Subscription;

  constructor(private afDB: AngularFirestore,
              private _authService: AuthService,
              private _store: Store<AppState> ) { }

  async createMovement(movement: IngresoEgresoModel) {
    const user = this._authService.user;
    const setLoadingAct = new actions.UI.ActivateLoadingAction();
    const unsetLoadingAct =new actions.UI.DesactivateLoadingAction();
    this._store.dispatch(setLoadingAct);
    try {
      const success = await this.afDB.doc(`${user.uid}/ingresos-gastos`)
        .collection('items').add({
          ...movement,
        });
      console.log('Movimiento guardado ', success);
    } finally {
      this._store.dispatch(unsetLoadingAct);
    }
  }

  public deleteMovement(uid: string): Promise<void> {
    const user = this._authService.user;
    return this.afDB.doc(`${user.uid}/ingresos-gastos/items/${uid}`)
      .delete();
  }

  public initMovementListener(): void {
    this.movementListenerSubscription = this._store.select('auth')
      .pipe(
        filter( auth => auth.user !== null && auth.user !== undefined )
       )
      .subscribe( auth => {
        console.log(this.TAG, 'initMovementListener() => USER: ', auth.user);
        this._setMovementItems(auth.user.uid);
      } );
  }

  private _setMovementItems(uid: string) {
    this.movementItemsSubscription = this.afDB.collection(`${uid}/ingresos-gastos/items`)
      /* .valueChanges()*/
      .snapshotChanges()
      .pipe(
        map( docData => {
          return docData.map( doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          } )
        } )
      )
      .subscribe( (data: IngresoEgresoModel[]) => {
        console.log(this.TAG, '_setMovementItems() => docData: ', data);
        const setItemAction = new actions.MOVEMENT.SetItemsAction(data);
        this._store.dispatch(setItemAction);
      } );
  }

  cancelSubscriptions(): void {
    if (this.movementItemsSubscription) {
     this.movementItemsSubscription.unsubscribe();
    }
    if (this.movementListenerSubscription) {
      this.movementListenerSubscription.unsubscribe();
    }
    this._store.dispatch(new actions.MOVEMENT.UnsetItemsAction());
  }

}
