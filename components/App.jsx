// Get the user's accountId
const accountId = context.accountId;
// https://lh3.googleusercontent.com/bard/APmgjFuZWsaz_o97xrT2glKR2ZkehWocnVMZLDGaMQYqaiBpc4_jJibMhhrERiLR5G9cfexuxPUngtq3XeWlWme_tbHMdep04y7fNOJlPNJy7K2BM2NRQy78oFzQCSzgBDZf7dUuiuN2_dbRV6aiVJOe3_4tXyBNvj7NErzEFPRgwGNsyKdTgq3T-1rJCvv76lN75HuL09zHeDdw_SQXHjVHWT2FzY563BaiDVpiIQMiP0q8JNGHjC9TlFhb2EX0LlLQTZJhjYxE4vuVcQWcf2B1AydA72UvTB3pQGMM-sNdzNyJUQddmd0RanSejz9BeosxU-b3fZxAcikT2UJzZ_Q

// Declaring variables
const voteId = props.vote && props.vote;
// const voteId = "118863372";

// All the votes
const allVotes = Social.index("voteChainTest", "vote")
  ? Social.index("voteChainTest", "vote")
  : [];
const otherCandidates = Social.index("voteChainTest", "candidate")
  ? Social.index("voteChainTest", "candidate")
  : [];
const otherParties = Social.index("voteChainTest", "party")
  ? Social.index("voteChainTest", "party")
  : [];
const votes = Social.index("voteChainTest", "votes")
  ? Social.index("voteChainTest", "votes")
  : [];

// Get the watchlist
const watchlistData = Social.get(`${accountId}/voteChain_watchlist`);
const [watchlist, setWatchlist] = useState([]);
useEffect(() => {
  if (watchlistData === undefined) {
    setWatchlist([]);
  } else {
    setWatchlist(JSON.parse(watchlistData));
  }
}, [watchlistData]);

// Set the value of votetorender by adding other parties and candidates to it
function getValue() {
  console.log(otherCandidates, "this");
  console.log(
    allVotes,
    voteId,
    allVotes.find(
      (vote) => parseFloat(vote.blockHeight) === parseFloat(voteId)
    ),
    "vote___"
  );
  var temp = allVotes.find(
    (vote) => parseFloat(vote.blockHeight) === parseFloat(voteId)
  )
    ? allVotes.find(
        (vote) => parseFloat(vote.blockHeight) === parseFloat(voteId)
      )
    : {};
  var votesOnThis = votes.filter(
    (vote) =>
      parseFloat(vote.value.voteId) === parseFloat(voteId) &&
      vote.value.by &&
      vote.value.party
  );
  console.log(
    temp,
    allVotes.find((vote) => vote.blockHeight === voteId),
    "temp___"
  );
  return {
    ...temp,
    value: {
      ...temp.value,
      parties: temp.value?.parties?.concat(
        otherParties
          .filter(
            (party) =>
              party.value.voteId === voteId &&
              party.value.name &&
              party.value.acronym
          )
          .map((party) => ({
            name: party.value.name,
            acronym: party.value.acronym,
          }))
      ),
      candidates: temp.value?.candidates
        ?.concat(
          // Add other candidates to the list of all candidates
          otherCandidates
            .filter(
              (candidate) =>
                // Get only the candidates of the vote and vreified
                candidate.value.voteId === voteId &&
                candidate.value.name &&
                candidate.value.party &&
                candidate.value.role
            )
            .map((c) => c.value)
        )
        .map(
          // This put the number of votes of the candidate
          (cand, i) => ({
            ...cand,
            votes: votesOnThis.filter((vote) => vote.value.party === cand.party)
              .length,
          })
        ),
      voters: votesOnThis.map((vote) => vote.value.by),
    },
  };
}
const [voteToRender, setVoteToRender] = useState(getValue());

// Get all the votes
useEffect(() => {
  // Set the vote to be rendered
  setVoteToRender(getValue());
  console.log(voteToRender, allVotes, "votesData");
}, [allVotes]);

// Pages that will be displayed in the aside
const [pages, setPages] = useState([]);
// Add admin pages if the user is the creator of the vote
useEffect(() => {
  console.log(
    "Is Admin?",
    voteToRender.value.creator,
    voteToRender.blockHeight,
    accountId,
    voteToRender.value.creator === accountId,
    props
  );
  if (voteToRender.value.creator === accountId) {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.social/abnakore.near/widget/App.jsx?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Result",
        link: `https://near.social/abnakore.near/widget/Result.jsx?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Admin Home",
        link: `https://near.social/abnakore.near/widget/AdminHome?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Manage Candidates",
        link: `https://near.social/abnakore.near/widget/ManageCandidates?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Mange Parties",
        link: `https://near.social/abnakore.near/widget/ManageParties?vote=${voteToRender.blockHeight}`,
      },
    ]);
  } else {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.social/abnakore.near/widget/App.jsx?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Result",
        link: `https://near.social/abnakore.near/widget/Result.jsx?vote=${voteToRender.blockHeight}`,
      },
    ]);
  }
}, [voteToRender]);

