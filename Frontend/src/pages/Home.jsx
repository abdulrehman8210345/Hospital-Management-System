// import React from 'react'

import Biography from "../Components/Biography";
import Departments from "../Components/Departments";
import Hero from "../Components/Hero";
import MessageForm from "../Components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
