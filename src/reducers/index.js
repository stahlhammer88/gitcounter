export const Reducer = (state={}, action) => {    
    switch (action.type) {               
        case 'GET': 
            return {...state, lines: action.payload}
        default:
            return state;
    }
};