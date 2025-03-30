import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Enter a valid email address";
      }
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

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
      await axios.post("/auth/register", {
        username: form.username.trim(),
        email: form.email,
        password: form.password,
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      setErrors({
        general:
          err.response?.data?.msg || "Registration failed. Please try again.",
      });
      toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>

        <InputField
          label="Username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter a username"
        />
        {errors.username && <p style={styles.error}>{errors.username}</p>}

        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter a password"
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        {errors.general && <p style={styles.error}>{errors.general}</p>}

        <PrimaryButton text="Register" type="submit" loading={loading} />

        <p style={styles.footerText}>
          Already Registered? <a href="/login">Login</a>
        </p>
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
  footerText: {
    textAlign: "center",
    marginTop: "16px",
  },
};

export default Register;
