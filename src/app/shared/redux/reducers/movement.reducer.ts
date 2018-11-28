import { Action } from '@ngrx/store';
import * as actions from '../actions/';
import { IngresoEgresoModel } from '../../../ingreso-egreso/ingreso-egreso.model';
import { AppState } from 'src/app/app.reducer';

export namespace MOVEMENT {
    export interface MovementState {
        items: IngresoEgresoModel[];
    }

    const initialState: MovementState = {
        items: []
    }

    export interface AppStateMovement extends AppState {
        movement: MovementState;
    }

    export function movementReducer(state = initialState, action: actions.MOVEMENT.actions) {

        switch (action.type) {
            case actions.MOVEMENT.SET_ITEMS:
                state = {
                    items: action.items.map(
                            item => {
                                return { ...item };
                            })
                };
            break;
            case actions.MOVEMENT.UNSET_ITEMS:
                state = {
                    items: []
                };
            break;
        }
        return state;
    }
}
