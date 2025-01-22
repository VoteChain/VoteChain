// Get accountId
const accountId = context.accountId;

// All the votes
const [allVotes, setAllVotes] = useState([]);

// Get all the votes
const Data = Social.get(`abnakore.near/votes`);

useEffect(() => {
  //   console.log(Data);
  if (Data === undefined) {
    // Set the candidate to an empty list if there is no candidate
    setAllVotes([]);
  } else {
    setAllVotes(JSON.parse(Data));
  }
  //   console.log(Data, "");
}, [Data === null]);

// Get the current date and time
function getDateTime() {
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

// New Vote
const [newVote, setNewVote] = useState({
  name: "",
  desc: "",
  role: "",
  creator: "",
  openTime: getDateTime(),
  closeTime: "",
  createdOn: "",
  limit: "",
  opened: true,
  passcode: "",
  candidates: [],
  parties: [],
  voters: [],
});

// Parties
const [parties, setParties] = useState([]);

// New Party
const [newParty, setNewParty] = useState({
  name: "",
  acronym: "",
});

// candidates
const [candidates, setCandidates] = useState([]);

// New Candidate
const [newCandidate, setNewCandidate] = useState({
  name: "",
  party: "",
  role: newVote.role,
  votes: 0,
});

// Add the new party to the table
function AddParty() {
  // Check if the data given is valid

  if (newParty.name !== "" && newParty.acronym !== "") {
    // check for no similar name or acronym
    if (JSON.stringify(parties) !== JSON.stringify([])) {
      const filtered = parties.filter((party) => {
        return (
          party.name.toLowerCase() === newParty.name.toLowerCase() ||
          party.acronym.toLowerCase() === newParty.acronym.toLowerCase()
        );
      });
      if (filtered.length > 0) {
        return;
      }
    }

    // Check for three letters of the acronym
    if (newParty.acronym.length <= 4 && newParty.acronym.length > 0) {
      setParties((prev) =>
        prev.concat([
          {
            ...newParty,
            acronym: newParty.acronym.toUpperCase(),
            name: newParty.name
              .toLowerCase()
              .replace(/\b\w/g, (s) => s.toUpperCase()),
          },
        ])
      );
      setNewParty({ name: "", acronym: "" });
    }
  }
}

// Add the new party to the table
function AddCandidate() {
  // Check if the data given is valid

  if (newCandidate.name !== "" && newCandidate.party !== "") {
    // check if there is another candidate with thesame party
    const filtered = candidates.filter((candidate) => {
      return candidate.party.toLowerCase() === newCandidate.party.toLowerCase();
    });
    if (filtered.length > 0) {
      return;
    }

    // Check for three letters of the acronym
    setCandidates((prev) =>
      prev.concat([
        {
          ...newCandidate,
          name: newCandidate.name
            .toLowerCase()
            .replace(/\b\w/g, (s) => s.toUpperCase()),
        },
      ])
    );
    setNewCandidate({
      name: "",
      party: "",
      role: "",
      votes: 0,
    });
  }
}

// Function that get the unselected parties
function getUnusedParties() {
  // const filtered = candidates.filter((candidate) => {
  //   return candidate.party.toLowerCase() === newCandidate.party.toLowerCase();
  // });
  const usedParties = candidates.map((candidate) => candidate.party);
  const unusedParties = parties.filter(
    (party) => !usedParties.includes(party.acronym)
  );
  return unusedParties;
}

// Update the value of the dropdown
function updateDropDown(e) {
  setTest(e.target.value);
  let c = newCandidate;
  c.party = e.target.value;
  setNewCandidate(c);
}

// for test
const [test, setTest] = useState("E");

const secText = styled.h5`
    text-align: center;
`;

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

// The main create vote Function
function createVote() {
  console.log("creating vote");
  console.log(newVote);
  // Check if the name is valid
  if (newVote.name === "") {
    console.log("Name cannot be Empty");
    return;
  }

  // Validate desc
  if (newVote.desc === "") {
    console.log("Description cannot be Empty");
    return;
  }

  // Validate role
  if (newVote.role === "") {
    console.log("Role cannot be Empty");
    return;
  }

  // Validate start and end date and time
  if (newVote.openTime !== "" && newVote.closeTime !== "") {
    if (Date.parse(newVote.openTime) >= Date.parse(newVote.closeTime)) {
      console.log("Opening time must be earlier than the close time");
      return;
    }
  }

  //   console.log("this", candidates);
  // Set the roles of the candidates
  const newCandidates = candidates.map((candidate) => ({
    ...candidate,
    role: newVote.role,
  }));
  //   console.log(newCandidates);

  const tempVote = newVote;

  // Set the curresponding values of the obj
  tempVote.creator = accountId;
  tempVote.opened =
    newVote.closeTime !== ""
      ? Date.parse(newVote.openTime) <= Date.parse(getDateTime()) &&
        Date.parse(newVote.closeTime) > Date.parse(getDateTime())
      : Date.parse(newVote.openTime) <= Date.parse(getDateTime());
  tempVote.createdOn = getDateTime();
  tempVote.candidates = newCandidates;
  tempVote.parties = parties;
  tempVote.passcode = hash(newVote.passcode);
  tempVote.id = allVotes.length;

  //   console.log("That", tempVote);

  // Upload the data to socialDb
  Social.set({ votes: allVotes.concat([tempVote]) });

  setNewVote({
    name: "",
    desc: "",
    role: "",
    creator: "",
    openTime: getDateTime(),
    closeTime: "",
    createdOn: "",
    limit: "",
    opened: true,
    passcode: "",
    candidates: [],
    parties: [],
    voters: [],
  });
}

return (
  <>
    {accountId ? (
      <Widget
        src="abnakore.near/widget/Wrapper"
        props={{
          body: (
            <div className="main-body">
              <div className="body-contents">
                <h1>Create</h1>
                <div className="form">
                  <Widget
                    src="abnakore.near/widget/Input.jsx"
                    props={{
                      type: "text",
                      placeholder: "Name / Title",
                      required: true,
                      item: "name",
                      items: newVote,
                      setItem: setNewVote,
                      otherAttributes: {
                        value: newVote.name,
                      },
                    }}
                  />

                  <Widget
                    src="abnakore.near/widget/Input.jsx"
                    props={{
                      type: "text",
                      placeholder: "Description",
                      required: true,
                      kind: "textarea",
                      item: "desc",
                      items: newVote,
                      setItem: setNewVote,
                      otherAttributes: {
                        value: newVote.desc,
                      },
                    }}
                  />
                  <hr />

                  <secText>Parties Section</secText>
                  <Widget
                    src="abnakore.near/widget/Table"
                    props={{
                      headings: ["S/N", "Party Name", "Acronym"],
                      data: parties.map((p, i) =>
                        [i + 1].concat(Object.values(p).splice(0, 2))
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
                    <button onClick={AddParty}>Add</button>
                  </div>
                  <hr />

                  <secText>Candidates Section</secText>
                  <Widget
                    src="abnakore.near/widget/Table"
                    props={{
                      headings: ["S/N", "Candidate's Name", "Party"],
                      data: candidates.map((p, i) =>
                        [i + 1].concat(Object.values(p).splice(0, 2))
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
                          placeholder: "Candidate's Name",
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
                            {party.name}({party.acronym})
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick={AddCandidate}>Add</button>
                  </div>

                  <Widget
                    src="abnakore.near/widget/Input.jsx"
                    props={{
                      type: "text",
                      placeholder: "Role",
                      required: true,
                      item: "role",
                      items: newVote,
                      setItem: setNewVote,
                      otherAttributes: {
                        value: newVote.role,
                      },
                    }}
                  />

                  <Widget
                    src="abnakore.near/widget/Input.jsx"
                    props={{
                      type: "password",
                      placeholder: "Passcode",
                      required: false,
                      item: "passcode",
                      items: newVote,
                      setItem: setNewVote,
                      otherAttributes: {
                        value: newVote.passcode,
                      },
                    }}
                  />
                  <Widget
                    src="abnakore.near/widget/Input.jsx"
                    props={{
                      type: "number",
                      placeholder: "Max number of voters",
                      required: false,
                      item: "limit",
                      items: newVote,
                      setItem: setNewVote,
                      otherAttributes: {
                        value: newVote.limit,
                      },
                    }}
                  />
                  <div className="flex">
                    <Widget
                      src="abnakore.near/widget/Input.jsx"
                      props={{
                        type: "datetime-local",
                        placeholder: "Open on",
                        required: true,
                        item: "openTime",
                        items: newVote,
                        setItem: setNewVote,
                        otherAttributes: {
                          min: getDateTime(),
                          value: newVote.openTime,
                          onChange: (e) => {
                            if (e.target.value !== "") {
                              setNewVote({
                                ...newVote,
                                openTime: e.target.value,
                              });
                            }
                          },
                        },
                        styles: {
                          width: "120%",
                        },
                      }}
                    />
                    <Widget
                      src="abnakore.near/widget/Input.jsx"
                      props={{
                        type: "datetime-local",
                        placeholder: "Close on",
                        required: true,
                        item: "closeTime",
                        items: newVote,
                        setItem: setNewVote,
                        otherAttributes: {
                          min: newVote.openTime,
                          value: newVote.closeTime,
                          onChange: (e) => {
                            setNewVote({
                              ...newVote,
                              closeTime: e.target.value,
                            });
                          },
                        },
                        styles: {
                          width: "100%",
                        },
                      }}
                    />
                  </div>
                  <button onClick={createVote}>Create</button>
                </div>
              </div>
            </div>
          ),
        }}
      />
    ) : (
      <Widget src="abnakore.near/widget/SignIn.jsx" props={props} />
    )}
  </>
);

// // Get accountId
// const accountId = context.accountId;

// return (
//   <>
//     {accountId ? (
//       <Widget
//         src="abnakore.near/widget/Wrapper"
//         props={{
//           body: (
//             <div className="main-body">
//               <div className="body-contents">
//                 <h1>____</h1>
//               </div>
//             </div>
//           ),
//         }}
//       />
//     ) : (
//       <Widget src="abnakore.near/widget/SignIn.jsx" props={props} />
//     )}
//   </>
// );
