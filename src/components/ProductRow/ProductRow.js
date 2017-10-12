import React, { Component } from 'react';
import classNames from 'classnames';

export class ProductRow extends Component {

  render() {

    const productNameClass = classNames({
      'filterable-products_product-name': true,
      'filterable-products_product-name--no-stock': !this.props.stocked
    });

    return (
      <tr>
        <td className={ productNameClass }>{ this.props.name }</td>
        <td>{ this.props.price }</td>
      </tr>
    );
  }
}
