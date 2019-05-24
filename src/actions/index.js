import { getRepo } from "../service";

export function getCountedLines(url) {
    return dispatch => {        
        dispatch({type: 'LOADING', loading: true});
        return getRepo(url).then(res => {
            dispatch({type: 'GET', payload: res, loading: false})
        })
        .catch(error => dispatch({type: 'FAILED', payload:{ error: true, errorMessage: `${error}`}}))
    }
}

export function changeSorting(sortType, sortKey, sortedLines) {
    return dispatch => {                
        dispatch({type:'SORTING', payload: {lines: sortedLines, sortType, sortKey,}});
    }    
}

export function filterLines(filterValue, filteredLines) {
    return dispatch => {                
        dispatch({type:'FILTER', payload: {filteredLines, filterValue}});
    }    
}