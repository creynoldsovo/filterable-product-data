import React, { Component } from 'react';

export class FilterableProductTable extends Component {
  
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="filterable-products__table">
          {
            this.props.products.map((product) => 
              <div key={ product.name.toLowerCase() }>
                { product.name }
              </div>
            )
          }
        </div>
      );
    }
  }
