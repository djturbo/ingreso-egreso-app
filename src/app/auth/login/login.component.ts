import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService,
              private _router: Router) { }

  doLogin(frmLogin: NgForm): void {
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
  }

}
