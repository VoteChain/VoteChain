// React
import React from "react";

// CSS
import "./hero.css";

// Components
import Button from "../../components/Button/Button";
import Aside from "../../components/Aside/Aside";

function Hero() {
  // Pages that will be displayed in the aside
  const pages = [
    {
      name: "Voting Page",
      link: `/Voting Page`,
    },
    {
      name: "Result",
      link: `/Result`,
    },
    {
      name: "Admin Home",
      link: `/Admin Home`,
    },
    {
      name: "Manage Candidates",
      link: `/Manage Candidates`,
    },
    {
      name: "Mange Parties",
      link: `/Mange Parties`,
    },
  ];

  return (
    <>
      <div class="hero">
        <div class="hero-background">
          <div class="overlay"></div>
          <div class="bg-video"></div>
        </div>

        <div class="hero-content">
          <div className="aside-div">
            <div className="cont">
              <Aside objs={pages} active="/" />
            </div>
          </div>
          <div class="headings">
            <img
              src="https://ipfs.near.social/ipfs/bafkreib3x3txsa57lsllu5v5esvajlpkhslgzkzqp4gxnsyqbuhgwgrixy"
              alt="logo"
            />
            <h1 class="headline">VoteChain</h1>
          </div>

          <div class="">
            <h2>Vote with confidence. Vote with power. Vote decentralized.</h2>
            <div class="hero-buttons">
              <Button
                title={"Create a Vote"}
                handleClick={() => console.log("Create a Vote")}
                theme={"primary"}
              />
              <Button
                title={"Learn More"}
                handleClick={() => console.log("Learn More")}
                theme={"primary"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
