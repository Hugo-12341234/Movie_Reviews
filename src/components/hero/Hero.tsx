import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { CSSProperties } from "react";
import "./Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

interface HeroProps {
  movies: any;
}

interface CustomStyle extends CSSProperties {
  "--img"?: string;
}

export const Hero = ({ movies }: HeroProps) => {
  const navigate = useNavigate();

  function reviews(movieId: any) {
    navigate(`/Reviews/${movieId}`);
  }

  return (
    <div className="w-screen bg-black">
      <Carousel>
        {movies?.map((movie: any, id: any) => {
          const customStyle: CustomStyle = {
            "--img": `url(${movie.backdrops[0]})`,
          };

          return (
            <Paper key={id}>
              <div className="h-[550px] bg-black">
                <div className="movie-card" style={customStyle}>
                  <div className="absolute md:top-[200px] md:flex-row md:justify-evenly md:gap-0 w-full flex flex-col items-center top-[20px] gap-2">
                    <div className="h-[300px] movie-poster overflow-hidden">
                      <img
                        src={movie.poster}
                        alt="Movie Poster"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex items-center text-white">
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="flex justify-between items-center w-[300px]">
                      <Link
                        to={`/Trailer/${movie.trailerLink.substring(
                          movie.trailerLink.length - 11
                        )}`}
                      >
                        <div className="p-0 m-0 w-[150px]">
                          <FontAwesomeIcon
                            icon={faCirclePlay}
                            className="p-0 m-0 text-yellow-500 cursor-pointer text-[3rem] transition duration-300 hover:text-[4rem] hover:text-white"
                          />
                        </div>
                      </Link>
                      <div>
                        <Button
                          variant="info"
                          onClick={() => reviews(movie.imdbId)}
                        >
                          Reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          ); // Paper element encapsulates every element in the carousel
        })}
      </Carousel>
    </div>
  );
};
