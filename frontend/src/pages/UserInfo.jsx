import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/Card";

function UserInfo() {
  const { user } = useContext(AuthContext);

  return (
    <Card>
      <div style={styles.container}>
        <h2 style={styles.heading}>User Information</h2>

        <UserInfoItem label="Username" value={user.username} />
        <UserInfoItem label="Email" value={user.email} />
        <UserInfoItem
          label="Registered On"
          value={new Date(user.createdAt).toLocaleDateString("en-GB")}
        />
      </div>
    </Card>
  );
}

function UserInfoItem({ label, value }) {
  return (
    <div style={styles.item}>
      <label style={styles.label}>{label}</label>
      <div style={styles.value}>{value}</div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "10px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  item: {
    marginBottom: "24px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "16px",
    paddingBottom: "4px",
    color: "#444",
    display: "block",
  },
  value: {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
};

export default UserInfo;
