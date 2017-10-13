import React, { Component } from 'react';

import { ProductRow } from './ProductRow/ProductRow';
import { SearchBar } from './SearchBar/SearchBar';
import { StyledTable, StyledTableHeading } from './styled/tables';

export class FilterableProductTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      searchTerm: '',
      inStockOnly: false
    };
  }

  componentDidMount() {
    fetch('/data/products.json', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data.products });
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  getRows() {
    const rows = [];
    const categories = new Set();

    this.state.products.filter(this.searchFilter.bind(this)).map(product => {
      
      if (Array.from(categories).indexOf(product.category) === -1) {
        rows.push(
          <tr key={ this.generateKeyId('category', product.category) }>
            <StyledTableHeading colSpan="2">{ product.category }</StyledTableHeading>
          </tr>
        );
      }

      rows.push(
        <ProductRow
          key={ this.generateKeyId('product', product.name) }
          name={ product.name }
          price={ product.price }
          stocked={ product.stocked } />
      );

      categories.add(product.category);
    }) 

    return rows;
  }

  setSearchTerm(value) {
    this.setState({ searchTerm: value.toLowerCase() });
  }

  setInStockOnly(value) {
    this.setState({ inStockOnly: value });
  }

  searchFilter(product) {
    return product.name.toLowerCase().indexOf(this.state.searchTerm) > -1;
  }

  generateKeyId(keyName, item) {
    return `${ keyName }-${ item.replace(' ', '-').toLowerCase() }`;
  }

  render() {

    const rows = this.getRows();

    return (
      <div className="filterable-products">
        <SearchBar
          searchTerm={ this.state.searchTerm }
          onSearchTermChange={ this.setSearchTerm.bind(this) }
          onInStockOnlyChange={ this.setInStockOnly.bind(this) } />
        <StyledTable className="filterable-products__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </StyledTable>
      </div>
    );
  }
}
