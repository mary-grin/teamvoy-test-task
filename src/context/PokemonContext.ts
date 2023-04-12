import {createContext} from "react";
import {IPokemonTransform} from "../interfaces/pokemon.interface";

interface Context {
    selectedPokemon: IPokemonTransform | null,
    onSelectPokemon: (pokemon: IPokemonTransform) => void
}

const PokemonContext = createContext<Context>({
    selectedPokemon: null,
    onSelectPokemon: () => {}
});

export default PokemonContext;