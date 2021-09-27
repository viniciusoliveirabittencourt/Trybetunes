import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      pesquisa: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  disableButton = () => {
    const { pesquisa } = this.state;
    const numbMini = 2;
    return pesquisa.length < numbMini;
  }

  render() {
    const { pesquisa } = this.state;
    return (
      <section>
        <Header />
        <label htmlFor="pesquisa">
          <input
            data-testid="search-artist-input"
            name="pesquisa"
            value={ pesquisa }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ this.disableButton() }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </section>
    );
  }
}

export default Search;
