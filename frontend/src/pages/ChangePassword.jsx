import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { toast } from "react-toastify";

function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword)
      newErrors.currentPassword = "Current password is required.";
    if (!newPassword) newErrors.newPassword = "New password is required.";
    else if (newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your new password.";
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setErrors({});
      setLoading(true);
      await axios.post("/auth/change-password", form);
      toast.success("Password changed successfully!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to change password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Change Password
        </h2>

        <InputField
          label="Current Password"
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="Enter your current password"
        />
        {errors.currentPassword && <ErrorText text={errors.currentPassword} />}

        <InputField
          label="New Password"
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="Enter your new password"
        />
        {errors.newPassword && <ErrorText text={errors.newPassword} />}

        <InputField
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your new password"
        />
        {errors.confirmPassword && <ErrorText text={errors.confirmPassword} />}

        <PrimaryButton type="submit" text="Change" loading={loading} />
      </form>
    </Card>
  );
}

function ErrorText({ text }) {
  return (
    <p
      style={{
        color: "red",
        fontSize: "0.9em",
        marginTop: "-10px",
        marginBottom: "10px",
      }}
    >
      {text}
    </p>
  );
}

export default ChangePassword;
