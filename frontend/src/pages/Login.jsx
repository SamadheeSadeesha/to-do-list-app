import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
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
      const res = await axios.post("/auth/login", form);
      if (res.data?.token) {
        login({ ...res.data.user, token: res.data.token });
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      setErrors({
        general: err.response?.data?.msg || "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        {errors.general && <p style={styles.error}>{errors.general}</p>}

        <p style={styles.linkRight}>
          <a href="/forgot-password">Forgot Password?</a>
        </p>

        <PrimaryButton text="Login" type="submit" loading={loading} />

        <p style={styles.linkCenter}>
          Not Registered? <a href="/register">Register</a>
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
  linkRight: {
    textAlign: "right",
    marginTop: "10px",
  },
  linkCenter: {
    textAlign: "center",
    marginTop: "16px",
  },
};

export default Login;
