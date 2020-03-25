import {AnyAction} from 'redux';
import {HYDRATE} from 'next-redux-wrapper';

export interface State {
    page: string;
}

const reducer = (state: State = {page: 'init'}, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload};
        case 'PAGE':
            return {...state, page: action.payload};
        default:
            return state;
    }
};

export default reducer;
