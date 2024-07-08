import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buscarPokemon } from "../slices/pokemonSlice";
import { Button } from "react-bootstrap";

const BuscadorPokemons = () => {
  const [pokemon, setPokemon] = useState("");
  const dispatch = useDispatch();
  const pokemonObtenido = useSelector((state) => state.pokemons.pokemon);

  const handleBuscar = (e) => {
    e.preventDefault();

    dispatch(buscarPokemon(pokemon.toLowerCase()));
  };

  // const handleBuscar = (e) => {
  //   setPokemon(e.target.value);
  //   dispatch(buscarPokemon(e.target.value.toLocaleLowerCase()));
  // };

  return (
    <div>
      <form onSubmit={handleBuscar} className="m-3">
      {/* <form className="m-3"> */}
        <label className="me-2">Nombre del Pokemon</label>
        <input
          type="text"
          onChange={(e) => setPokemon(e.target.value)}
          // onChange={handleBuscar}
          value={pokemon}
          className="me-2"
        />
        <Button type="submit" variant="outline-success">
          Buscar
        </Button>
      </form>
      {pokemonObtenido && pokemonObtenido.name && (
        <div className="text-center">
          {" "}
          <h2 className="display-3 text-uppercase">{pokemonObtenido.name}</h2>
          {pokemonObtenido.sprites && pokemonObtenido.sprites.front_default && (
            <img
              src={pokemonObtenido.sprites.front_default}
              alt={pokemonObtenido.name}
            />
          )}
          {/* <p>{pokemonObtenido.abilities[0]}</p>
            <p>{pokemonObtenido.forms[0]}</p> */}
          <p>Altura: {pokemonObtenido.height}</p>
          {/* <p>{pokemonObtenido.moves[0]}</p>
            <p>{pokemonObtenido.species[0]}</p> */}
          <p>Peso: {pokemonObtenido.weight}</p>
        </div>
      )}
    </div>
  );
};

export default BuscadorPokemons;
