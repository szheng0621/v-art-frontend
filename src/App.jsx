import { useState } from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import "./App.css";
import Button from "./components/Button";
import Header from "./components/Header";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import SingleArtwork from "./components/SingleArtwork";
import Collections from "./components/Collections";
import ArtworksByCollection from "./components/ArtworksByCollection";
import Login from "./components/Login";
import UserExhibitions from "./components/UserExhibitions";
import ArtworksList from "./components/ArtworksList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artworks" element={<ArtworksList />} />
          <Route path="/artworks/:artwork_id" element={<SingleArtwork />} />
          <Route path="/collections" element={<Collections />} />
          <Route
            path="/collections/:collection"
            element={<ArtworksByCollection />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users/:username/exhibitions"
            element={<UserExhibitions />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
