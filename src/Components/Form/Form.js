import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Form.css'
export default function Form() {
  const [recent, setRecent] = useState([]);
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const recents = JSON.parse(localStorage.getItem("Recents"));
    if (recents === null) {
      setRecent([]);
    } else {
      setRecent(recents);
    }
  }, []);

  const onChangeHandler = (e) => {
    setWord(e.target.value);
  };

  const onClickHandler = () => {
    if (word === "") {
      alert("Please,Type a word");
    } else {
      recent.unshift(word.trim().toLowerCase());
      localStorage.setItem("Recents", JSON.stringify(recent));
      navigate(`/reactdictionary/${word}`);
    }
  };

  const keyHandler = (event) => {
    if (event.key === "Enter") {
      onClickHandler();
    }
  };
  return (
    <div className="homescreen-container">
      <input
        className="search"
        type="text"
        placeholder="Type Words"
        onChange={onChangeHandler}
        onKeyPress={(e) => keyHandler(e)}
      />
      <button
        className="btn btn-dark homescreen-button"
        onClick={onClickHandler}
      >
        Search
      </button>
    </div>
  );
}
