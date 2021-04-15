import * as React from 'react';
import CardsList from '../cards-list/cards-list';
import Sort from '../sort/sort';

function Main() {

  return (
    <section className="main-screen">
      <div className="container">
        <h1>Cards list</h1>
        <Sort />
        <CardsList />
      </div>
    </section>
  );
};


export default Main;