// Get the user's accountId
const accountId = context.accountId;

// Declaring variables
// !!!
const voteId = props.vote && parseFloat(props.vote);
// const voteId = 113225718; // 113239184

// All the votes
// const [allVotes, setAllVotes] = useState([]);
// const [voteToRender, setVoteToRender] = useState([]);
const allVotes = Social.index("voteChainTest", "vote")
  ? Social.index("voteChainTest", "vote")
  : [];
const [otherParties, setOtherParties] = useState(
  Social.index("voteChainTest", "party")
    ? Social.index("voteChainTest", "party")
    : []
);

// Set the value of voteto render by adding other parties to it
function getValue() {
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
  setOtherParties(
    Social.index("voteChainTest", "party")
      ? Social.index("voteChainTest", "party")
      : []
  );
  setVoteToRender(getValue());
  setNewParty({ name: "", acronym: "" });

  // Remove the error
  setState({
    ...state,
    error: "",
    showError: false,
  });

  console.log("done", otherParties);
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
}, [voteToRender.value.creator === accountId]);

// name and acro
const [newParty, setNewParty] = useState({
  name: "",
  acronym: "",
});

// Save the data and add a new candidate
function save() {
  if (newParty.name !== "" && newParty.acronym !== "") {
    // Get All the parties again and validate
    setOtherParties(
      Social.index("voteChainTest", "party")
        ? Social.index("voteChainTest", "party")
        : []
    );
    setVoteToRender(getValue());

    // check for no similar name or acronym
    if (JSON.stringify(voteToRender.value.parties) !== JSON.stringify([])) {
      const filtered = voteToRender.value.parties.filter((party) => {
        return (
          party.name.toLowerCase() === newParty.name.toLowerCase() ||
          party.acronym.toLowerCase() === newParty.acronym.toLowerCase()
        );
      });
      if (filtered.length > 0) {
        setState({
          ...state,
          error: "Two parties can not have thesame Name or Acronym",
          showError: true,
        });
        return;
      }
    }

    // Check for 4 letters of the acronym
    if (newParty.acronym.length <= 4 && newParty.acronym.length > 0) {
      const NewParty = {
        ...newParty,
        acronym: newParty.acronym.toUpperCase(),
        name: newParty.name
          .toLowerCase()
          .replace(/\b\w/g, (s) => s.toUpperCase()),
        voteId: voteId,
      };

      console.log(NewParty);
      // Upload the data to socialDb
      // Social.set({
      //   index: {
      //     voteChainTest: JSON.stringify({ key: "party", value: NewParty }),
      //   },
      // });
      // // console.log(newVotes);
      // setNewParty({ name: "", acronym: "" });
      // Remove the error
      setState({
        ...state,
        error: "",
        showError: false,
      });

      return {
        index: {
          voteChainTest: JSON.stringify({ key: "party", value: NewParty }),
        },
      };
    } else {
      setState({
        ...state,
        error: "Acronym must be at most 4 letters",
        showError: true,
      });
      return null;
    }
  } else {
    setState({
      ...state,
      error: `Party ${
        newParty.name === "" ? "Name" : "Acronym"
      } can not be empty`,
      showError: true,
    });
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
              {voteToRender ? (
                <div className="two-sides">
                  <Widget
                    src="abnakore.near/widget/Aside"
                    props={{
                      objs: pages,
                      active: `https://near.social/abnakore.near/widget/ManageParties?vote=${voteToRender.value.id}`,
                    }}
                  />
                  {voteToRender.value.creator === accountId ? (
                    <div className="body-contents">
                      <h1>Manage Parties</h1>
                      <Widget
                        src="abnakore.near/widget/Table"
                        props={{
                          headings: ["S/N", "Party Name", "Acronym"],
                          data: Object.values(
                            voteToRender.value.parties.map((c, i) =>
                              [i + 1].concat(Object.values(c))
                            )
                          ),
                        }}
                      />
                      <div className="form">
                        <secText>Add Party</secText>
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
                        <CommitButton data={save} onCommit={refresh}>
                          Add
                        </CommitButton>
                      </div>
                    </div>
                  ) : (
                    <div className="body-contents">
                      <h1>You don't have access to this page</h1>
                      <a href="https://near.social/abnakore.near/widget/VoteChain">
                        Back to Home Page
                      </a>
                    </div>
                  )}
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