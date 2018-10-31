import * as reducers from './shared/redux/reducers';
import { ActionReducerMap } from '@ngrx/store';
import { ApplicationInitStatus } from '@angular/core';

export interface AppState {
    ui: reducers.State;
    auth: reducers.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: reducers.uiReducer,
    auth: reducers.authReducer
};
