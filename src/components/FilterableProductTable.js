import React, { Component } from 'react';

import { ProductRow } from './ProductRow/ProductRow';

export class FilterableProductTable extends Component {

  generateKeyId(keyName, item) {
    // return `${ keyName }-${ item.replace(' ', '-').toLowerCase() }`;
    return keyName + '-' + item.replace(' ', '-').toLowerCase();
  }

  render() {

    const rows = [];
    let category;

    this.props.products.forEach((product) => {

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
    );
  }
}
