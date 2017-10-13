import React, { Component } from 'react';
import { StyledCheckbox, StyledLabel, StyledTextField,  } from '../styled/forms';

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
        <StyledTextField
          type="text"
          placeholder="Search&hellip;"
          value={ this.props.searchTerm }
          onChange={ this.onSearchChange.bind(this) } />
        <StyledLabel>
          <StyledCheckbox
            name="inStockOnly"
            checked={ this.props.inStockOnly }
            onChange={ this.onStockOnlyChange.bind(this) } />
          &nbsp;Only show products in stock
        </StyledLabel>
      </form>
    );
  }
}
