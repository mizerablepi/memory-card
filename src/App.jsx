import { useEffect, useState } from "react";
import Card from "./card";
import Modal from "./modal";

export default function App() {
  const baseURL = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemons, setPokemons] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    getData(controller);
    return () => {
      controller.abort();
    };
  }, []);

  const getData = async (controller) => {
    const signal = controller.signal;
    let list = [];

    for (let i = 1; i < 11; i++) {
      let res = await fetch(baseURL + i, { signal });
      let data = await res.json();
      list.push({
        name: data.forms[0].name,
        img: data.sprites.other.dream_world.front_default,
        clicked: false,
      });
    }
    setPokemons([...list]);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function reset() {
    let newState = [...pokemons];
    newState.map((pokemon) => {
      pokemon.clicked = false;
      return pokemon;
    });
    if (score > bestScore) {
      setBestScore(score);
    }
    setPokemons(newState);
    setGameOver(false);
  }

  const score = pokemons.filter((poke) => !!poke.clicked).length;

  shuffleArray(pokemons);

  return (
    <>
      {gameOver && <Modal clickHandler={reset} />}
      <div className="text-center pt-4">
        <h1 className="font-bold text-4xl">Memory Game</h1>
        <p>Select all the cards once to win, selecting a card twice resets.</p>
        <p className="text-xl underline font-bold">
          <span className="mr-4">Score: {score}</span>{" "}
          <span>Best: {bestScore}</span>
        </p>
      </div>
      <div className="flex gap-10 flex-wrap justify-center m-4">
        {pokemons.map((pokemon, index) => (
          <Card
            key={pokemon.name}
            name={pokemon.name}
            image={pokemon.img}
            index={index}
            onClickHandler={setPokemons}
            state={pokemons}
            reset={setGameOver}
          />
        ))}
      </div>
    </>
  );
}
