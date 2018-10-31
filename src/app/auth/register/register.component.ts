import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  loading: boolean;
  subscription: Subscription;

  constructor(public authService: AuthService,
              private _router: Router,
              private _store: Store<AppState>) { }


  saveFormData(frm: NgForm): void {
    console.log(frm.value);
    this.authService.createUser(frm.value.username, frm.value.email, frm.value.password)
    .then( resp => {
      console.log('Usuario creado correctamente resp: ', resp);
      this._router.navigate(['dashboard']);
    }).catch( error => {
      console.error('Error al crear el nuevo usuario Error: ', error);
      swal({title: 'Error', text: 'Error al crear el nuevo usuario Error ' + error.message, type: 'error'});
    });
  }

  ngOnInit() {
    this.subscription = this._store.select('ui')
      .subscribe(ui => {
        this.loading = ui.isLoading;
      });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
