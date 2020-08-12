import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            term: '',
            location:'',
            sortBy:'best_match',
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this) 

        this.sortByOptions = {
            'Best Match': 'best_match', 
            'Highest Rated': 'rating', 
            'Most Reviewed': 'review_count'
        } 

        this.autocomplete= null;
    }



    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        }
        return '';
    }

    handleSortByChange(sortByOption){
        this.setState({sortBy: sortByOption});
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    }

    handleTermChange(event) {
        this.setState({term: event.target.value})
    };

    handleLocationChange(event) {
        this.setState({ location: event.target.value })
    };

    handleKeyUp(event) {
        if (event.charCode === 13) {
            this.handleSearch(event);
        }
    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault()
    };

    renderSortByOptions() { 
        return Object.keys(this.sortByOptions).map(sortByOption=> { 
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (<li onClick={this.handleSortByChange.bind(this, sortByOptionValue)} 
            className={this.getSortByClass(sortByOptionValue)} 
            key={sortByOptionValue}> 
            {sortByOption} 
            </li>);
            });
        }

    render() {
        return (

            <div className="SearchBar" >
            <div className="SearchBar-sort-options">
                <ul>
                {this.renderSortByOptions()}
                </ul>
            </div>
            <div className="SearchBar-fields">
                <input onChange={this.handleTermChange} placeholder="I want to eat..." />
                <input onChange={this.handleLocationChange} onKeyPress={this.handleKeyUp} id='autocomplete' placeholder="I am located in..." />
            </div>
            <div className="SearchBar-submit">
                <a onClick={this.handleSearch}>Let's Go</a>
            </div>
            </div>
        )
    };
}

export default SearchBar;