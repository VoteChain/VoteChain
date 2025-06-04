import React from "react";
import {
  FaInfoCircle,
  FaShieldAlt,
  FaUsers,
  FaVoteYea,
  FaLock,
  FaChartLine,
  FaHandshake,
} from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";
// import teamMembers from "../data/team"; // Your team data
import "./about.css";
import Aside from "../../components/Aside/Aside";

const teamMembers = [
  {
    id: "1",
    name: "Ada Lovelace",
    role: "Lead Blockchain Developer",
    bio: "Ada is passionate about building secure, transparent, and decentralized applications. She leads our blockchain integration team.",
    avatar: "", // fallback to initials
    socialLinks: {
      twitter: "https://twitter.com/ada_lovelace",
      github: "https://github.com/ada-lovelace",
      linkedin: "https://linkedin.com/in/adalovelace",
    },
  },
  {
    id: "2",
    name: "Satoshi Nakamoto",
    role: "Smart Contract Engineer",
    bio: "Satoshi focuses on building efficient and secure smart contracts that power the core logic of our dApp ecosystem.",
    avatar: "",
    socialLinks: {
      github: "https://github.com/satoshi",
      linkedin: "https://linkedin.com/in/satoshi",
    },
  },
  {
    id: "3",
    name: "Grace Hopper",
    role: "Frontend Developer",
    bio: "Grace is a React wizard who crafts beautiful and responsive user interfaces for our platform.",
    avatar: "",
    socialLinks: {
      twitter: "https://twitter.com/gracehopper",
      github: "https://github.com/gracehopper",
      linkedin: "https://linkedin.com/in/gracehopper",
    },
  },
  {
    id: "4",
    name: "Tim Berners-Lee",
    role: "Full Stack Developer",
    bio: "Tim works across the stack to ensure seamless integration between our frontend, backend, and smart contracts.",
    avatar: "",
    socialLinks: {
      github: "https://github.com/timbl",
      linkedin: "https://linkedin.com/in/timbernerslee",
    },
  },
];

const AboutPage = () => {
  return (
    <div className="about-page">
      <Aside />
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>
            <FaInfoCircle /> About VoteChain
          </h1>
          <p className="subtitle">
            Empowering communities through transparent, decentralized voting
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              VoteChain was created to revolutionize community decision-making
              by leveraging blockchain technology. We believe in transparent,
              tamper-proof voting systems that give power back to the people.
            </p>
            <p>
              Our platform enables organizations, DAOs, and communities to
              conduct secure elections, polls, and governance votes with
              complete auditability.
            </p>
          </div>
          <div className="mission-image">
            <div className="image-placeholder"></div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="features-section">
        <h2>Why Choose VoteChain?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Secure Voting</h3>
            <p>
              Blockchain technology ensures votes are immutable and verifiable,
              preventing tampering and fraud.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3>Community Focused</h3>
            <p>
              Designed for DAOs, cooperatives, and organizations that value
              member participation in decisions.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaLock />
            </div>
            <h3>Privacy Protected</h3>
            <p>
              Zero-knowledge proofs allow verification without exposing
              individual voting choices.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaChartLine />
            </div>
            <h3>Real-time Analytics</h3>
            <p>
              Live results and detailed breakdowns help communities understand
              voting patterns.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaVoteYea />
            </div>
            <h3>Flexible Voting</h3>
            <p>
              Support for multiple voting methods: ranked choice, quadratic, and
              token-weighted.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaHandshake />
            </div>
            <h3>Governance Ready</h3>
            <p>
              Built-in proposal systems and discussion threads to facilitate
              informed decision making.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="tech-section">
        <h2>Our Technology</h2>
        <div className="tech-cards">
          <div className="tech-card">
            <h3>Blockchain Backbone</h3>
            <p>
              Built on Ethereum with smart contracts that execute voting rules
              exactly as programmed, with no downtime or interference.
            </p>
          </div>
          <div className="tech-card">
            <h3>Zero-Knowledge Proofs</h3>
            <p>
              Advanced cryptography allows voters to prove eligibility without
              revealing their identity or choices.
            </p>
          </div>
          <div className="tech-card">
            <h3>IPFS Storage</h3>
            <p>
              Vote metadata and documents are stored decentralized on IPFS,
              ensuring availability and resistance to censorship.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-avatar">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
              <div className="social-links">
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Twitter</span>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <IoRocketOutline className="cta-icon" />
          <h2>Ready to Transform Your Community Voting?</h2>
          <p>
            Join hundreds of organizations already using VoteChain for
            transparent, secure decision-making.
          </p>
          <div className="cta-buttons">
            <button className="primary-button">Get Started</button>
            <button className="secondary-button">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
