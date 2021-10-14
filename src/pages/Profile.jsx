import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: true,
      objPessoa: {
        image: '',
        email: '',
        description: '',
        name: '',
      },
    };
  }

  componentDidMount = () => {
    getUser()
      .then((objPessoa) => this.setState({ objPessoa, carregando: false }));
  }

  render() {
    const { objPessoa, carregando } = this.state;
    const body = (
      <div>
        <img
          data-testid="profile-image"
          src={ objPessoa.image }
          alt="imagem da pessoa usuaria"
        />
        <h1>{ objPessoa.name }</h1>
        <h2>{ objPessoa.email }</h2>
        <p>{ objPessoa.description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
    return (
      <section>
        <Header />
        { carregando ? <Carregando /> : body }
      </section>
    );
  }
}

export default Profile;
