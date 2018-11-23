import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoModel } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  totalIngresos: number;
  totalGastos: number;

  ingresosCount: number;
  gastosCount: number;

  subscription: Subscription;

  /** CHART */
  // Doughnut
  public doughnutChartLabels: string[] = ['Ingresos', 'Gastos'];
  public doughnutChartData: number[];
  public doughnutChartType = 'doughnut';

  constructor( private _store: Store<AppState>  ) { }


  /** CHART EVENT LISTENERS */
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.subscription = this._store.select('movement')
      .subscribe( movement => {
        this.countMovements(movement.items);
      } );
  }

  countMovements(movements: IngresoEgresoModel[]): void {
    this.gastosCount = 0;
    this.ingresosCount = 0;
    this.totalGastos = 0;
    this.totalIngresos = 0;
    //
    movements.map(item => {
      if (item.type === 'ingreso') {
        this.totalIngresos += item.amount;
        this.ingresosCount += 1;
      } else if (item.type === 'egreso') {
        this.totalGastos += item.amount;
        this.gastosCount += 1;
      }
    });
    this.doughnutChartData = [this.totalIngresos, this.totalGastos];
  }
}
