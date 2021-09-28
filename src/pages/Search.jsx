import React from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import CardSearch from './CardSearch';

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
      valuePesquisa: value,
      [name]: value,
    });
  }

  onClick = () => {
    const { pesquisa } = this.state;
    const valorPesquisa = pesquisa;
    this.setState({
      valorPesquisa,
      carregando: true,
      pesquisa: '',
    }, () => {
      this.requisisaoApi();
    });
  }

  disableButton = () => {
    const { pesquisa } = this.state;
    const numbMini = 2;
    return pesquisa.length < numbMini;
  }

  requisisaoApi = () => {
    const { valorPesquisa } = this.state;
    searchAlbumsAPI(valorPesquisa)
      .then((r) => this.setState({ retornoApi: [...r], text: true, carregando: false }));
  }

  renderizacaoCardSearch() {
    const { retornoApi } = this.state;
    return retornoApi.map((element, index) => (<CardSearch
      key={ index }
      artistName={ element.artistName }
      collectionName={ element.collectionName }
      collectionPrice={ element.collectionPrice }
      artworkUrl100={ element.artworkUrl100 }
      releaseDate={ element.releaseDate }
      collectionId={ element.collectionId }
    />));
  }

  render() {
    const { pesquisa, carregando, valuePesquisa, text, retornoApi } = this.state;
    const textoDaRespotaDaApi = (
      <section>
        <h2>
          { retornoApi.length ? `Resultado de álbuns de: ${valuePesquisa}`
            : 'Nenhum álbum foi encontrado' }
        </h2>
        { this.renderizacaoCardSearch() }
      </section>
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
        { carregando ? <Carregando /> : '' }
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
