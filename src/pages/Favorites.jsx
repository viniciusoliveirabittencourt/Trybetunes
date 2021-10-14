import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Carregando from './Carregando';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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

  carregandoFunc = () => {
    this.setState({ carregando: true });
    getFavoriteSongs()
      .then((arrMusic) => this.setState({ arrMusic, carregando: false }));
  }

  chamandoApi = () => {
    getFavoriteSongs()
      .then((arrMusic) => this.setState({ arrMusic, carregando: false }));
  }

  componentBody = () => {
    const { arrMusic } = this.state;
    return (
      <section>
        { arrMusic
          .map((music, index) => (<MusicCard
            name={ music.trackName }
            previewUrl={ music.previewUrl }
            key={ index }
            trackId={ music.trackId }
            objMusic={ music }
            checked={ arrMusic }
            func={ this.carregandoFunc }
          />)) }
      </section>
    );
  }

  render() {
    const { carregando } = this.state;
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
