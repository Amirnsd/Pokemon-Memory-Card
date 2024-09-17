import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import '../styles/Congratulation.css'

export default function Congratulation({ startAgain }) {
  return (
    <div className="container">
      <div className="header-tags">
        <h2>Congratulations</h2>
        <h2>You won!</h2>
      </div>

      <button className="start-again" onClick={startAgain}>
        <FontAwesomeIcon icon={faRotateBack} /> Start Again</button>
    </div>
  );
}
