// Get the user's accountId
const accountId = context.accountId;

// Declaring variables
// !!!
const voteId = props.vote && props.vote;
// const voteId = 0;

// All the votes
const [allVotes, setAllVotes] = useState([]);
const [voteToRender, setVoteToRender] = useState([]);

// Get all the votes
const votesData = Social.get(`abnakore.near/votes`);
useEffect(() => {
  if (votesData === undefined) {
    // Set the votes to an empty list if there is no votes
    setAllVotes([]);
  } else {
    setAllVotes(JSON.parse(votesData));
  }
  setVoteToRender(allVotes[voteId]);
}, [votesData === null]);

// Set the vote to be rendered
useEffect(() => {
  setVoteToRender(allVotes[voteId]);
}, [allVotes]);

// Pages that will be displayed in the aside
const [pages, setPages] = useState([
  {
    name: "Voting Page",
    link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
  },
  {
    name: "Result",
    link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
  },
]);

// Add admin pages if the user is the creator of the vote
useEffect(() => {
  if (voteToRender.creator === accountId) {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Result",
        link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Admin Home",
        link: `https://near.org/abnakore.near/widget/AdminHome?vote=${voteToRender.id}`,
      },
      {
        name: "Manage Candidates",
        link: `https://near.org/abnakore.near/widget/ManageCandidates?vote=${voteToRender.id}`,
      },
      {
        name: "Mange Parties",
        link: `https://near.org/abnakore.near/widget/ManageParties?vote=${voteToRender.id}`,
      },
    ]);
  } else {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Result",
        link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
      },
    ]);
  }
}, [voteToRender.creator === accountId]);

// Function that get the unselected parties
function getUnusedParties() {
  const usedParties = voteToRender.candidates.map(
    (candidate) => candidate.party
  );
  const unusedParties = voteToRender.parties.filter(
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
    const newVotes = allVotes.map((vote) =>
      vote.id === voteToRender.id
        ? {
            ...vote,
            candidates: [
              ...vote.candidates,
              {
                ...newCandidate,
                name: newCandidate.name
                  .toLowerCase()
                  .replace(/\b\w/g, (s) => s.toUpperCase()),
                role: voteToRender.role,
                votes: 0,
              },
            ],
          }
        : vote
    );

    // Upload the data to socialDb
    Social.set({ votes: newVotes });
    setNewCandidate({
      name: "",
      party: "",
      role: "",
      votes: 0,
    });
  }
}

function refresh() {
  // Get all the votes
  const votesDatas = Social.get(`abnakore.near/votes`);
  if (votesDatas === undefined) {
    // Set the votes to an empty list if there is no votes
    setAllVotes([]);
  } else {
    setAllVotes(JSON.parse(votesDatas));
  }
  setVoteToRender(allVotes[voteId]);

  console.log("done");
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
                          "Number of votes",
                        ],
                        data: Object.values(
                          voteToRender.candidates
                            .sort((a, b) => a.name > b.name)
                            .map((c, i) => [i + 1].concat(Object.values(c)))
                        ),
                      }}
                    />
                    <div className="form">
                      <secText>Add Candidate</secText>
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
                      <button onClick={save} onCommit={refresh()}>
                        Add
                      </button>
                    </div>
                  </div>
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
