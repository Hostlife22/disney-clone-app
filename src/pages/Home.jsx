import { onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ImgSlider from "../components/ImgSlider";
import Movies from "../components/Movies";
import Viewers from "../components/Viewers";
import { selectMovies, setMovies } from "../features/movie/movieSlice";
import { colRef } from "../firebase";

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let tempMovies = snapshot.docs
        .map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
        .reduce((acc, movie) => {
          if (acc[movie.type]) {
            return {
              ...acc,
              [movie.type]: [...acc[movie.type], movie],
            };
          }
          return {
            ...acc,
            [movie.type]: [movie],
          };
        }, {});

      dispatch(setMovies(tempMovies));
    });
  }, []);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      {movies && (
        <>
          <Movies title="Recommended for You" movies={movies["popular"]} />
          <Movies title="New to Disney +" movies={movies["newTo"]} />
          <Movies title="Original" movies={movies["original"]} />
          <Movies title="Trending" movies={movies["trending"]} />
          <Movies title="Kids TV" movies={movies["kidsTv"]} />
          <Movies title="Hollywood" movies={movies["hollywood"]} />
        </>
      )}
    </Container>
  );
};

export default Home;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
