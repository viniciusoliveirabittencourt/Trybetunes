import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      carregando: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onClick = async () => {
    const { name } = this.state;
    this.setState({
      carregando: true,
    });
    await createUser({ name });
    this.setState({
      redirect: true,
    });
  }

  disbleButton() {
    const { name } = this.state;
    const number = 3;
    return name.length < number;
  }

  corpoDoLogin(carregando, form, redirect) {
    if (carregando === true) {
      if (redirect === true) {
        return <Redirect to="/search" />;
      }
      return <Carregando />;
    }
    return form;
  }

  render() {
    const { name, carregando, redirect } = this.state;
    const form = (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="login-name-input"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ this.disbleButton() }
          onClick={ this.onClick }
        >
          Entrar
        </button>
      </form>);
    return (
      this.corpoDoLogin(carregando, form, redirect)
    );
  }
}

export default Login;