// other variables
const [opened, setOpened] = useState(false);
const [state, setState] = useState({
  show_message: false,
  show_error_on_dropdown: false,
  show_error_on_passwordInput: false,
});
const [passcodeEntered, setPasscodeEntered] = useState("");
const [candidate, setCandidate] = useState("");
const [party, setparty] = useState(0);

// Hashing function
function hash(text) {
  var hashed = "";
  for (var i = 0; i < text.length; i++) {
    // console.log(text.charAt(i), "=", text.charCodeAt(i));
    hashed += text.charCodeAt(i);
  }
  //   console.log(hashed);
  return hashed;
}

// Check the entered passcode if it is correct
function checkPasscode() {
  const hashedPasscode = hash(passcodeEntered);
  if (hashedPasscode === voteToRender.value.passcode) {
    console.log("true");
    setOpened(true);
    return true;
  } else {
    console.log("false");
    setState({
      ...state,
      show_error_on_passwordInput: true,
    });
    return false;
  }
}

// Function for voting
function vote() {
  console.log(candidate, party, "CP");
  if (candidate !== "" && party !== "") {
    setState({
      ...state,
      show_message: true,
    });

    // Update
    // !!!
    // Social.set({
    //   index: {
    //     voteChainTest: JSON.stringify({
    //       key: "votes",
    //       value: {
    //         by: accountId,
    //         voteId: voteId,
    //         party: party,
    //       },
    //     }),
    //   },
    // });
    return {
      index: {
        voteChainTest: JSON.stringify({
          key: "votes",
          value: {
            by: accountId,
            voteId: voteId,
            party: party,
          },
        }),
      },
    };
  } else {
    // Set an error on the dropdown
    setState({
      ...state,
      show_error_on_dropdown: true,
    });
    return;
  }
}

// Update the value of the dropdowns when changed
function updateDropdown(e) {
  setCandidate(e.target.value);
  setparty(e.target.value);
  console.log(
    e.target.value,
    voteToRender.value.candidates[e.target.value],
    candidate
  );
  // Remove the  error on the dropdown
  setState({
    ...state,
    show_error_on_dropdown: false,
  });
}

// Get the current date and time
function getDateTime() {
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

//  Format the date and time (January 7, 2024 at 5:57 PM)
function formatDateTime(dateTimeString) {
  // Assuming you have a date-time input with the format "YYYY-MM-DDTHH:mm" as a string
  const dateTime = new Date(dateTimeString);

  // Formatting the date and time in 12-hour format
  const formattedDateTime = dateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Set to true for 12-hour format
  });

  return formattedDateTime;
}

// check if the vote is ongoing
function isOngoing() {
  return voteToRender.value.closeTime !== ""
    ? Date.parse(voteToRender.value.openTime) <= Date.parse(getDateTime()) &&
        Date.parse(voteToRender.value.closeTime) > Date.parse(getDateTime())
    : Date.parse(voteToRender.value.openTime) <= Date.parse(getDateTime());
}
const [ongoing, setOngoing] = useState(isOngoing());
// Re check if it is ongoing every 1 sec
useEffect(() => {
  const interval = setInterval(() => {
    setOngoing(isOngoing());
  }, 1000);
  return () => clearInterval(interval);
}, [voteToRender]);

// Add the vote to watchlist
function addToWatchlist() {
  if (watchlist.includes(voteId)) {
    // remove from watchlist
    Social.set({
      voteChain_watchlist: watchlist.filter((item) => item !== voteId),
    });
  } else {
    // Add to watchlist
    Social.set({ voteChain_watchlist: watchlist.concat(voteId) });
  }
}

