import { Store } from '@ngrx/store';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovementService } from './movement.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  frm: FormGroup;
  type = 'ingreso';
  loadingSubscription: Subscription = new Subscription();
  isLoading: boolean;

  constructor(
    private _movementService: MovementService,
    private _store: Store<AppState>
  ) { }

  createIngresoEgreso(): void {
    const mov: IngresoEgresoModel = new IngresoEgresoModel({
      ...this.frm.value, type: this.type
    });
    this._movementService.createMovement(mov)
      .then(() => {
        this.frm.reset({
          amount: 0
        });
        Swal('Movimiento creado', mov.description, 'success');
      });
  }


  // ===========================================================
  // ==============     ANGULAR HOOKS      =====================
  // ===========================================================
  ngOnInit() {
    this.loadingSubscription = this._store.select('ui')
      .subscribe( ui => {
        this.isLoading = ui.isLoading;
      } );
    this.frm = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, [Validators.min(0)])
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
