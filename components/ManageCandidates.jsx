// Get the user's accountId
const accountId = context.accountId;

// Declaring variables
// !!!
const voteId = props.vote && parseFloat(props.vote);
// const voteId = 113239184;

// All the votes
// const [allVotes, setAllVotes] = useState([]);
// const [voteToRender, setVoteToRender] = useState([]);
const allVotes = Social.index("voteChainTest", "vote")
  ? Social.index("voteChainTest", "vote")
  : [];
const [otherCandidates, setOtherCandidates] = useState(
  Social.index("voteChainTest", "candidate")
    ? Social.index("voteChainTest", "candidate")
    : []
);
const otherParties = Social.index("voteChainTest", "party");

// Set the value of votetorender by adding other parties and candidates to it
function getValue() {
  console.log(otherCandidates);
  var temp = allVotes.find((vote) => vote.blockHeight === voteId);
  return {
    ...temp,
    value: {
      ...temp.value,
      parties: temp.value.parties.concat(
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
      candidates: temp.value.candidates.concat(
        otherCandidates
          .filter(
            (candidate) =>
              candidate.value.voteId === voteId &&
              candidate.value.name &&
              candidate.value.party &&
              candidate.value.role
          )
          .map((c) => c.value)
      ),
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

function refresh() {
  setOtherCandidates(
    Social.index("voteChainTest", "candidate")
      ? Social.index("voteChainTest", "candidate")
      : []
  );
  setVoteToRender(getValue());
  // remove error
  setState({
    ...state,
    error: "",
    showError: false,
  });
  setNewCandidate({
    name: "",
    party: "",
    role: "",
    votes: 0,
  });
  console.log("donee");
}

// Storing some data in state
const [state, setState] = useState({
  error: "",
  showError: false,
});

// Pages that will be displayed in the aside
const [pages, setPages] = useState([]);

// Add admin pages if the user is the creator of the vote
useEffect(() => {
  if (voteToRender.value.creator === accountId) {
    setPages([
      {
        name: "Voting Page",
        link: `/abnakore.near/widget/App.jsx?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Result",
        link: `/abnakore.near/widget/Result.jsx?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Admin Home",
        link: `/abnakore.near/widget/AdminHome?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Manage Candidates",
        link: `/abnakore.near/widget/ManageCandidates?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Mange Parties",
        link: `/abnakore.near/widget/ManageParties?vote=${voteToRender.blockHeight}`,
      },
    ]);
  } else {
    setPages([
      {
        name: "Voting Page",
        link: `/abnakore.near/widget/App.jsx?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Result",
        link: `/abnakore.near/widget/Result.jsx?vote=${voteToRender.blockHeight}`,
      },
    ]);
  }
}, [voteToRender.value.creator === accountId]);

// Function that get the unselected parties
function getUnusedParties() {
  const usedParties = voteToRender.value.candidates.map(
    (candidate) => candidate.party
  );
  const unusedParties = voteToRender.value.parties.filter(
    (party) => !usedParties.includes(party.acronym)
  );
  return unusedParties;
}

// List of candidates and their curresponding number of votes
// const [candidates, setCandidates] = useState([]);

// name and acro
const [newCandidate, setNewCandidate] = useState({
  name: "",
  party: "",
  role: "",
  votes: 0,
});

// Update the dropdown
function updateDropDown(e) {
  setNewCandidate((prev) => {
    prev.party = e.target.value;
    return prev;
  });
}

// Save the data and add a new candidate
function save() {
  if (newCandidate.name !== "" && newCandidate.party !== "") {
    setOtherCandidates(
      Social.index("voteChainTest", "candidate")
        ? Social.index("voteChainTest", "candidate")
        : []
    );
    setVoteToRender(getValue());

    // check if there is another candidate with thesame party
    const filtered = voteToRender.value.candidates.filter((candidate) => {
      return candidate.party.toLowerCase() === newCandidate.party.toLowerCase();
    });
    if (filtered.length > 0) {
      setState({
        ...state,
        error: "Two candidates cannot be in thesame party",
        showError: true,
      });
      return;
    }

    const NewCandidate = {
      ...newCandidate,
      name: newCandidate.name
        .toLowerCase()
        .replace(/\b\w/g, (s) => s.toUpperCase()),
      role: voteToRender.value.role,
      votes: 0,
      voteId: voteId,
    };

    // Upload the data to socialDb
    console.log(NewCandidate);
    // Social.set({
    //   index: {
    //     voteChainTest: JSON.stringify({
    //       key: "candidate",
    //       value: NewCandidate,
    //     }),
    //   },
    // });
    // setNewCandidate({
    //   name: "",
    //   party: "",
    //   role: "",
    //   votes: 0,
    // });
    setState({
      ...state,
      error: "",
      showError: false,
    });
    return {
      index: {
        voteChainTest: JSON.stringify({
          key: "candidate",
          value: NewCandidate,
        }),
      },
    };
  } else {
    setState({
      ...state,
      error: `Candidate's ${
        newCandidate.name === "" ? "Name" : "Party"
      } can not be empty`,
      showError: true,
    });
    return null;
  }
}

const secText = styled.h3`
  text-align: center;
`;

// Only signed In users can access the page
return (
  <>
    {accountId ? (
      <Widget
        src="abnakore.near/widget/Wrapper"
        props={{
          body: (
            <div className="main-body">
              {voteToRender ? (
                <div className="two-sides">
                  <Widget
                    src="abnakore.near/widget/Aside"
                    props={{ objs: pages, active: "/admin/manage_candidates" }}
                  />
                  {voteToRender.value.creator === accountId ? (
                    <div className="body-contents">
                      <h1>Manage Candidates</h1>
                      <Widget
                        src="abnakore.near/widget/Table"
                        props={{
                          headings: [
                            "S/N",
                            "Candidate's Name",
                            "Party",
                            "Role",
                          ],
                          data: Object.values(
                            voteToRender.value.candidates
                              .sort((a, b) => a.name > b.name)
                              .map((c, i) =>
                                [i + 1].concat([c.name, c.party, c.role])
                              )
                          ),
                        }}
                      />
                      <div className="form">
                        <secText>Add Candidate</secText>
                        {state.showError && (
                          <p style={{ color: "red", textAlign: "center" }}>
                            {state.error}
                          </p>
                        )}
                        <div className="flex">
                          <Widget
                            src="abnakore.near/widget/Input.jsx"
                            props={{
                              type: "text",
                              placeholder: "Full Name",
                              required: true,
                              item: "name",
                              items: newCandidate,
                              setItem: setNewCandidate,
                              otherAttributes: {
                                value: newCandidate.name,
                              },
                            }}
                          />

                          <select
                            className="drop-down"
                            value={newCandidate.party}
                            onChange={updateDropDown}
                            name="party"
                            required
                          >
                            <option className="option" value="">
                              Select Party
                            </option>
                            {getUnusedParties().map((party) => (
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
                        <CommitButton data={save} onCommit={refresh}>
                          Add
                        </CommitButton>
                      </div>
                    </div>
                  ) : (
                    <div className="body-contents">
                      <h1>You don't have access to this page</h1>
                      <Link to="/abnakore.near/widget/VoteChain">
                        Back to Home Page
                      </Link>
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