const secText = styled.h3`
  text-align: center;
`;
return (
  <>
    {accountId ? (
      <Widget
        src="abnakore.near/widget/Wrapper"
        props={{
          body: (
            <div className="main-body">
              {/* Check if the vote exists(i.e allVotes[voteId] exists) */}
              {voteToRender ? (
                <div className="two-sides">
                  {/* The Aside bar that helps in quick navigation btw pages */}
                  <Widget
                    src="abnakore.near/widget/Aside"
                    props={{ objs: pages, active: "/" }}
                  />

                  {/* Check if the vote is ongoing */}
                  {ongoing === true ? (
                    // Check if the vote has password
                    voteToRender.value.passcode === "" || opened ? (
                      // Check if the vote reached to its voters limit
                      voteToRender.value.limit === "" ||
                      (voteToRender.value.limit !== "" &&
                        voteToRender.value.limit >
                          voteToRender.value.voters.length) ? (
                        <div className="body-contents">
                          <button onClick={addToWatchlist}>
                            {watchlist.includes(voteId)
                              ? "Remove from watchlist"
                              : "Add to watchlist"}
                          </button>
                          <i>
                            <svg
                              width="64px"
                              height="64px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  d="M4 6H20M4 12H20M4 18H20"
                                  stroke="#fefefe"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </g>
                            </svg>
                          </i>
                          <h1>{voteToRender.value.name}</h1>
                          <p
                            style={{
                              textAlign: "justify",
                              padding: "10px 20px",
                            }}
                          >
                            {voteToRender.value.desc}
                          </p>
                          <p
                            style={{
                              color: "green",
                              display: voteToRender.value.voters.includes(
                                accountId
                              )
                                ? "block"
                                : "none",
                            }}
                          >
                            You Have Succesfully Voted
                          </p>
                          <div className="card">
                            <div className="flex">
                              <select
                                disabled={
                                  voteToRender.value.voters.includes(accountId)
                                    ? true
                                    : false
                                }
                                className={`drop-down ${
                                  state.show_error_on_dropdown ? "error" : ""
                                }`}
                                value={candidate}
                                onChange={updateDropdown}
                                name="candidate"
                                required
                              >
                                <option className="option" value={""}>
                                  Select by Candidate
                                </option>
                                {voteToRender.value.candidates.map(
                                  (candidate, i) => (
                                    <option
                                      className="option"
                                      key={candidate.id}
                                      value={candidate.party}
                                    >
                                      {candidate.name}
                                    </option>
                                  )
                                )}
                              </select>
                              OR
                              <select
                                disabled={
                                  voteToRender.value.voters.includes(accountId)
                                    ? true
                                    : false
                                }
                                className={`drop-down ${
                                  state.show_error_on_dropdown ? "error" : ""
                                }`}
                                value={party}
                                onChange={updateDropdown}
                                name="party"
                                required
                              >
                                <option className="option" value={""}>
                                  Select by Party
                                </option>
                                {voteToRender.value.parties
                                  .filter((party) =>
                                    voteToRender.value.candidates
                                      .map((c) => c.party)
                                      .includes(party.acronym)
                                  )
                                  .map((party, i) => (
                                    <option
                                      className="option"
                                      key={party.acronym}
                                      value={party.acronym}
                                    >
                                      {party.name} ({party.acronym})
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <CommitButton
                              disabled={
                                voteToRender.value.voters.includes(accountId)
                                  ? true
                                  : false
                              }
                              data={vote}
                              //   onClick={vote}
                            >
                              Vote
                            </CommitButton>

                            <p
                              id="thanks"
                              className={`${state.show_message ? "" : "hide"}`}
                            >
                              Thank you for voting
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="body-contents">
                          <secText>
                            Sorry the max number of voters(
                            {voteToRender.value.limit}) has been reached
                          </secText>
                        </div>
                      )
                    ) : (
                      <div className="body-contents">
                        <div className="form">
                          <secText>Please Enter Passcode</secText>
                          <p
                            className="error"
                            style={{
                              color: "red",
                              display: state.show_error_on_passwordInput
                                ? "block"
                                : "none",
                              textAlign: "center",
                            }}
                          >
                            The Password you entered is incorrect
                          </p>
                          <Widget
                            src="abnakore.near/widget/Input.jsx"
                            props={{
                              type: "password",
                              placeholder: "Enter Passcode",
                              required: true,
                              otherAttributes: {
                                value: passcodeEntered,
                                autoFocus: true,
                                onKeyPress: (e) => {
                                  if (e.key === "Enter") {
                                    checkPasscode();
                                  }
                                },
                                onChange: (e) => {
                                  setPasscodeEntered(e.target.value);
                                },
                              },
                            }}
                          />
                          <button onClick={checkPasscode}>Submit</button>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="body-contents">
                      {voteToRender.value.closeTime !== ""
                        ? Date.parse(voteToRender.value.openTime) <=
                            Date.parse(getDateTime()) &&
                          Date.parse(voteToRender.value.closeTime) >
                            Date.parse(getDateTime())
                        : Date.parse(voteToRender.value.openTime) <=
                          Date.parse(getDateTime())}
                      {/* If the vote has not been started */}
                      {Date.parse(voteToRender.value.openTime) >
                      Date.parse(getDateTime()) ? (
                        <>
                          <h1>
                            This vote will start on: <br />
                          </h1>
                          <h3>{formatDateTime(voteToRender.value.openTime)}</h3>
                        </>
                      ) : (
                        <>
                          <h1>
                            The vote has been ended on: <br />
                          </h1>
                          <h3>
                            {formatDateTime(voteToRender.value.closeTime)}
                          </h3>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="body-contents">
                  <h1>Vote Doesn't exist</h1>
                </div>
              )}
            </div>
          ),
        }}
      />
    ) : (
      <Widget src="abnakore.near/widget/SignIn.jsx" props={props} />
    )}
  </>
);
