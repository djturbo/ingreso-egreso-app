import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoModel } from './ingreso-egreso.model';

@Pipe({
  name: 'sortMovements'
})
export class SortMovementsPipe implements PipeTransform {

  transform(items: IngresoEgresoModel[], args?: any): IngresoEgresoModel[] {
    return items.sort((a, b) => {
      if (a.type === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
