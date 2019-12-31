import * as actionTypes from './actions';

const initialState = {
    apiKey: "kfWE8GLD0lMke3cKdvIuCSs9skSMd1wAuw6PsGK7",
    data: [],
    keys: [],
    results: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_DATA:
            return {
                ...state,
                data: initialState.data.concat(action.data),
                keys: Object.keys(action.data[0])
            };
        default:
            return state;
    }
}

export default reducer;