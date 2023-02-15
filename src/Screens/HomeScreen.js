import "./HomeScreen.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Components/Form/Form";
export default function HomeScreen({ theme }) {
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  const containerStyle = {
    color: `${theme === "light" ? "" : "lightblue"}`,
    backgroundColor: `${theme === "light" ? "#F9F7F7" : "black"}`,
  };

  useEffect(() => {
    let localrecents = JSON.parse(localStorage.getItem("Recents"));
    if (localrecents === null) {
      setRecent([]);
    } else {
      localrecents = localrecents.filter((word, index) => {
        return localrecents.indexOf(word) === index;
      });
      setRecent(localrecents);
    }
  }, []);
  const clearRecent = () => {
    setRecent([]);
    localStorage.setItem("Recents", JSON.stringify([]));
    navigate("/reactdictionary");
  };

  const search = (recentword) => {
    navigate(`/reactdictionary/${recentword}`);
  };

  return (
    <div className="container-fluid" style={containerStyle}>
      <div className="container homescreen">
        <Form />
        <p className="h2  homescreen-h2">RecentSearches</p>
        {recent.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No Recent Searches
          </div>
        ) : (
          <>
            <div className="row">
              {recent.map((ele, id) => (
                <button
                  key={id}
                  type="button"
                  className={`col-md-auto btn btn-outline-${
                    theme === "light" ? "dark" : "light"
                  }`}
                  style={{ margin: "10px" }}
                  onClick={() => search(ele)}
                >
                  {ele}
                </button>
              ))}
            </div>
            <button
              className="btn btn-dark"
              type="button"
              style={{ display: "block", margin: "auto" }}
              onClick={clearRecent}
            >
              Delete Searches
            </button>
          </>
        )}
      </div>
    </div>
  );
}
