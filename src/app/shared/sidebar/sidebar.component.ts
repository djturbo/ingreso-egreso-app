import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  signOut(): void {
    this._authService.logOut()
      .then(
        success => {
          this._router.navigate(['/login']);
        }
      )
      .catch(
        error => {
          swal({title: 'Error', text: 'Error cerrando sesión: ' + error.message, type: 'error'});
        }
      );
  }

  ngOnInit() {
  }

}
