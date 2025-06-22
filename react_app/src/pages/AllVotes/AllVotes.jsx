// React
import React, { useEffect, useMemo, useState } from "react";

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
  FaInfoCircle,
  FaSort,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import Button from "../../components/Button/Button";
import { RiDashboardFill } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { camelCaseToNormal, getVoteStatus } from "../../scripts/functions";
import { useNear } from "../../contexts/NearContext";

// Pages in Navbar
const pages = [
  { path: "/", name: "Home", icon: <RiDashboardFill /> },
  { path: "/create", name: "Create Vote", icon: <IoCreateOutline /> },
  { path: "/about", name: "About", icon: <FaInfoCircle /> },
];

// Tabs
const TABS = { all: "all", my: "my", watchlist: "watching" };

// Filter types
const FILTERTYPES = {
  status: "status",
  creator: "creator",
  security: "security",
};

function AllVotes() {
  // Get some context
  const { accountId } = useNear();

  // Get search Params
  const [searchParams] = useSearchParams();
  // Using Navigation
  const navigate = useNavigate();

  // Using state
  const [state, setState] = useState({
    showFilterModal: false,
    tab: searchParams.get("tab"),
  });

  // Votes to render (After applying filters and sorting)
  const [votesToRender, setVotesToRender] = useState([]);

  // Set the types of filters and values
  const filterOptions = useMemo(
    () => ({
      [FILTERTYPES.status]: ["active", "upcoming", "ended"], // 'active' | 'upcoming' | 'ended' | null
      [FILTERTYPES.creator]: [
        ...new Set(votesToRender.map((vote) => vote.creator)),
      ], // Set of user IDs or names
      [FILTERTYPES.security]: ["locked", "unlocked"], // 'locked' | 'unlocked' | null
    }),
    [votesToRender]
  );

  // State that saves the applied Filters
  const [appliedFilters, setAppliedFilters] = useState([]);

  // Current filter (Set the selected filter type to be the first type in the filter options and the fist value in the filter type)
  const [currentFilter, setCurrentFilter] = useState({
    type: Object.keys(filterOptions)[0],
    value: Object.values(filterOptions)[0][0],
  });

  // Search Query
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Data
  // Get All Votes
  const [allVotes, setAllVotes] = useState([
    {
      id: 0,
      name: "Best Campus Food Spot",
      desc: "Students choose their favorite place to grab lunch on campus.",
      role: "Public poll",
      creator: "john_doe.near",
      openOn: "2025-07-01T12:00:00Z",
      closeOn: "2025-07-02T12:00:00Z",
      createdOn: "2025-05-29T10:00:00Z",
      limit: "1 vote per student",
      opened: true,
      passcode: "",
      status: getVoteStatus("2025-07-01T12:00:00Z", "2025-07-02T12:00:00Z"),
      candidates: ["Café Verde", "Grill House", "Noodle Hub", "Veggie Delight"],
      parties: [],
      voters: ["alice.near", "ben.near", "chioma.near"],
    },
    {
      id: 1,
      name: "Department Chair Election",
      desc: "Faculty members elect the next chair of the Computer Science Department.",
      role: "Faculty only",
      creator: "aaanakore.testnet",
      openOn: "2025-06-03T08:00:00Z",
      closeOn: "2025-07-03T15:00:00Z",
      createdOn: "2025-05-30T08:30:00Z",
      limit: "1 vote per faculty member",
      opened: false,
      passcode: "CS-2025-CHAIR",
      status: getVoteStatus("2025-06-03T08:00:00Z", "2025-07-03T15:00:00Z"),
      candidates: ["Dr. A. Martins", "Prof. S. Okafor", "Dr. L. Zhang"],
      parties: [],
      voters: [],
    },
    {
      id: 2,
      name: "Product Feature Priority",
      desc: "Customers rank which feature we should build next.",
      role: "Customer advisory board",
      creator: "aaanakore.testnet",
      openOn: "2025-05-25T09:00:00Z",
      closeOn: "2025-06-10T12:00:00Z",
      createdOn: "2025-05-15T14:20:00Z",
      limit: "Top-3 ranked choices",
      opened: true,
      passcode: "",
      status: getVoteStatus("2025-05-25T09:00:00Z", "2025-06-10T12:00:00Z"),
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
      openOn: "2025-06-20T10:00:00Z",
      closeOn: "2025-06-30T23:59:00Z",
      createdOn: "2025-06-10T09:15:00Z",
      limit: "1 vote per student",
      opened: true,
      passcode: "",
      status: getVoteStatus("2025-06-20T10:00:00Z", "2025-06-30T23:59:00Z"),
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
      openOn: "2025-06-15T14:00:00Z",
      closeOn: "2025-06-28T18:00:00Z",
      createdOn: "2025-06-12T11:00:00Z",
      limit: "Yes / No",
      opened: true,
      passcode: "BOARD-ONLY",
      status: getVoteStatus("2025-06-15T14:00:00Z", "2025-06-28T18:00:00Z"),
      candidates: ["Approve", "Reject", "Abstain"],
      parties: [],
      voters: ["chair.near", "director1.near"],
    },
    {
      id: 5,
      name: "Neighborhood Logo Contest",
      desc: "Residents pick the winning logo for the community re-branding.",
      role: "Residents",
      creator: "aaanakore.testnet",
      openOn: "2025-06-02T00:00:00Z",
      closeOn: "2025-06-05T20:00:00Z",
      createdOn: "2025-05-31T16:45:00Z",
      limit: "1 vote per household",
      opened: true,
      passcode: "",
      status: getVoteStatus("2025-06-02T00:00:00Z", "2025-06-05T20:00:00Z"),
      candidates: ["Logo A", "Logo B", "Logo C", "Logo D"],
      parties: [],
      voters: ["amaka.near", "bashir.near", "chika.near"],
    },
  ]);

  // Get the watchlist data
  const [watchlist, setWatchlist] = useState([1, 4, 3]);

  // Get the logged in User
  // const [userName, setUserName] = useState("aaanakore.testnet");

  // Effects
  // Change tab whenever searchParams change
  useEffect(() => {
    const currentTab = searchParams.get("tab") || TABS.all;
    setState({ ...state, tab: currentTab });
  }, [searchParams]);

  // Functions
  // Toggle filter modal
  const toggleFilterModal = () =>
    setState({ ...state, showFilterModal: !state.showFilterModal });

  // Add filter
  const addFilter = (filter) => {
    // Verify validity (check if the filter value is included in the filter type's value)
    if (!filterOptions[filter.type].includes(filter.value)) {
      console.warn("Invalid!!!");
    }

    // Get the already applied filter types
    const appliedFiltersTypes = appliedFilters.map((filt) => filt.type);
    // Check if the current filter type has already been applied
    if (appliedFiltersTypes.includes(filter.type)) {
      // Replace the existing filter with the new value
      setAppliedFilters((prev) =>
        prev.map((filt) => (filt.type === filter.type ? filter : filt))
      );
    } else {
      // Add as new filter if it does'nt exist
      setAppliedFilters((prev) => prev.concat(filter));
    }
  };

  // Remove Filter
  const removeFilter = (filterType) => {
    setAppliedFilters((prev) =>
      prev.filter((filt) => filt.type !== filterType)
    );
  };

  // The main filter function (Filter by tab, appliedFilters, sort and search)
  const filterVotes = async () => {
    // Copy allvotes to a new variable
    let filteredVotes = allVotes;
    console.log(filteredVotes);

    // Filter by tab
    // Filter only if the tab is not all votes
    if (state.tab !== TABS.all) {
      filteredVotes = await filterByTab(filteredVotes, state.tab);
    }
    console.log(filteredVotes);

    // Filter by applied Filters
    filteredVotes = await filterByAppliedFilters(filteredVotes, appliedFilters);
    console.log(filteredVotes);

    // Sort

    // Search

    // Update the votesToRender list
    setVotesToRender(filteredVotes);
  };

  // Filter by tab (all_votes, my_Votes or watching)
  const filterByTab = async (votes, tab) => {
    if (tab === TABS.my) {
      // Filter the votes created by the user
      return votes.filter((vote) => vote.creator === accountId);
    } else if (tab === TABS.watchlist) {
      // Filter the votes that are in the user's watchlist
      return votes.filter((vote) => watchlist.includes(vote.id));
    }

    // Return all votes by default
    return votes;
  };

  // Filter by applied filters
  const filterByAppliedFilters = async (votes, applied_filters) => {
    let filteredVotes = votes;

    applied_filters.forEach((filter) => {
      // Filter the votes based on each filter types
      filteredVotes = filteredVotes.filter((vote) => {
        // Check for passcode if the filter type is security filter
        if (filter.type === FILTERTYPES.security) {
          // Filter votes that has passcode if the value is locked and those that does'nt otherwise

          return filter.value === "locked"
            ? !(vote.passcode === "")
            : vote.passcode === "";
        }

        //
        return vote[filter.type] === filter.value;
      });
    });

    return filteredVotes;
  };

  // Sort function (by title, time remaining, number of votes, or quorum) in ascending or descending order
  const sortVotes = async (votes, by, order) => {
    return votes;
  };

  // Search (by title)
  const searchedVotes = useMemo(() => {
    if (searchQuery === "") return votesToRender;
    return votesToRender.filter((vote) =>
      vote.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, votesToRender]);

  useEffect(() => {
    // Clear filters and search
    setAppliedFilters([]);
    setSearchQuery("");

    // !!! Filter Votes
    // filterVotes();
  }, [state.tab]);

  useEffect(() => {
    // Filter Votes
    filterVotes();
  }, [appliedFilters]);

  return (
    <>
      <div className="all-votes">
        {/* <div className="aside-div"> */}
        <Aside navLinks={pages} />
        {/* </div> */}
        <div className="profile-tabs">
          <button
            className={`tab-btn ${state.tab === TABS.all ? "active" : ""}`}
            onClick={() => setState({ ...state, tab: TABS.all })}
          >
            <FaGlobe /> All Votes
          </button>
          <button
            className={`tab-btn ${state.tab === TABS.my ? "active" : ""}`}
            onClick={() => setState({ ...state, tab: TABS.my })}
          >
            <FaUserEdit /> My Votes
          </button>
          <button
            className={`tab-btn ${
              state.tab === TABS.watchlist ? "active" : ""
            }`}
            onClick={() => setState({ ...state, tab: TABS.watchlist })}
          >
            <FaBookmark /> Watching
          </button>
        </div>

        <div className="quick-actions">
          <div className="search-bar">
            <IoIosSearch className="icon" />
            <input
              placeholder="Search"
              type="search"
              className="input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-div">
            <Button
              icon={<HiOutlineFilter />}
              title={"Filter"}
              badge={appliedFilters.length > 0 && appliedFilters.length}
              theme={"secondary"}
              handleClick={toggleFilterModal}
            />

            {/* <Button
              icon={<FaSort />}
              title={"Sort By"}
              badge={3}
              theme={"secondary"}
              handleClick={() => {}}
            /> */}

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
                </div>

                <div className="active-filters">
                  {appliedFilters.map((filter) => (
                    <div key={filter.type} className="filter-item">
                      <div>{`${camelCaseToNormal(filter.type)}: ${
                        filter.value
                      }`}</div>
                      <span
                        className="close"
                        onClick={() => removeFilter(filter.type)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>

                <div className="add-filter">
                  <select
                    id="filterType"
                    onChange={(e) =>
                      setCurrentFilter({
                        type: e.target.value,
                        value: filterOptions[e.target.value][0],
                      })
                    }
                  >
                    {Object.keys(filterOptions).map((key) => (
                      <option key={key} value={key}>
                        {camelCaseToNormal(key)}
                      </option>
                    ))}
                  </select>
                  {filterOptions[currentFilter.type]?.length <= 3 ? (
                    <select
                      id="filterType"
                      onChange={(e) =>
                        setCurrentFilter({
                          ...currentFilter,
                          value: e.target.value,
                        })
                      }
                    >
                      {filterOptions[currentFilter.type]?.map((opt) => (
                        <option key={opt} value={opt}>
                          {camelCaseToNormal(opt)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <>
                      <input
                        type="text"
                        id="filterValue"
                        placeholder="Enter value"
                        list="status-options"
                        value={currentFilter.value}
                        onChange={(e) =>
                          setCurrentFilter({
                            ...currentFilter,
                            value: e.target.value,
                          })
                        }
                      />

                      <datalist id="status-options">
                        {filterOptions[currentFilter.type].map((option) => (
                          <option key={option} value={option} />
                        ))}
                      </datalist>
                    </>
                  )}
                  <button
                    className="white-button"
                    onClick={() => addFilter(currentFilter)}
                    disabled={
                      !filterOptions[currentFilter.type].includes(
                        currentFilter.value
                      )
                    }
                  >
                    Add Filter
                  </button>
                </div>

                <div className="modal-footer">
                  <button
                    className="white-button"
                    onClick={() => {
                      appliedFilters.forEach((filt) => removeFilter(filt.type));
                    }}
                  >
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
          {searchedVotes.length > 0
            ? searchedVotes.map((vote, i) => <VoteCard key={i} {...vote} />)
            : // !!! Create a template for this
              "No votes matching query"}
        </div>
      </div>
    </>
  );
}

export default AllVotes;
