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
      <div className="hero">
        <div className="hero-background">
          <div className="overlay"></div>
          <div className="bg-video"></div>
        </div>

        <div className="hero-content">
          <div className="aside-div">
            <div className="cont">
              <Aside objs={pages} active="/" />
            </div>
          </div>
          <div className="headings">
            <img
              src="https://ipfs.near.social/ipfs/bafkreib3x3txsa57lsllu5v5esvajlpkhslgzkzqp4gxnsyqbuhgwgrixy"
              alt="logo"
            />
            <h1 className="headline">VoteChain</h1>
          </div>

          <div className="">
            <h2>Vote with confidence. Vote with power. Vote decentralized.</h2>
            <div className="hero-buttons">
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
