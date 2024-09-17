import { useEffect, useState } from "react";
import '../styles/FetchData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import Loading from "./Loading";
import Congratulation from "./Congratulation";

export default function FetchData({ score, setScore, highScore, setHighScore }) {
  
  const [pokemon, setPokemon] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [limit, setLimit] = useState(12);
  const [gameWon, setGameWon] = useState(false);
  
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      if (score > highScore) {
        setHighScore(score);
      }
      setScore(0);
      setClickedCards([]);
      setShowGameOver(true);
    } else {
      setScore(score + 1);
      const newClickedCards = [...clickedCards, id];
      setClickedCards(newClickedCards);
      if (newClickedCards.length === limit) {
        setGameWon(true);
      }
    }

    const shuffledCards = shuffle([...pokemon]);
    setPokemon(shuffledCards);
  };

  const Restart = () => {
    setShowGameOver(false);
    setGameWon(false);
    setHighScore(0);
    setScore(0);
    setClickedCards([]);
    setGameStarted(false);
  }

  const fetchingData = async (limit) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=0`);
      const data = await response.json();

      const fetchingPokemon = await Promise.all(
        data.results.map(async (pok) => {
          const PokRes = await fetch(pok.url);
          const PokData = await PokRes.json();
          return {
            id: PokData.id,
            name: PokData.name,
            image: PokData.sprites.front_default
          };
        })
      );

      setPokemon(fetchingPokemon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData(limit);
  }, [limit]);

  const startGame = (difficulty) => {
    let cardLimit;
    switch (difficulty) {
      case "Easy":
        cardLimit = 4; 
        break;
      case "Medium":
        cardLimit = 8; 
        break;
      case "Hard":
        cardLimit = 12; 
        break;
      default:
        cardLimit = 18; 
    }

    setLimit(cardLimit);
    setGameStarted(true);
    setGameWon(false);
    fetchingData(cardLimit);
  }

  return (
    <>  
      {!gameStarted && (
        <Loading startGame={startGame} />
      )}

      {gameWon && (
        <Congratulation startAgain={Restart} />
      )}

      {!gameWon && !showGameOver && gameStarted && (
        <div className="pokemon-cards" style={{ display: "grid" }}>
          {pokemon.map((pok) => (
            <button className="pictures" key={pok.id} onClick={() => handleCardClick(pok.id)}>
              <img src={pok.image} alt={pok.name} />
              <p>{pok.name}</p>
            </button>
          ))}
        </div>
      )}

      <div className="Game-over" style={{ display: showGameOver ? "block" : "none" }}>
        <h2>Game Over</h2>
        <h3>Your best score is: {highScore}</h3>
        <button onClick={Restart}><FontAwesomeIcon icon={faRotateRight} style={{ marginRight:"10px" }} />Restart</button>
      </div>
    </>
  );
}
