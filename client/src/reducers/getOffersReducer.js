import ACTION from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    error: null,
    offers: [],
    //haveMore: true,
};

export default function getOffersReducer (state=initialState, action){
    switch (action.type) {
        case ACTION.GET_OFFERS_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
            }
        }
        case ACTION.GET_OFFERS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                offers: [...action.data.offers],
                haveMore: action.data.haveMore
            }
        }
        case ACTION.GET_OFFERS_NEW_STATUS: {
            return {
              ...state,
              error: null,
              offers: [...action.data],
            };
        }
        case ACTION.GET_OFFERS_ERROR: {
            return {
                ...state,
                error: null,
                offers: [],
            }
        }
        default:
            return state;
    }
};