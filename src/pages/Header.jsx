import React from 'react';
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
    return (
      <header data-testid="header-component">
        { carregando ? <h2>{ name }</h2> : <Carregando /> }
      </header>
    );
  }
}

export default Header;
