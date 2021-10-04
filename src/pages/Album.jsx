import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      arrMusic: [],
      carregando: true,
    };
  }

  componentDidMount = () => {
    this.chamandoApi();
  }

  chamandoApi = () => {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((r) => this.setState({ arrMusic: [...r], carregando: false }));
  }

  componentBody = () => {
    const { arrMusic } = this.state;
    return (
      <section>
        <h1 data-testid="album-name">{ arrMusic[0].collectionName }</h1>
        <p data-testid="artist-name">{ arrMusic[0].artistName }</p>
        <img alt="Imagem do album selecionado" src={ arrMusic[0].artworkUrl100 } />
        { arrMusic.slice(1)
          .map((music, index) => (<MusicCard
            name={ music.trackName }
            previewUrl={ music.previewUrl }
            key={ index }
          />)) }
      </section>
    );
  }

  render() {
    const { arrMusic, carregando } = this.state;
    console.log(arrMusic);
    return (
      <div data-testid="page-album">
        <Header />
        { carregando ? <Carregando /> : this.componentBody() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
