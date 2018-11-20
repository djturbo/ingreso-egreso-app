import { User } from 'src/app/auth/user.model';
import * as actions from '../actions';

export interface AuthState {
    user: User;
}

const initialState: AuthState = {
    user: null
};

export function authReducer( state = initialState, action: actions.actions ): AuthState {

    switch (action.type) {
        case actions.SET_USER:
            state = {
                user: {
                    ...action.user
                }
            };
        break;
        case actions.UNSET_USER:
            state = {
                user: undefined
            };
        break;
    }

    return state;
}
