import { IngresoEgresoModel } from './../../../ingreso-egreso/ingreso-egreso.model';
import { Action } from '@ngrx/store';

export namespace MOVEMENT {
    export const SET_ITEMS = '[Movement] Set Item';
    export const UNSET_ITEMS = '[Movement] Unset Items';

    export class SetItemsAction implements Action {
        readonly type = SET_ITEMS;
        constructor( public items: IngresoEgresoModel[] ) {}
    }

    export class UnsetItemsAction implements Action {
        readonly type = UNSET_ITEMS;
        constructor() {}
    }

    export type actions = SetItemsAction | UnsetItemsAction;
}
