import { onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ImgSlider from "../components/ImgSlider";
import Movies from "../components/Movies";
import Viewers from "../components/Viewers";
import { setMovies } from "../features/movie/movieSlice";
import { colRef } from "../firebase";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let tempMovies = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      dispatch(setMovies(tempMovies));
    });
  }, []);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Movies />
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
