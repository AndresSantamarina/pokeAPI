import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  buscarPokemon,
  filtrarPokemon,
  getPokemons,
  resetPokemons,
} from "../slices/pokemonSlice";
import { Button, Modal } from "react-bootstrap";

const PokemonLista = () => {
  const [tipo, setTipo] = useState("all");
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons.pokemons) || [];
  const status = useSelector((state) => state.pokemons.status);
  const pokemonInfo = useSelector((state) => state.pokemons.pokemon);
  const error = useSelector((state) => state.pokemons.error);

  useEffect(() => {
    if (tipo === "all") {
      dispatch(getPokemons({ offset, limit }));
    } else {
      dispatch(filtrarPokemon(tipo));
    }
  }, [offset, tipo]);

  const handleFiltrar = (e) => {
    const tipoElegido = e.target.value;
    if (tipoElegido === "all") {
      dispatch(resetPokemons());
      setTipo(tipoElegido);
      setOffset(0);
      dispatch(getPokemons({ offset: 0, limit }));
    } else {
      dispatch(resetPokemons());
      setTipo(tipoElegido);
      setOffset(0);
      dispatch(filtrarPokemon(tipoElegido));
    }
  };

  const handleClose = () => {
    setPokemonSeleccionado(null);
    dispatch(buscarPokemon(""));
  };

  const handleShow = (pokemon) => {
    dispatch(buscarPokemon(pokemon.name));
    setPokemonSeleccionado(pokemon);
  };

  const handleCargarMas = () => {
    setOffset(offset + limit);
  };

  let content;

  if (status === "Cargando") {
    content = <p>Cargando...</p>;
  } else if (status === "Exitoso") {
    content = (
      <>
        <ul className="list-unstyled d-flex flex-wrap justify-content-between">
          {pokemons.map((pokemon) => (
            <li key={pokemon.id} className="m-2">
              <Button
                variant="outline-dark"
                onClick={() => handleShow(pokemon)}
                className="text-uppercase"
              >
                {pokemon.name}
              </Button>
            </li>
          ))}
        </ul>
        {tipo === "all" && pokemons.length < 1000 && (
          <div className="text-center">
            <Button variant="outline-primary" onClick={handleCargarMas}>
              Ver más
            </Button>
          </div>
        )}
      </>
    );
  } else if (status === "Rechazado") {
    content = <p>{error}</p>;
  }

  return (
    <>
      <label htmlFor="">Filtrar por tipo de Pokémon</label>
      <Form.Select
        aria-label="Default select example"
        className="w-50"
        onChange={handleFiltrar}
      >
        <option value="all">Todos</option>
        <option value="fire">Fuego</option>
        <option value="electric">Eléctrico</option>
        <option value="poison">Venenoso</option>
      </Form.Select>
      {content}
      {pokemonSeleccionado && pokemonInfo && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="display-2 text-uppercase">{pokemonInfo.name}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {pokemonInfo.sprites && pokemonInfo.sprites.front_default && (
              <img
                src={pokemonInfo.sprites.front_default}
                alt={pokemonInfo.name}
              />
            )}
            <p>Habilidades:</p>
            {pokemonInfo.abilities && (
              <ul className="list-unstyled">
                {pokemonInfo.abilities.map((ability, index) => (
                  <li key={index} className="text-uppercase">
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            )}
            <p>Formas:</p>
            {pokemonInfo.forms && (
              <ul className="list-unstyled">
                {pokemonInfo.forms.map((form, index) => (
                  <li key={index} className="text-uppercase">
                    {form.name}
                  </li>
                ))}
              </ul>
            )}
            <p>Altura: {pokemonInfo.height}</p>
            <p>Peso: {pokemonInfo.weight}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default PokemonLista;
