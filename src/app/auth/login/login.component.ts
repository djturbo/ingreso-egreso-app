import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean;
  subscription: Subscription;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _store: Store<AppState>) { }

  doLogin(frmLogin: NgForm): void {
    this.loading = true;
    this._authService.logIn(frmLogin.value.email, frmLogin.value.password)
    .then( success => {
      console.log('Log In correct: ', success);
      this._router.navigate(['/']);
    } )
    .catch( error => {
      console.error('Error when try to log In Error: ', error);
      swal({title: 'Error', text: 'Error when try to log In Error: ' + error.message, type: 'error'});
    } );
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
