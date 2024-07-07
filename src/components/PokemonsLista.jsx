import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../slices/pokemonSlice";

const PokemonsLista = () => {

    const dispatch = useDispatch()

    const pokemons = useSelector((state) => state.pokemons.pokemons)
    const status = useSelector((state) => state.pokemons.status)
    const error = useSelector((state) => state.pokemons.error)

    useEffect(()=>{
        dispatch(getPokemons())
    }, [])

    let content;
    
    if (status === "Cargando"){
        content = <p>Cargando...</p>
    }else if (status === "Exitoso"){
        content = (
            <ul>
                {pokemons.map((pokemon)=>(
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>
        )
    }else if (status === "Rechazado"){
        content = <p>{error}</p>
    }


    return (
        <div>
            {content}
        </div>
    );
};

export default PokemonsLista;