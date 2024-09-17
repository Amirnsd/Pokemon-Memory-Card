import PokemonLogo from '../assets/International-Pokemon-logo.png';
import '../styles/Loading.css'

export default function Loading({startGame}){
    return (
        <>
         <div className="start-game" >
              <div className="headers">
              <img src={PokemonLogo} alt="Pokemon Logo" className="pokemon-image" />
                <h2>Select a difficulty level </h2>
              </div>

              <div className="buttons">
                <button onClick={()=>startGame("Easy")}>Easy</button>
                <button onClick={()=>startGame("Medium")}>Medium</button>
                <button onClick={()=>startGame("Hard")}>Hard</button>
              </div>
        </div>
        </>
    )
}