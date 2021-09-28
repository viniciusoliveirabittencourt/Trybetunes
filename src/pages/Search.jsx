import React from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      pesquisa: '',
      retornoApi: [],
      carregando: false,
      text: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onClick = () => {
    const { pesquisa } = this.state;
    const valuePesquisa = pesquisa;
    this.setState({
      carregando: true,
      pesquisa: '',
      text: true,
      valuePesquisa,
    });
    this.requisisaoApi();
  }

  disableButton = () => {
    const { pesquisa } = this.state;
    const numbMini = 2;
    return pesquisa.length < numbMini;
  }

  requisisaoApi = async () => {
    const { pesquisa } = this.state;
    const arrComAlbuns = await searchAlbumsAPI(pesquisa);
    this.setState({
      retornoApi: arrComAlbuns,
      carregando: false,
    });
  }

  render() {
    const { pesquisa, carregando, valuePesquisa, text } = this.state;
    const textoDaRespotaDaApi = (
      <h2>
        Resultado de álbuns de:
        {' '}
        { valuePesquisa }
      </h2>
    );
    const form = (
      <form>
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
          onClick={ this.onClick }
        >
          Pesquisar
        </button>
        { text ? textoDaRespotaDaApi : '' }
      </form>
    );
    return (
      <section>
        <Header />
        { carregando ? <Carregando /> : form }
      </section>
    );
  }
}

export default Search;
