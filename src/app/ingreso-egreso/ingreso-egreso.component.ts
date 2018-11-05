import { IngresoEgresoModel } from './ingreso-egreso.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {
  frm: FormGroup;
  type = 'ingreso';


  constructor() { }

  createIngresoEgreso(): void {
    const ingEg: IngresoEgresoModel = new IngresoEgresoModel({
      ...this.frm.value, type: this.type
    });
    console.log(ingEg);
  }


  // ===========================================================
  // ==============     ANGULAR HOOKS      =====================
  // ===========================================================
  ngOnInit() {
    this.frm = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, [Validators.min(0)])
    });
  }

}
