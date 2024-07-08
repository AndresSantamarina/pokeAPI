import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    pokemons: [],
    status: 'idle',
    error: null,
    pokemon: {}
}

export const getPokemons = createAsyncThunk("pokemons/getPokemons", async (params) => {
    const { offset = 0, limit = 20 } = params;

    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    return res.data.results
})

export const buscarPokemon = createAsyncThunk("pokemons/buscarPokemon", async (name) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    console.log(res)
    return res.data
})

export const filtrarPokemon = createAsyncThunk("pokemons/filtrarPokemon", async (type) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
    return res.data.pokemon.map(p => p.pokemon);
})

const pokemonSlice = createSlice({
    name: "pokemons",
    initialState,
    reducers: {
        resetPokemons: (state) => {
            state.pokemons = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPokemons.pending, (state) => {
                state.status = "Cargando"
            })
            .addCase(getPokemons.fulfilled, (state, action) => {
                state.status = "Exitoso"
                state.pokemons = [...state.pokemons, ...action.payload]
            })
            .addCase(getPokemons.rejected, (state, action) => {
                state.status = "Rechazado"
                state.error = action.error.message
            })
            .addCase(buscarPokemon.pending, (state) => {
                state.status = "Cargando"
            })
            .addCase(buscarPokemon.fulfilled, (state, action) => {
                state.status = "Exitoso"
                state.pokemon = action.payload
            })
            .addCase(buscarPokemon.rejected, (state, action) => {
                state.status = "Rechazado"
                state.error = action.error.message
            })
            .addCase(filtrarPokemon.pending, (state) => {
                state.status = "Cargando"
            })
            .addCase(filtrarPokemon.fulfilled, (state, action) => {
                state.status = "Exitoso"
                state.pokemons = action.payload
            })
            .addCase(filtrarPokemon.rejected, (state, action) => {
                state.status = "Rechazado"
                state.error = action.error.message
            })

    }
})

export const { resetPokemons } = pokemonSlice.actions;


export default pokemonSlice.reducer
