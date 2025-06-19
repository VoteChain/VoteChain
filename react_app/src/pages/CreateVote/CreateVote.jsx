import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaCalendarAlt,
  FaLock,
  FaLockOpen,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./create-vote.css";
import Aside from "../../components/Aside/Aside";

const CreateVotePage = () => {
  // Use navigate
  const navigate = useNavigate();

  // Using States
  // Handle de form steps
  const [step, setStep] = useState(1);

  // Handle the vote type (candidate_only or candidate_with_party)
  const [voteType, setVoteType] = useState("candidate");

  // Form data for vote
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPrivate: false,
    passcode: "",
    startDate: "",
    endDate: "",
    candidates: [{ id: 1, name: "", party: "" }],
    parties: [{ id: 1, name: "" }],
    votingMethod: "single-choice",
    eligibility: "all-members",
  });

  // Functions
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle candidate change (Update the candidate data)
  const handleCandidateChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      candidates: prev.candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, [field]: value } : candidate
      ),
    }));
  };

  // Handle party change (Update the party data)
  const handlePartyChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      parties: prev.parties.map((party) =>
        party.id === id ? { ...party, [field]: value } : party
      ),
    }));
  };

  // Add candidate to the candidates
  const addCandidate = () => {
    setFormData((prev) => ({
      ...prev,
      candidates: [...prev.candidates, { id: Date.now(), name: "", party: "" }],
    }));
  };

  // Add Party
  const addParty = () => {
    setFormData((prev) => ({
      ...prev,
      parties: [...prev.parties, { id: Date.now(), name: "" }],
    }));
  };

  // Remove Candidate
  const removeCandidate = (id) => {
    if (formData.candidates.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      candidates: prev.candidates.filter((candidate) => candidate.id !== id),
    }));
  };

  // Remove party
  const removeParty = (id) => {
    if (formData.parties.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      parties: prev.parties.filter((party) => party.id !== id),
    }));
  };

  // Submit formData and save it to blockchain
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Creating vote:", formData);
    navigate("/votes"); // Redirect to votes page after creation
  };

  // Handle steps change (Validate step's data before proceding)
  const nextStep = () => {
    // Basic validation before proceeding
    if (step === 1 && (!formData.title || !formData.description)) {
      alert("Please fill in all required fields");
      return;
    }
    setStep(step + 1);
  };

  // Back to previous state
  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="create-vote-page">
      <Aside />
      <div className="create-vote-content">
        <div className="create-header">
          <h1>
            <FaPlus /> Create New Vote
          </h1>
          <p>Set up a new voting process for your community</p>
        </div>

        <div className="progress-steps">
          <div className={`step ${step >= 1 ? "active" : ""}`}>
            <span>1</span>
            <p>Basic Info</p>
          </div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>
            <span>2</span>
            {/* !!! change it with a constant */}
            <p>{voteType === "candidate" ? "Candidates" : "Parties"}</p>
          </div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>
            <span>3</span>
            <p>Settings</p>
          </div>
          <div className={`step ${step >= 4 ? "active" : ""}`}>
            <span>4</span>
            <p>Review</p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {step === 1 && (
            <div className="form-step">
              <h2>Basic Information</h2>
              <div className="form-group">
                <label htmlFor="title">Vote Title*</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., 2023 Community Election"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description*</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the purpose and scope of this vote..."
                  required
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>Vote Type</label>
                <div className="toggle-options">
                  <button
                    type="button"
                    className={`option-btn ${
                      voteType === "candidate" ? "active" : ""
                    }`}
                    onClick={() => setVoteType("candidate")}
                  >
                    <FaUser /> By Candidate
                  </button>
                  <button
                    type="button"
                    className={`option-btn ${
                      voteType === "party" ? "active" : ""
                    }`}
                    onClick={() => setVoteType("party")}
                  >
                    <FaUsers /> By Party
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h2>
                {voteType === "candidate"
                  ? "Candidate Information"
                  : "Party Information"}
              </h2>

              {voteType === "candidate" ? (
                <>
                  {formData.candidates.map((candidate) => (
                    <div key={candidate.id} className="candidate-row">
                      <div className="form-group">
                        <label>Candidate Name*</label>
                        <input
                          type="text"
                          value={candidate.name}
                          onChange={(e) =>
                            handleCandidateChange(
                              candidate.id,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Full name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Party/Group (Optional)</label>
                        <input
                          type="text"
                          value={candidate.party}
                          onChange={(e) =>
                            handleCandidateChange(
                              candidate.id,
                              "party",
                              e.target.value
                            )
                          }
                          placeholder="Political party or group"
                        />
                      </div>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeCandidate(candidate.id)}
                        disabled={formData.candidates.length <= 1}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addCandidate}
                  >
                    <FaPlus /> Add Candidate
                  </button>
                </>
              ) : (
                <>
                  {formData.parties.map((party) => (
                    <div key={party.id} className="party-row">
                      <div className="form-group">
                        <label>Party Name*</label>
                        <input
                          type="text"
                          value={party.name}
                          onChange={(e) =>
                            handlePartyChange(party.id, "name", e.target.value)
                          }
                          placeholder="Party name"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeParty(party.id)}
                        disabled={formData.parties.length <= 1}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={addParty}>
                    <FaPlus /> Add Party
                  </button>
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h2>Vote Settings</h2>

              <div className="form-group">
                <label htmlFor="votingMethod">Voting Method*</label>
                <select
                  id="votingMethod"
                  name="votingMethod"
                  value={formData.votingMethod}
                  onChange={handleInputChange}
                  required
                >
                  <option value="single-choice">Single Choice</option>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="ranked-choice">Ranked Choice</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="eligibility">Eligibility*</label>
                <select
                  id="eligibility"
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  required
                >
                  <option value="all-members">All Members</option>
                  <option value="verified-members">
                    Verified Members Only
                  </option>
                  <option value="token-holders">Token Holders</option>
                  <option value="custom">Custom Group</option>
                </select>
              </div>

              <div className="form-group">
                <label>Vote Timeline*</label>
                <div className="date-inputs">
                  <div className="date-group">
                    <FaCalendarAlt />
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                    <span>Start Date</span>
                  </div>
                  <div className="date-group">
                    <FaCalendarAlt />
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      min={formData.startDate}
                    />
                    <span>End Date</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isPrivate"
                    checked={formData.isPrivate}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  Private Vote{" "}
                  {formData.isPrivate ? <FaLock /> : <FaLockOpen />}
                </label>
                {formData.isPrivate && (
                  <input
                    type="password"
                    name="passcode"
                    value={formData.passcode}
                    onChange={handleInputChange}
                    placeholder="Set a passcode for this vote"
                    required={formData.isPrivate}
                    className="passcode-input"
                  />
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step review-step">
              <h2>Review Your Vote</h2>

              <div className="review-section">
                <h3>Basic Information</h3>
                <div className="review-item">
                  <strong>Title:</strong> {formData.title}
                </div>
                <div className="review-item">
                  <strong>Description:</strong> {formData.description}
                </div>
                <div className="review-item">
                  <strong>Type:</strong>{" "}
                  {voteType === "candidate" ? "Candidate-based" : "Party-based"}
                </div>
              </div>

              <div className="review-section">
                <h3>{voteType === "candidate" ? "Candidates" : "Parties"}</h3>
                {voteType === "candidate" ? (
                  <ul className="review-list">
                    {formData.candidates.map((candidate) => (
                      <li key={candidate.id}>
                        {candidate.name}{" "}
                        {candidate.party && `(${candidate.party})`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="review-list">
                    {formData.parties.map((party) => (
                      <li key={party.id}>{party.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="review-section">
                <h3>Settings</h3>
                <div className="review-item">
                  <strong>Voting Method:</strong>{" "}
                  {formData.votingMethod.replace("-", " ")}
                </div>
                <div className="review-item">
                  <strong>Eligibility:</strong>{" "}
                  {formData.eligibility.replace("-", " ")}
                </div>
                <div className="review-item">
                  <strong>Timeline:</strong>{" "}
                  {formData.startDate
                    ? new Date(formData.startDate).toLocaleString()
                    : "Not set"}{" "}
                  to{" "}
                  {formData.endDate
                    ? new Date(formData.endDate).toLocaleString()
                    : "Not set"}
                </div>
                <div className="review-item">
                  <strong>Visibility:</strong>{" "}
                  {formData.isPrivate ? "Private" : "Public"}
                </div>
              </div>
            </div>
          )}

          <div className="form-navigation">
            {step > 1 && (
              <button
                type="button"
                className="nav-btn prev-btn"
                onClick={prevStep}
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                className="nav-btn next-btn"
                onClick={nextStep}
              >
                Continue
              </button>
            ) : (
              <button type="submit" className="nav-btn submit-btn">
                Create Vote
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVotePage;
