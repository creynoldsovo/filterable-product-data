import React, { Component } from 'react';

export class SearchBar extends Component {

  onSearchChange(e) {
    this.props.onSearchTermChange(e.target.value);
  }

  onStockOnlyChange(e) {
    this.props.onInStockOnlyChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Search&hellip;" value={ this.props.searchTerm } onChange={ this.onSearchChange.bind(this) } />
        <label>
          <input type="checkbox" name="inStockOnly" checked={ this.props.inStockOnly } onChange={ this.onStockOnlyChange.bind(this) } />
          &nbsp;Only show products in stock
        </label>
      </form>
    );
  }
}
