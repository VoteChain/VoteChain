import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaUser,
  FaCheck,
  FaClock,
  FaPercentage,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./result.css";
import Aside from "../../components/Aside/Aside";

// Mock data - replace with your actual data source
const mockResults = {
  vote1: {
    id: "vote1",
    name: "2023 Community DAO Election",
    desc: "Elect representatives for the next governance period",
    creator: "DAO Committee",
    closedOn: "2023-11-15T23:59:59",
    totalVoters: 1248,
    totalVotes: 1156,
    participationRate: 92.6,
    candidates: [
      {
        id: "c1",
        name: "Alex Johnson",
        party: "Progress Party",
        votes: 542,
        percentage: 46.9,
      },
      {
        id: "c2",
        name: "Sam Wilson",
        party: "Unity Alliance",
        votes: 478,
        percentage: 41.3,
      },
      {
        id: "c3",
        name: "Taylor Smith",
        party: "Independent",
        votes: 136,
        percentage: 11.8,
      },
    ],
    parties: [
      {
        id: "p1",
        name: "Progress Party",
        votes: 542,
        percentage: 46.9,
        seats: 5,
      },
      {
        id: "p2",
        name: "Unity Alliance",
        votes: 478,
        percentage: 41.3,
        seats: 4,
      },
      { id: "p3", name: "Independent", votes: 136, percentage: 11.8, seats: 1 },
    ],
    winners: ["c1", "p1"],
  },
};

const ResultsPage = () => {
  const { voteId } = useParams();
  const [viewMode, setViewMode] = useState("candidates");
  const results = mockResults[voteId] || mockResults.vote1; // Fallback to sample data

  // Prepare chart data
  const chartData =
    viewMode === "candidates"
      ? results.candidates.map((c) => ({
          name: c.name,
          votes: c.votes,
          percentage: c.percentage,
          party: c.party,
        }))
      : results.parties.map((p) => ({
          name: p.name,
          votes: p.votes,
          percentage: p.percentage,
          seats: p.seats,
        }));

  return (
    <div className="results-page">
      <Aside
        objs={[
          {
            name: "Vote page",
            link: `/vote/${voteId}`,
          },
          {
            name: "Result",
            link: `/vote/${voteId}/result`,
          },
        ]}
        active={`/vote/${voteId}/result`}
        showLogo={false}
      />
      <div className="results-header">
        <h1>
          <FaChartBar /> {results.name} Results
        </h1>
        <p className="description">{results.desc}</p>
        <div className="meta-info">
          <span className="meta-item">
            <FaUsers /> Total Voters: {results.totalVoters}
          </span>
          <span className="meta-item">
            <FaCheck /> Votes Cast: {results.totalVotes}
          </span>
          <span className="meta-item">
            <FaPercentage /> Participation: {results.participationRate}%
          </span>
          <span className="meta-item">
            <FaClock /> Closed:{" "}
            {new Date(results.closedOn).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === "candidates" ? "active" : ""}`}
          onClick={() => setViewMode("candidates")}
        >
          <FaUser /> By Candidate
        </button>
        <button
          className={`toggle-btn ${viewMode === "parties" ? "active" : ""}`}
          onClick={() => setViewMode("parties")}
        >
          <FaUsers /> By Party
        </button>
      </div>

      <div className="results-container">
        <div className="chart-container">
          <h2>
            {viewMode === "candidates" ? "Candidate Results" : "Party Results"}
          </h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "percentage")
                      return [`${value}%`, "Percentage"];
                    return [value, name === "votes" ? "Votes" : "Seats"];
                  }}
                  labelFormatter={(label) => {
                    const item = chartData.find((d) => d.name === label);
                    return `${label}${item?.party ? ` (${item.party})` : ""}`;
                  }}
                />
                <Legend />
                <Bar
                  dataKey="votes"
                  fill={viewMode === "candidates" ? "#8884d8" : "#82ca9d"}
                  name="Votes"
                />
                {viewMode === "parties" && (
                  <Bar dataKey="seats" fill="#ffc658" name="Seats" />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="detailed-results">
          <h2>Detailed Breakdown</h2>
          <div className="results-table">
            <div className="table-header">
              <span>Name</span>
              <span>{viewMode === "candidates" ? "Party" : "Seats"}</span>
              <span>Votes</span>
              <span>Percentage</span>
              <span>Status</span>
            </div>
            {(viewMode === "candidates"
              ? results.candidates
              : results.parties
            ).map((item) => (
              <div
                key={item.id}
                className={`table-row ${
                  results.winners.includes(item.id) ? "winner" : ""
                }`}
              >
                <span>{item.name}</span>
                <span>
                  {viewMode === "candidates" ? item.party : item.seats}
                </span>
                <span>{item.votes.toLocaleString()}</span>
                <span>{item.percentage}%</span>
                <span>
                  {results.winners.includes(item.id) ? (
                    <span className="winner-badge">Winner</span>
                  ) : (
                    <span className="runner-up">Runner-up</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="analysis-section">
        <h2>Analysis</h2>
        <div className="analysis-cards">
          <div className="analysis-card">
            <h3>Turnout Rate</h3>
            <div className="stat-value">{results.participationRate}%</div>
            <p>of eligible voters participated</p>
          </div>
          <div className="analysis-card">
            <h3>Leading {viewMode === "candidates" ? "Candidate" : "Party"}</h3>
            <div className="stat-value">
              {viewMode === "candidates"
                ? results.candidates[0].name
                : results.parties[0].name}
            </div>
            <p>
              with{" "}
              {viewMode === "candidates"
                ? results.candidates[0].percentage
                : results.parties[0].percentage}
              % of votes
            </p>
          </div>
          <div className="analysis-card">
            <h3>Margin</h3>
            <div className="stat-value">
              {viewMode === "candidates"
                ? (
                    results.candidates[0].percentage -
                    results.candidates[1].percentage
                  ).toFixed(1)
                : (
                    results.parties[0].percentage -
                    results.parties[1].percentage
                  ).toFixed(1)}
              %
            </div>
            <p>between top two contenders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
