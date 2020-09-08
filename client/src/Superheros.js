import React, { useState, useContext } from 'react';
import Superhero from './Superhero';
import './Superheros.scss';
import StateContext from './StateContext';

export default function Superheros({ loading }) {
  const state = useContext(StateContext);

  if (!state) {
    return null;
  }

  if (state.loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <h1>Superheros</h1>
      <ul className="superheros">
        {state && state.superheros.map((superhero) => (
          <Superhero key={superhero.id} {...superhero} />
        ))}
      </ul>
    </>
  );
}
