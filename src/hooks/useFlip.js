import React, {useState} from "react";
import PokemonCard from "../PokemonCard"
import PlayingCard from "../PlayingCard"


const useFlip = (initialState) => {
    const [state, setState] = useState(initialState)
    const flip = () => {
        setState(state => !state)
    }
    return [state, flip]
}

export default useFlip