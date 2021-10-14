import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
    };
  }

  addSongs = () => {
    const { objMusic, func } = this.props;
    this.setState({ carregando: true });
    addSong(objMusic)
      .then(() => {
        func();
        this.setState({ carregando: false });
      });
  }

  render() {
    const { previewUrl, name, trackId, checked } = this.props;
    const { carregando } = this.state;
    if (carregando) return <Carregando />;
    return (
      <section>
        <p>{ name }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ name }>
          Favorito
          <input
            type="checkbox"
            id={ name }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.addSongs }
            checked={ checked.some((musica) => musica.trackId === trackId) }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  objMusic: PropTypes.shape().isRequired,
  func: PropTypes.func.isRequired,
  checked: PropTypes.arrayOf().isRequired,
};

export default MusicCard;
