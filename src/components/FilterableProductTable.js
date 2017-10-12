import React, { Component } from 'react';

import { ProductRow } from './ProductRow';

export class FilterableProductTable extends Component {

    render() {
      return (
        <table className="filterable-products__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Category</th>
            </tr>
            {
              this.props.products.map((product) => 
                <ProductRow product={ product } />
              )
            }
          </tbody>
        </table>
      );
    }
  }
