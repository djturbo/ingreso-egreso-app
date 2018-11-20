import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from '../../auth/user.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MovementService } from '../../ingreso-egreso/movement.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: User;
  authSubscription: Subscription;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _store: Store<AppState>,
              private _movementService: MovementService) { }

  signOut(): void {
    this._authService.logOut()
      .then(
        success => {
          this._router.navigate(['/login']);
          this._movementService.cancelSubscriptions();
        }
      )
      .catch(
        error => {
          swal({title: 'Error', text: 'Error cerrando sesión: ' + error.message, type: 'error'});
        }
      );
  }

  ngOnInit() {
    this.authSubscription = this._store.select('auth')
    .pipe(
        filter(auth => auth.user !== undefined || auth.user !== null)
     )
    .subscribe(
        auth => {
          this.user = auth.user;
        }
     );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
