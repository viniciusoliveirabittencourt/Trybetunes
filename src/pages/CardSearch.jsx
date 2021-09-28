import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardSearch extends React.Component {
  render() {
    const {
      artistName,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      collectionId,
    } = this.props;
    console.log(collectionId);
    return (
      <section>
        <img alt="Imagem do album da banda" src={ artworkUrl100 } />
        <h3>{ collectionName }</h3>
        <h4>{ artistName }</h4>
        <span>{ releaseDate.split('-', 2)[0] }</span>
        <p>{ collectionPrice }</p>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Saiba Mais
        </Link>
      </section>
    );
  }
}

CardSearch.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default CardSearch;
