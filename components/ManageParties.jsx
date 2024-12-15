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
let votesData = Social.get(`abnakore.near/votes`);
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

// name and acro
const [newParty, setNewParty] = useState({
  name: "",
  acronym: "",
});

// Save the data and add a new candidate
function save() {
  console.log(JSON.parse(votesData));
  if (newParty.name !== "" && newParty.acronym !== "") {
    // check for no similar name or acronym
    if (JSON.stringify(voteToRender.parties) !== JSON.stringify([])) {
      const filtered = voteToRender.parties.filter((party) => {
        return (
          party.name.toLowerCase() === newParty.name.toLowerCase() ||
          party.acronym.toLowerCase() === newParty.acronym.toLowerCase()
        );
      });
      if (filtered.length > 0) {
        return;
      }
    }

    // Check for 4 letters of the acronym
    if (newParty.acronym.length <= 4 && newParty.acronym.length > 0) {
      const newVotes = allVotes.map((vote) =>
        vote.id === voteToRender.id
          ? {
              ...vote,
              parties: [
                ...vote.parties,
                {
                  ...newParty,
                  acronym: newParty.acronym.toUpperCase(),
                  name: newParty.name
                    .toLowerCase()
                    .replace(/\b\w/g, (s) => s.toUpperCase()),
                },
              ],
            }
          : vote
      );

      console.log(votesData);
      // Upload the data to socialDb
      Social.set({ votes: newVotes });
      console.log(newVotes);
      setNewParty({ name: "", acronym: "" });
    }
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
                    props={{
                      objs: pages,
                      active: `https://near.org/abnakore.near/widget/ManageParties?vote=${voteToRender.id}`,
                    }}
                  />
                  <div className="body-contents">
                    <h1>Manage Parties</h1>
                    <Widget
                      src="abnakore.near/widget/Table"
                      props={{
                        headings: ["S/N", "Party Name", "Acronym"],
                        data: Object.values(
                          voteToRender.parties.map((c, i) =>
                            [i + 1].concat(Object.values(c))
                          )
                        ),
                      }}
                    />
                    <div className="form">
                      <secText>Add Party</secText>
                      <div className="flex">
                        <Widget
                          src="abnakore.near/widget/Input.jsx"
                          props={{
                            type: "text",
                            placeholder: "Party Name",
                            required: true,
                            item: "name",
                            items: newParty,
                            setItem: setNewParty,
                            otherAttributes: {
                              value: newParty.name,
                            },
                          }}
                        />
                        <Widget
                          src="abnakore.near/widget/Input.jsx"
                          props={{
                            type: "text",
                            placeholder: "Acronym",
                            required: true,
                            item: "acronym",
                            items: newParty,
                            setItem: setNewParty,
                            otherAttributes: {
                              value: newParty.acronym,
                            },
                          }}
                        />
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
                  {JSON.stringify(voteToRender)}
                </div>
              )}
            </div>
          ),
        }}
      />
    ) : (
      <Widget src="abnakore.near/widget/SignIn.jsx" />
    )}
  </>
);
// {
//   "abnakore.near": {
//     "parties": "[{\"name\":\"\",\"acronym\":\"\"}]"
//   }
// }
