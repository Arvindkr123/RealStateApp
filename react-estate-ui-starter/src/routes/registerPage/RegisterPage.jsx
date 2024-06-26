import { Link, useNavigate } from "react-router-dom";
import "./registerPage.scss";
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
function RegisterPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const fromData = new FormData(e.target);
    const username = fromData.get("username");
    const email = fromData.get("email");
    const password = fromData.get("password");
    try {
      const res = await apiRequest.post("/register", {
        username,
        email,
        password,
      });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
    console.log(username, email, password);
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit" disabled={isLoading}>
            Register
          </button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account ?</Link>
        </form>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default RegisterPage;
