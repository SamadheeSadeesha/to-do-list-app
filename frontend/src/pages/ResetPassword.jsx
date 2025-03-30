import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../utils/axiosInstance";
import Card from "../components/Card";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { toast } from "react-toastify";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long";
    }
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your new password.";
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await axios.post(`/auth/reset-password/${token}`, { newPassword });
      toast.success("Password has been reset successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Reset link expired or invalid");
    } finally {
      setLoading(false);
      setNewPassword("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Reset Your Password</h2>

        <InputField
          label="New Password"
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          disabled={loading}
        />
        {errors.newPassword && <p style={styles.error}>{errors.newPassword}</p>}

        <InputField
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          placeholder="Re-enter your new password"
        />
        {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}

        <PrimaryButton
          text="Reset Password"
          type="submit"
          disabled={loading}
          loading={loading}
        />
      </form>
    </Card>
  );
}

const styles = {
  form: {
    maxWidth: "400px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    fontSize: "0.9em",
    marginBottom: "10px",
  },
};

export default ResetPassword;
