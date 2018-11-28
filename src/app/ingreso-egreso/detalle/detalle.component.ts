import { MovementService } from './../movement.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MOVEMENT } from '../../shared/redux/reducers/movement.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  readonly TAG = 'DetalleComponent :: ';
  items: IngresoEgresoModel[];
  subscription: Subscription;

  constructor( private _store: Store<MOVEMENT.AppStateMovement>,
               private _movementService: MovementService ) { }

  deleteItem(item: IngresoEgresoModel) {
    console.log(this.TAG, 'deleteItem() => uid: ', item.uid);
    this._movementService.deleteMovement(item.uid)
      .then(
        () => {
          Swal(`Item ${item.description} Eliminado`, 'Se eliminó el movimiento correctamente.', 'success');
        }
      )
      .catch(
        err => {
          console.error(this.TAG, 'deleteItem() Error: ', err);
          Swal('Error', 'Ocurrió un error al intentar eliminar el movimiento seleccionado.', 'error');
        }
      );
  }

  ngOnInit() {
    this.subscription = this._store.select('movement')
      .subscribe( movements => {
        console.log(this.TAG, 'ngOnInit() => Items: ', movements.items);
        this.items = movements.items;
      } );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
