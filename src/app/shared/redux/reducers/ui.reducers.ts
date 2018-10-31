import * as actions from '../actions';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
};

export function uiReducer(state = initState, action: actions.UI.canDo): State {

    switch (action.type) {
        case actions.ACTIVATE_LOADING:
            state = {
                ...state,
                isLoading: true
            };
        break;
        case actions.DESACTIVATE_LOADING:
            state = {
                ...state,
                isLoading: false
            };
        break;
    }

    return state;
}

