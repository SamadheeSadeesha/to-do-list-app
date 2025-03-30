import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const buttonStyle = {
    background: "#fff",
    color: "#000",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
  };

  return (
    <header style={styles.header}>
      <div style={styles.greeting}>
        Hello, <strong>{user.username}</strong>!
      </div>
      <div style={styles.actions}>
        <button style={buttonStyle} onClick={() => navigate("/user-info")}>
          User Info
        </button>
        <button
          style={buttonStyle}
          onClick={() => navigate("/change-password")}
        >
          Change Password
        </button>
        <button style={buttonStyle} onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  greeting: {
    fontWeight: "bold",
    fontSize: "24px",
  },
  actions: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
};

export default Header;
