import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    pokemons: [],
    status: 'idle',
    error: null,
    pokemon: {}
}

export const getPokemons = createAsyncThunk("pokemons/getPokemons", async ()=>{
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")
    return res.data.results
})

export const buscarPokemon = createAsyncThunk("pokemons/buscarPokemon", async (name)=>{
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return res.data
})

const pokemonSlice = createSlice({
    name: "pokemons",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getPokemons.pending, (state)=>{
            state.status = "Cargando"
        })
        .addCase(getPokemons.fulfilled, (state, action)=>{
            state.status = "Exitoso"
            state.pokemons = action.payload
        })
        .addCase(getPokemons.rejected, (state, action)=>{
            state.status = "Rechazado"
            state.error = action.error.message
        })
        .addCase(buscarPokemon.pending, (state)=>{
            state.status = "Cargando"
        })
        .addCase(buscarPokemon.fulfilled, (state, action)=>{
            state.status = "Exitoso"
            state.pokemon = action.payload
        })
        .addCase(buscarPokemon.rejected, (state, action)=>{
            state.status = "Rechazado"
            state.error = action.error.message
        })
    
    }
})

export default pokemonSlice.reducer