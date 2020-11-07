//import { PROMOTIONS } from '../shared/promotions';
import { ADD_PROMOS, PROMOS_FAILED, PROMOS_LOADING } from './ActionTypes';

export const Promotions = (state = {
                            isLoading : true,
                            errMess: null,
                            promotions: []
                        }, action) => {
    switch (action.type) {
        case PROMOS_LOADING:
            return {...state, isLoading : true, errMess: null, promotions: [] }
        case ADD_PROMOS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload }
        case PROMOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, promotions: [] }

        default:
            return state;
    }
}