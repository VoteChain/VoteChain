// NotificationsPage.js
import { FaBell, FaCheck, FaVoteYea } from "react-icons/fa";
import "./notifications.css";
import { useState } from "react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "vote",
      title: "New vote created: Treasury Allocation Q4",
      time: "2 hours ago",
      read: false,
      link: "/vote/123",
    },
    {
      id: 2,
      type: "reminder",
      title: "Reminder: Community election closes in 24 hours",
      time: "1 day ago",
      read: true,
      link: "/vote/456",
    },
    {
      id: 2,
      type: "reminder",
      title: "Reminder: Community election closes in 24 hours",
      time: "1 day ago",
      read: true,
      link: "/vote/456",
    },
    {
      id: 1,
      type: "vote",
      title: "New vote created: Treasury Allocation Q4",
      time: "2 hours ago",
      read: false,
      link: "/vote/123",
    },
    {
      id: 2,
      type: "reminder",
      title: "Reminder: Community election closes in 24 hours",
      time: "1 day ago",
      read: true,
      link: "/vote/456",
    },
    {
      id: 1,
      type: "vote",
      title: "New vote created: Treasury Allocation Q4",
      time: "2 hours ago",
      read: false,
      link: "/vote/123",
    },
    {
      id: 2,
      type: "reminder",
      title: "Reminder: Community election closes in 24 hours",
      time: "1 day ago",
      read: true,
      link: "/vote/456",
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((notifs) => notifs.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="notifications-page">
      <div className="page-header">
        <FaBell className="header-icon" />
        <h1>Notifications</h1>
        <button onClick={markAllAsRead} className="mark-all-read">
          Mark all as read
        </button>
      </div>

      <div className="notification-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${notification.read ? "" : "unread"}`}
          >
            <div className="item-icon">
              {notification.type === "vote" ? <FaVoteYea /> : <FaCheck />}
            </div>
            <div className="item-content">
              <h3>{notification.title}</h3>
              <p className="time">{notification.time}</p>
            </div>
            {!notification.read && <span className="unread-dot"></span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
