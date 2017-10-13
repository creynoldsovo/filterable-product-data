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

    this.state.products.forEach(product => categories.add(product.category));

    Array.from(categories).map(category => {

      rows.push(
        <tr key={ this.generateKeyId('category', category) }>
          <StyledTableHeading colSpan="2">{ category }</StyledTableHeading>
        </tr>
      );

      this.state.products
        .filter(product => {
          const name = product.name.toLowerCase();
          return product.category === category && name.indexOf(this.state.searchTerm) > -1
        })
        .forEach(product => {
          rows.push(
            <ProductRow
              key={ this.generateKeyId('product', product.name) }
              name={ product.name }
              price={ product.price }
              stocked={ product.stocked } />
          );
        });
    });

    return rows;
  }

  setSearchTerm(value) {
    this.setState({ searchTerm: value.toLowerCase() });
  }

  setInStockOnly(value) {
    this.setState({ inStockOnly: value });
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
