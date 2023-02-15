import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import WordScreen from "./Screens/WordScreen";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const logoStyle = {
    fontFamily: "Oleo Script Swash Caps",
    fontSize: "2.2rem",
  };

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localtheme = JSON.parse(localStorage.getItem("Theme"));
    if (localtheme) {
      setTheme(localtheme);
    }
  }, []);

  const themeHandler = () => {
    document.getElementsByTagName('body')[0].style.backgroundColor = theme === "light" ? "black" : "#F9F7F7";
    document.getElementsByTagName('body')[0].style.color = theme === "light" ? "white" : "black";
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      {localStorage.setItem("Theme", JSON.stringify(theme))}
      <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
        <div className="container-fluid" style={{ justifyContent: "unset" }}>
          <i
            className="bx bxl-react bx-lg bx-spin bx-rotate-90"
            style={{ color: "#1f7fd0" }}
          ></i>
          <Link className="navbar-brand" style={logoStyle} to="/reactdictionary">
            Dictionary
          </Link>
          <div className="themeStyle">
            <i
              className={`bx bx-${
                theme === "light" ? "moon" : "sun"
              } bx-sm bx-flashing bx-rotate-270`}
              style={{ color: `${theme === "light" ? "" : "white"}` }}
              onClick={themeHandler}
            ></i>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/reactdictionary" element={<HomeScreen theme={theme} />} />
        <Route path="/reactdictionary/:word" element={<WordScreen theme={theme} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
