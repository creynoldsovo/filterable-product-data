import React, { Component } from 'react';
import { FilterableProductTable } from './components/FilterableProductTable';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
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

  render() {
    return (
      <div className="App">
        <FilterableProductTable products={this.state.products} />
      </div>
    );
  }
}

export default App;
