import React from 'react';
import PokemonsLista from '../components/PokemonsLista';

const Inicio = () => {
    return (
        <>
          <h1 className='m-3 display-5'>Lista de Pokémons:</h1>
          <PokemonsLista/>
        </>
      
    );
};

export default Inicio;