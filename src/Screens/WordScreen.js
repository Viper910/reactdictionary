import Loader from "../Components/Loader";
import { useState, useEffect } from "react";
import dataFetcher from "../DataFetchService/Datafetcher";
import "./WordScreen.css";
import { useParams } from "react-router-dom";
import Form from "../Components/Form/Form";
export default function WordScreen({ theme }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { word } = useParams();

  useEffect(() => {
    const getData = async () => {
      const wordData = await dataFetcher(word);
      setData(wordData);
      setLoading(false);
    };
    getData();
  }, [word]);

  const containerStyle = {
    color: `${theme === "light" ? "" : "lightblue"}`,
    backgroundColor: `${theme === "light" ? "#F9F7F7" : "black"}`,
  };

  const playAudio = (src) => {
    const audioObj = new Audio(src);
    audioObj.play();
  };

  return (
    <div className="container-fluid" style={containerStyle}>
      <Form />

      {loading ? (
        <Loader />
      ) : Array.isArray(data) ? (
        <div className="container wordScreen">
          <h4 className="wordscreen-h2">{data[0].word}</h4>
          {data[0].phonetics.map((word, id) =>
            word.audio && word.text ? (
              <div key={id}>
                <h6 className="wordscreen-h6">{word.text}</h6>
                <button
                  className="btn"
                  style={{
                    margin: "2px",
                    color: `${theme === "light" ? "black" : "white"}`,
                  }}
                  onClick={() => playAudio(word.audio)}
                >
                  <i className="fa fa-volume-up" aria-hidden="true"></i>
                </button>
              </div>
            ) : (
              <></>
            )
          )}
          {data[0].meanings.map((word, id) => (
            <div key={id}>
              <hr />
              <h6 className="wordscreen-h5">{word.partOfSpeech}</h6>
              <ul>
                {word.definitions.map((each, id) => (
                  <li className="definition-list" key={id}>
                    {each.definition}
                  </li>
                ))}
              </ul>
              {word.synonyms.length !== 0 ? (
                <h3>
                  <span style={{ color: "#0C7B93" }}>Synonyms:- </span>
                  {word.synonyms.map((synonym, id) => (
                    <span key={id}>{synonym}, </span>
                  ))}
                </h3>
              ) : (
                <></>
              )}
              {word.antonyms.length !== 0 ? (
                <h3>
                  <span style={{ color: "#0C7B93" }}>Antonyms:- </span>
                  {word.antonyms.map((antonym, id) => (
                    <span key={id}>{antonym}, </span>
                  ))}
                </h3>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">{data.title}</h4>
          <p>{data.message}</p>
          <hr />
          <p className="mb-0">{data.resolution}</p>
        </div>
      )}
    </div>
  );
}
