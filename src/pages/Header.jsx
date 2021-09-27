import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      carregando: false,
    };
  }

  componentDidMount() {
    this.chamadaApi();
  }

  chamadaApi = async () => {
    const satans = await getUser();
    this.setState({
      name: satans.name,
      carregando: true,
    });
  }

  render() {
    const { carregando, name } = this.state;
    const corpo = (
      <main>
        <h2>{ name }</h2>
        <Link to="/search">Página De Pesquisa</Link>
        <Link to="/favorites">Musicas Favoritas</Link>
        <Link to="/profile">Perfil</Link>
      </main>
    );
    return (
      <header data-testid="header-component">
        { carregando ? corpo : <Carregando /> }
      </header>
    );
  }
}

export default Header;
