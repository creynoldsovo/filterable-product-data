import React, { Component } from 'react';

import { ProductRow } from './ProductRow/ProductRow';
import { SearchBar } from './SearchBar/SearchBar';

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

  setSearchTerm(value) {
    this.setState({ searchTerm: value });
  }

  setInStockOnly(value) {
    this.setState({ inStockOnly: value });
  }

  generateKeyId(keyName, item) {
    // return `${ keyName }-${ item.replace(' ', '-').toLowerCase() }`;
    return keyName + '-' + item.replace(' ', '-').toLowerCase();
  }

  render() {

    const rows = [];
    let category;

    this.state.products.forEach(product => {

      if (this.state.inStockOnly && !product.stocked) {
        return;
      }

      if (product.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) === -1) {
        return;
      }

      if (product.category !== category) {

        rows.push(
          <tr key={ this.generateKeyId('category', product.category) }>
            <th colSpan="2">{ product.category }</th>
          </tr>
        )
      }

      rows.push(
        <ProductRow
          key={ this.generateKeyId('product', product.name) }
          name={ product.name }
          price={ product.price }
          stocked={ product.stocked } />
      );

      category = product.category;
    });

    return (
      <div className="filterable-products">
        <SearchBar
          searchTerm={ this.state.searchTerm }
          onSearchTermChange={ this.setSearchTerm.bind(this) }
          onInStockOnlyChange={ this.setInStockOnly.bind(this) } />
        <table className="filterable-products__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    );
  }
}
