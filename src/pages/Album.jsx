import React from 'react';
import Header from './Header';

class Album extends React.Component {
  render() {
    console.log(this);
    return (
      <section>
        <Header />
      </section>
    );
  }
}

export default Album;
