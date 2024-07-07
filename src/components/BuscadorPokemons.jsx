import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buscarPokemon } from "../slices/pokemonSlice";

const BuscadorPokemons = () => {
  const [pokemon, setPokemon] = useState();
  const dispatch = useDispatch();
  const pokemonObtenido = useSelector((state) => state.pokemons.pokemon);

  const handleBuscar = (e) => {
    e.preventDefault();
    dispatch(buscarPokemon(pokemon));
  };

  return (
    <div>
      <form onSubmit={handleBuscar}>
        <label>Nombre del Pokemon</label>
        <input type="text" onChange={(e) => setPokemon(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>
      {pokemonObtenido && (
          <div>
            {" "}
            <h2>{pokemonObtenido.name}</h2>
          </div>
        )}
    </div>
  );
};

export default BuscadorPokemons;
