import { Component, OnInit } from '@angular/core';
import { MovementService } from '../ingreso-egreso/movement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private _movementService: MovementService) { }

  ngOnInit() {
    this._movementService.initMovementListener();
  }

}
