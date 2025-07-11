import React, { useState } from "react";
import {
  FaUser,
  FaEdit,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaCheck,
  FaTimes,
  FaVoteYea,
} from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import "./profile.css";
import { IoCreateOutline } from "react-icons/io5";
import Aside from "../../components/Aside/Aside";
import { useNear } from "../../contexts/NearContext";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  // Get some contexts
  const { accountId, account, isLoading, signOut } = useNear();

  // Use navigate
  const navigate = useNavigate();

  // Mock user data - replace with actual user data from your backend/context
  const [userData, setUserData] = useState({
    name: accountId,
    email: "alex.johnson@example.com",
    joinDate: "January 15, 2022",
    bio: "Community member and active voter in DAO governance",
    votesParticipated: 24,
    votesCreated: 5,
    walletAddress: account?.publicKey,
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userData.name,
    bio: userData.bio,
  });

  // Mock voting history - replace with actual data
  const votingHistory = [
    {
      id: 1,
      title: "DAO Treasury Allocation Q3",
      date: "2023-09-15",
      votedFor: "Development Team",
    },
    {
      id: 2,
      title: "Community Grant Recipients",
      date: "2023-08-22",
      votedFor: "Eco Project",
    },
    {
      id: 3,
      title: "Governance Parameter Update",
      date: "2023-07-10",
      votedFor: "Proposal B",
    },
    {
      id: 4,
      title: "Platform Feature Voting",
      date: "2023-06-05",
      votedFor: "Mobile App",
    },
  ];

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUserData((prev) => ({ ...prev, ...editForm }));
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
  };

  const handleCancel = () => {
    setEditForm({
      name: userData.name,
      bio: userData.bio,
    });
    setIsEditing(false);
  };

  const handleLogOut = async () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="profile-page">
      <Aside />
      <div className="profile-page-content">
        <div className="profile-header">
          <div className="avatar">
            {/* <FaUser /> */}
            <img
              src="https://i.near.social/magic/large/https://near.social/magic/img/account/default"
              alt=""
            />
          </div>
          <div className="user-info">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="edit-input"
              />
            ) : (
              <h1>{userData.name}</h1>
            )}
            <p className="join-date">Member since {userData.joinDate}</p>
            <div className="stats">
              <div className="stat-item">
                <FaVoteYea />
                <span>{userData.votesParticipated} votes</span>
              </div>
              <div className="stat-item">
                <IoCreateOutline />
                <span>{userData.votesCreated} created</span>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="save-btn">
                  <FaCheck /> Save
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  <FaTimes /> Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                <FaEdit /> Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser /> Profile
          </button>
          <button
            className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            <FaHistory /> Voting History
          </button>
          <button
            className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog /> Settings
          </button>
        </div>

        <div className="profile-content">
          {activeTab === "profile" && (
            <div className="profile-section">
              <h2>About</h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleEditChange}
                  className="edit-bio"
                  rows={4}
                />
              ) : (
                <p className="bio">{userData.bio}</p>
              )}

              <h2>Account Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <MdEmail /> Email
                  </div>
                  <div className="info-value">{userData.email}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <RiLockPasswordLine /> Wallet Address
                  </div>
                  <div className="info-value wallet-address">
                    {userData.walletAddress}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="history-section">
              <h2>Your Voting Activity</h2>
              <div className="history-stats">
                <div className="stat-card">
                  <h3>Total Votes</h3>
                  <div className="stat-value">{userData.votesParticipated}</div>
                </div>
                <div className="stat-card">
                  <h3>Votes Created</h3>
                  <div className="stat-value">{userData.votesCreated}</div>
                </div>
                <div className="stat-card">
                  <h3>Participation Rate</h3>
                  <div className="stat-value">
                    {Math.round(
                      (userData.votesParticipated /
                        (userData.votesParticipated + 10)) *
                        100
                    )}
                    %
                  </div>
                </div>
              </div>

              <h3>Recent Votes</h3>
              <div className="history-list">
                {votingHistory.map((vote) => (
                  <div key={vote.id} className="vote-item">
                    <div className="vote-info">
                      <h4>{vote.title}</h4>
                      <p className="vote-date">
                        {new Date(vote.date).toLocaleDateString()}
                      </p>
                      <p className="vote-choice">Voted for: {vote.votedFor}</p>
                    </div>
                    <button className="view-btn">View Results</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="settings-section">
              <h2>Account Settings</h2>

              <div className="settings-card">
                <h3>Change Password</h3>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>
                <button className="update-btn">Update Password</button>
              </div>

              <div className="settings-card danger-zone">
                <h3>Danger Zone</h3>
                <p>
                  These actions are irreversible. Please proceed with caution.
                </p>

                <div className="danger-actions">
                  <button className="delete-btn">
                    <FaTimes /> Delete Account
                  </button>
                  <button className="logout-btn" onClick={handleLogOut}>
                    <FaSignOutAlt /> Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
