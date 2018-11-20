import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from '../../auth/user.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User;
  authSubscription: Subscription;
  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this.authSubscription = this._store.select('auth')
      .pipe(
          filter( auth => auth.user !== null )
       )
      .subscribe( auth => {
        this.user = auth.user;
      } );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
