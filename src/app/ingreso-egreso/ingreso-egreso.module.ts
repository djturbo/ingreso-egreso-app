import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SortMovementsPipe } from './sort-movements.pipe';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    SortMovementsPipe,
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent
  ]
})
export class IngresoEgresoModule { }
