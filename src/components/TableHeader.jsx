import React from 'react';
import Input from './ui/Input';
import { connect } from 'react-redux';
import { headerItems } from './../data/headerItems';
import SortButton from './ui/SortButton';
import {orderBy} from 'lodash';
import { changeSorting, filterLines } from '../actions';

const TableHeader = props => {
    const {lines, sortType, sortKey, filterValue, filteredLines} = props;

    const sortHandler = (index) => {            
        if (lines){                                 
            const newLines = [...lines];
            const sortedLines = orderBy(newLines, [index], [sortType]);
            const newSortType = sortType === 'asc' ? 'desc' : 'asc';
            props.dispatch(changeSorting(newSortType, index, sortedLines))  

            if (filteredLines) filter(sortedLines, filterValue);
        }        
    }

    const filterHandler = (e) => {
        const value = e.target.value.toLowerCase();        
        if (lines) filter(lines, value);
    }

    const filter = (lines, value) => {        
        const newLines = [...lines];        
        const filteredLines = newLines.filter(t => !!~t.fileName.toLowerCase().indexOf(value));        
        props.dispatch(filterLines(value, filteredLines)); 
    }

    const renderHeaderButtons = () => {
        return headerItems.map(item => {
            return (
                <SortButton
                    key={item._id}
                    {...item}
                    handleClick={sortHandler}
                    sortKey={sortKey}
                    sortType={sortType}/>
            )
        })
    }

    const clearFilter = () => {
        props.dispatch(filterLines('')); 
    }

    return (
        <div className="counter__row counter__row--header">
            {renderHeaderButtons()}
            <div className="counter__filter-container">
                <Input 
                    handleUserInput={filterHandler} 
                    value={filterValue}
                    placeholder="Filter by name"
                    isClearVisible={!!filterValue}
                    clearHandler={clearFilter}
                    id="input-filter"/>
            </div>
        </div>
    );
};

const mapStateToProps = state => {            
    return {        
        sortKey: state.sortKey,
        sortType: state.sortType,
        filterValue: state.filterValue,
        lines: state.lines,
        filteredLines: state.filteredLines
    }
}

export default connect(mapStateToProps)(TableHeader);