// Get the user's accountId
const accountId = context.accountId;

// Declaring variables
// !!!
const voteId = props.vote && props.vote;
// const voteId = 113239184;

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

// Set the value of votetorender by adding other parties and candidates to it
function getValue() {
  var temp = allVotes.find(
    (vote) => parseFloat(vote.blockHeight) === parseFloat(voteId)
  );

  var votesOnThis = votes.filter(
    (vote) =>
      parseFloat(vote.value.voteId) === parseFloat(voteId) &&
      vote.value.by &&
      vote.value.party
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

// Pages that will be displayed in the aside
const [pages, setPages] = useState([
  {
    name: "Voting Page",
    link: `/abnakore.near/widget/App.jsx?vote=${voteToRender.blockHeight}`,
  },
  {
    name: "Result",
    link: `/abnakore.near/widget/Result.jsx?vote=${voteToRender.blockHeight}`,
  },
]);

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

// other variables
const [opened, setOpened] = useState(false);
const [state, setState] = useState({
  show_error_on_passwordInput: false,
});
const [passcodeEntered, setPasscodeEntered] = useState("");

// Hashing function
function hash(text) {
  var hashed = "";
  for (var i = 0; i < text.length; i++) {
    hashed += text.charCodeAt(i);
  }
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
                      active: `/abnakore.near/widget/Result.jsx?vote=${voteToRender.blockHeight}`,
                    }}
                  />

                  {voteToRender.value.passcode === "" || opened ? (
                    <div className="body-contents">
                      <h1>Result</h1>
                      {/* Calling the table component */}
                      {/* Extracting The values in the table an converting them to list */}
                      <Widget
                        src="abnakore.near/widget/Table"
                        props={{
                          headings: [
                            "Candidate's Name",
                            "Party",
                            "Role",
                            "Number of votes",
                          ],
                          data: Object.values(
                            voteToRender.value.candidates
                              .sort((a, b) => a.votes - b.votes)
                              .map((c) => Object.values(c))
                          ),
                        }}
                      />
                    </div>
                  ) : (
                    <div className="body-contents">
                      <div className="form">
                        <div style={{ textAlign: "center" }}>
                          Please Enter Passcode
                        </div>
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
      <Widget src="abnakore.near/widget/SignIn.jsx" />
    )}
  </>
);
