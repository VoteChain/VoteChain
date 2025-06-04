// React
import React, { useEffect, useState } from "react";

// Style
import "./all-votes.css";

// Components
import VoteCard from "../../containers/VoteCard/VoteCard";
import Aside from "../../components/Aside/Aside";

// Others
import { IoIosSearch } from "react-icons/io";
import { HiOutlineFilter } from "react-icons/hi";
import { Router, useNavigate, useSearchParams } from "react-router-dom";
import {
  FaBookmark,
  FaCog,
  FaEye,
  FaGlobe,
  FaHistory,
  FaSort,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import Button from "../../components/Button/Button";

// Pages in Navbar
const pages = [
  {
    name: "Explore",
    link: `/Voting Page?tab=explore`,
  },
  {
    name: "My Polls",
    link: `/Voting Page?tab=my`,
  },
  {
    name: "History",
    link: `/Voting Page?tab=history`,
  },
];

function AllVotes() {
  // Get search Params
  const [searchParams] = useSearchParams();

  // Using state
  const [state, setState] = useState({
    showFilterModal: false,
    tab: searchParams.get("tab"),
  });

  // Change tab whenever searchParams change
  useEffect(() => {
    const currentTab = searchParams.get("tab") || "explore";
    setState({ ...state, tab: currentTab });
  }, [searchParams]);

  // Using Navigation
  const navigate = useNavigate();

  // Get All Votes
  const [allVotes, setAllVotes] = useState([
    {
      id: 0,
      name: "Best Campus Food Spot",
      desc: "Students choose their favorite place to grab lunch on campus.",
      role: "Public poll",
      creator: "john_doe.near",
      openOn: "2025-06-01T12:00:00Z",
      closeOn: "2025-06-02T12:00:00Z",
      createdOn: "2025-05-29T10:00:00Z",
      limit: "1 vote per student",
      opened: true,
      passcode: "",
      status: "active",
      candidates: ["Café Verde", "Grill House", "Noodle Hub", "Veggie Delight"],
      parties: [],
      voters: ["alice.near", "ben.near", "chioma.near"],
    },
    {
      id: 1,
      name: "Department Chair Election",
      desc: "Faculty members elect the next chair of the Computer Science Department.",
      role: "Faculty only",
      creator: "abnakore.near",
      openOn: "2025-06-03T08:00:00Z",
      closeOn: "2025-06-03T15:00:00Z",
      createdOn: "2025-05-30T08:30:00Z",
      limit: "1 vote per faculty member",
      opened: false,
      passcode: "CS-2025-CHAIR",
      status: "upcoming",
      candidates: ["Dr. A. Martins", "Prof. S. Okafor", "Dr. L. Zhang"],
      parties: [],
      voters: [],
    },
    {
      id: 2,
      name: "Product Feature Priority",
      desc: "Customers rank which feature we should build next.",
      role: "Customer advisory board",
      creator: "abnakore.near",
      openOn: "2025-05-25T09:00:00Z",
      closeOn: "2025-06-10T12:00:00Z",
      createdOn: "2025-05-15T14:20:00Z",
      limit: "Top-3 ranked choices",
      opened: true,
      passcode: "",
      status: "active",
      candidates: [
        "Dark Mode",
        "Offline Support",
        "Multi-language",
        "Live Collaboration",
      ],
      parties: [],
      voters: ["maria.near", "john.near"],
    },
    {
      id: 3,
      name: "Homecoming Theme",
      desc: "Students vote on the official 2025 homecoming celebration theme.",
      role: "Student body",
      creator: "student_union.near",
      openOn: "2025-05-20T10:00:00Z",
      closeOn: "2025-05-30T23:59:00Z",
      createdOn: "2025-05-10T09:15:00Z",
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
      voters: ["ada.near", "bayo.near", "chi.near"],
    },
    {
      id: 4,
      name: "Board Resolution 2025-04",
      desc: "Board members approve or reject the Q2 budget adjustment.",
      role: "Board vote",
      creator: "board_secretary.near",
      openOn: "2025-05-15T14:00:00Z",
      closeOn: "2025-05-28T18:00:00Z",
      createdOn: "2025-05-12T11:00:00Z",
      limit: "Yes / No",
      opened: true,
      passcode: "BOARD-ONLY",
      status: "ended",
      candidates: ["Approve", "Reject", "Abstain"],
      parties: [],
      voters: ["chair.near", "director1.near"],
    },
    {
      id: 5,
      name: "Neighborhood Logo Contest",
      desc: "Residents pick the winning logo for the community re-branding.",
      role: "Residents",
      creator: "abnakore.near",
      openOn: "2025-06-02T00:00:00Z",
      closeOn: "2025-06-05T20:00:00Z",
      createdOn: "2025-05-31T16:45:00Z",
      limit: "1 vote per household",
      opened: true,
      passcode: "",
      status: "active",
      candidates: ["Logo A", "Logo B", "Logo C", "Logo D"],
      parties: [],
      voters: ["amaka.near", "bashir.near", "chika.near"],
    },
  ]);

  // Get the watchlist data
  const [watchlist, setWatchlist] = useState([1, 4, 3]);

  // Get the logged in User
  const [userName, setUserName] = useState("abnakore.near");

  const [votesToRender, setVotesToRender] = useState([]);

  // Set the types of filters and values
  const [filterOptions, setFilterOptions] = useState({
    status: ["active", "upcoming", "ended"], // 'active' | 'upcoming' | 'ended' | null
    createdBy: allVotes.map((vote) => vote.creator), // List of user IDs or names
    security: ["locked", "unlocked"], // 'locked' | 'unlocked' | null
  });

  // State that saves the applied Filters
  const [appliedFilters, setAppliedFilters] = useState([]);

  // Current filter (Set the selected filter type to be the first type in the filter options)
  const [currentFilter, setCurrentFilter] = useState({
    type: Object.keys(filterOptions)[0],
    value: "",
  });

  // Functions
  // Toggle filter modal
  const toggleFilterModal = () =>
    setState({ ...state, showFilterModal: !state.showFilterModal });

  return (
    <>
      <div className="all-votes">
        {/* <div className="aside-div"> */}
        <Aside
          objs={pages}
          active={`/Voting Page?tab=${state.tab}`}
          buttonConf={{
            title: "Create new poll",
            handleClick: () => {
              navigate("/create"); // Redirect to create vote page
            },
          }}
        />
        {/* </div> */}
        <div className="profile-tabs">
          <button
            className={`tab-btn ${state.tab === "explore" ? "active" : ""}`}
            onClick={() => setState({ ...state, tab: "explore" })}
          >
            <FaGlobe /> All Votes
          </button>
          <button
            className={`tab-btn ${state.tab === "my" ? "active" : ""}`}
            onClick={() => setState({ ...state, tab: "my" })}
          >
            <FaUserEdit /> My Votes
          </button>
          <button
            className={`tab-btn ${state.tab === "watching" ? "active" : ""}`}
            onClick={() => setState({ ...state, tab: "watching" })}
          >
            <FaBookmark /> Watching
          </button>
        </div>

        <div className="quick-actions">
          <div className="search-bar">
            <IoIosSearch className="icon" />
            <input placeholder="Search" type="search" className="input" />
          </div>
          <div className="filter-div">
            {/* <button className="filter-btn" onClick={toggleFilterModal}>
              <HiOutlineFilter />
              Filter
              <span className="filter-badge">3</span>
            </button> */}
            <Button
              icon={<HiOutlineFilter />}
              title={"Filter"}
              badge={3}
              theme={"secondary"}
              handleClick={toggleFilterModal}
            />

            <Button
              icon={<FaSort />}
              title={"Sort By"}
              badge={3}
              theme={"secondary"}
              handleClick={() => {}}
            />

            <div
              className={`filter-modal ${state.showFilterModal && "show"}`}
              onClick={toggleFilterModal}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h3>
                    Manage Filters {JSON.stringify(currentFilter)}
                    {String(filterOptions[currentFilter.type]?.length)}
                  </h3>
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
                  <select
                    id="filterType"
                    onChange={(e) =>
                      setCurrentFilter({ type: e.target.value, value: "" })
                    }
                  >
                    {Object.keys(filterOptions).map((key) => (
                      <option key={key} value={key}>
                        {
                          key
                            .replace(/([A-Z])/g, " $1") // insert space before capital letters
                            .replace(/^./, (str) => str.toUpperCase()) // capitalize first letter
                        }
                      </option>
                    ))}
                  </select>
                  {filterOptions[currentFilter.type]?.length <= 3 ? (
                    <select id="filterType">
                      <option value="category">Created By</option>
                      <option value="price">Security</option>
                      <option value="status">Status</option>
                    </select>
                  ) : (
                    <>
                      <input
                        type="text"
                        id="filterValue"
                        placeholder="Enter value"
                        list="status-options"
                      />

                      <datalist id="status-options">
                        {filterOptions[currentFilter.type].map((option) => (
                          <option key={option} value={option} />
                        ))}
                      </datalist>
                    </>
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
