const initialState = {
    sortType:'asc',
    sortKey: 'fileName'
}

export const Reducer = (state={...initialState}, action) => {    
    const {type, payload} = action;
    switch (type) {               
        case 'LOADING':            
            return {...state, loading: true};
        case 'GET': 
            return {...state, lines: payload, loading: false, error: false, errorMessage: ''};        
        case 'FAILED': 
            return {...state, error: payload.error, errorMessage: payload.errorMessage, loading: false};
        case 'SORTING':         
            return {...state, lines: payload.lines, sortKey: payload.sortKey, sortType: payload.sortType};
        case 'FILTER': 
            const {filteredLines, filterValue} = payload;
            return {...state, filteredLines: filterValue ? filteredLines : null, filterValue};
        default:
            return state;
    }
};