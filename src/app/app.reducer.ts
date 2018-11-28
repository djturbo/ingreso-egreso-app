import * as reducers from './shared/redux/reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: reducers.State;
    auth: reducers.AuthState;
    // movement: reducers.MOVEMENT.MovementState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: reducers.uiReducer,
    auth: reducers.authReducer,
    // movement: reducers.MOVEMENT.movementReducer
};
