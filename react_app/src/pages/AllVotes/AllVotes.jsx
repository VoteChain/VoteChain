// React
import React, { useState } from "react";

// Style
import "./all-votes.css";

// Components
import VoteCard from "../../components/VoteCard/VoteCard";
import Aside from "../../components/Aside/Aside";

// Others
import { IoIosSearch } from "react-icons/io";
import { HiOutlineFilter } from "react-icons/hi";

function AllVotes() {
  // Get All Votes
  const [allVotes, setAllVotes] = useState([
    {
      name: "Best Campus Food Spot",
      desc: "Students choose their favorite place to grab lunch on campus.",
      role: "Public poll",
      creator: "john_doe.near",
      openTime: "2025-06-01T23:59:59Z",
      closeTime: "2025-06-01T23:59:59Z",
      createdOn: "2025-05-19T10:05:00Z",
      limit: "1 vote per student",
      opened: true,
      passcode: "",
      status: "active",
      candidates: ["Café Verde", "Grill House", "Noodle Hub", "Veggie Delight"],
      parties: [],
      voters: [
        "alice.near",
        "ben.near",
        "chioma.near",
        "daniel.near",
        "eva.near",
        "fatima.near",
        "gary.near",
        "haruna.near",
        "ifeoma.near",
        "james.near",
        "kemi.near",
        "leo.near",
        "musa.near",
        "nina.near",
        "obi.near",
        "peter.near",
        "queen.near",
        "ruth.near",
        "sam.near",
        "tosin.near",
      ],
    },
    {
      name: "Department Chair Election",
      desc: "Faculty members elect the next chair of the Computer Science Department.",
      role: "Faculty only",
      creator: "cs-dept.near",
      openTime: "2025-06-01T23:59:59Z",
      closeTime: "2025-05-30T17:00:00Z",
      createdOn: "2025-05-18T08:30:00Z",
      limit: "1 vote per faculty member",
      opened: true,
      passcode: "CS-2025-CHAIR",
      status: "active",
      candidates: ["Dr. A. Martins", "Prof. S. Okafor", "Dr. L. Zhang"],
      parties: [],
      voters: [
        "dr_ade.near",
        "prof_chi.near",
        "dr_femi.near",
        "prof_lee.near",
        "dr_kate.near",
        "prof_mike.near",
        "dr_obi.near",
        "prof_rani.near",
      ],
    },
    {
      name: "Product Feature Priority",
      desc: "Customers rank which feature we should build next.",
      role: "Customer advisory board",
      creator: "acme_product_team.near",
      openTime: "2025-06-01T23:59:59Z",
      closeTime: "2025-06-10T12:00:00Z",
      createdOn: "2025-05-15T14:20:00Z",
      limit: "Top-3 ranked choices",
      opened: true,
      passcode: "",
      status: "upcoming",
      candidates: [
        "Dark Mode",
        "Offline Support",
        "Multi-language",
        "Live Collaboration",
      ],
      parties: [],
      voters: [], // opens soon, no voters yet
    },
    {
      name: "Homecoming Theme",
      desc: "Students vote on the official 2025 homecoming celebration theme.",
      role: "Student body",
      creator: "student_union.near",
      openTime: "2025-06-01T23:59:59Z",
      closeTime: "2025-05-25T23:59:59Z",
      createdOn: "2025-05-12T09:15:00Z",
      limit: "1 vote per student",
      opened: true,
      passcode: "",
      status: "ended",
      candidates: [
        "Retro Futurism",
        "Carnival Night",
        "Garden Glow",
        "Neon Dreams",
      ],
      parties: [],
      voters: [
        "ada.near",
        "bayo.near",
        "chi.near",
        "david.near",
        "ebuka.near",
        "funmi.near",
        "goke.near",
        "halima.near",
        "iman.near",
        "jide.near",
        "kate.near",
        "lara.near",
        "mike.near",
        "ngozi.near",
        "ola.near",
        "peace.near",
        "queenie.near",
        "roland.near",
        "sade.near",
        "tobi.near",
        "ugo.near",
        "victor.near",
        "wumi.near",
        "xavier.near",
        "yemi.near",
        "zainab.near",
      ],
    },
    {
      name: "Board Resolution 2025-04",
      desc: "Board members approve or reject the Q2 budget adjustment.",
      role: "Board vote",
      creator: "board_secretary.near",
      openTime: "2025-06-01T23:59:59Z",
      closeTime: "2025-05-22T18:00:00Z",
      createdOn: "2025-05-19T11:00:00Z",
      limit: "Yes / No",
      opened: true,
      passcode: "BOARD-ONLY",
      status: "ended",
      candidates: ["Approve", "Reject", "Abstain"],
      parties: [],
      voters: [
        "chair.near",
        "vicechair.near",
        "treasurer.near",
        "director1.near",
        "director2.near",
        "director3.near",
      ],
    },
    {
      name: "Neighborhood Logo Contest",
      desc: "Residents pick the winning logo for the community re-branding.",
      role: "Residents",
      creator: "bright-meadows-council.near",
      openTime: "2025-06-01T23:59:59Z",
      closeTime: "2025-06-05T20:00:00Z",
      createdOn: "2025-05-17T16:45:00Z",
      limit: "1 vote per household",
      opened: true,
      passcode: "",
      status: "active",
      candidates: ["Logo A", "Logo B", "Logo C", "Logo D"],
      parties: [],
      voters: [
        "amaka.near",
        "bashir.near",
        "chika.near",
        "doris.near",
        "emeka.near",
        "favour.near",
        "greg.near",
        "hannah.near",
        "ike.near",
        "julia.near",
        "kelvin.near",
        "linda.near",
      ],
    },
  ]);

  // Pages in Navbar
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

  // Using state
  const [state, setState] = useState({ showFilterModal: false });

  // Functions
  // Toggle filter modal
  const toggleFilterModal = () =>
    setState({ ...state, showFilterModal: !state.showFilterModal });

  return (
    <>
      <div className="all-votes">
        <div className="aside-div">
          <Aside objs={pages} active="/" />
        </div>

        <div className="quick-actions">
          <div className="search-bar">
            <IoIosSearch className="icon" />
            <input placeholder="Search" type="search" className="input" />
          </div>
          <div className="filter-div">
            <button className="filter-btn" onClick={toggleFilterModal}>
              <HiOutlineFilter />
              Filter
              <span className="filter-badge">3</span>
            </button>

            <div
              className={`filter-modal ${state.showFilterModal && "show"}`}
              onClick={toggleFilterModal}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h3>Manage Filters</h3>
                  {/* <span className="close" onClick={toggleFilterModal}>
                    &times;
                  </span> */}
                </div>

                <div className="active-filters">
                  <div className="filter-item">
                    <div>Key:value</div>
                    <span className="close" onClick={() => {}}>
                      &times;
                    </span>
                  </div>
                  <div className="filter-item">
                    <div>Key:value</div>
                    <span className="close" onClick={() => {}}>
                      &times;
                    </span>
                  </div>
                  <div className="filter-item">
                    <div>Key:value</div>
                    <span className="close" onClick={() => {}}>
                      &times;
                    </span>
                  </div>
                </div>

                <div className="add-filter">
                  <select id="filterType">
                    <option value="category">Created By</option>
                    <option value="price">Security</option>
                    <option value="status">Status</option>
                  </select>
                  {1 ? (
                    <input
                      type="text"
                      id="filterValue"
                      placeholder="Enter value"
                    />
                  ) : (
                    <select id="filterType">
                      <option value="category">Created By</option>
                      <option value="price">Security</option>
                      <option value="status">Status</option>
                    </select>
                  )}
                  <button className="white-button" onClick={() => {}}>
                    Add Filter
                  </button>
                </div>

                <div className="modal-footer">
                  <button className="white-button" onClick={() => {}}>
                    Clear All
                  </button>
                  <button className="white-button" onClick={toggleFilterModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="votes-list">
          {allVotes.map((vote, i) => (
            <VoteCard key={i} {...vote} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AllVotes;
