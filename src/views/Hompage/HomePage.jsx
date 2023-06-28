import { Link } from "react-router-dom";
import { SiteBanner } from "../../components/SiteBanner";
import classes from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { getAllSongs } from "../../requests";

export const HomePage = () => {
  const [randomSong, setRandomSong] = useState(1);

  useEffect(() => {
    getAllSongs().then((res) =>
      res.json().then((arrayOfSongs) => setRandomSong(arrayOfSongs.length))
    );
  }, []);
  return (
    <div className={classes.allErasImg}>
      <SiteBanner />
      <Link to="/songquiz/1">
        <button className="px-8 py-2 text-orange-100 whitespace-nowrap font-mono rounded-full bg-violet-300 hover:bg-violet-400 active:bg-violet-500 focus:outline-none focus:ring focus:ring-violet-100 ">
          take me to a random song quiz
        </button>
      </Link>
    </div>
  );
};
