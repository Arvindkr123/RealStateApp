import { Link, useNavigate } from "react-router-dom";
import "./loginPage.scss";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { useAuthContext } from "../../context/Auth.Context";
function LoginPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const fromData = new FormData(e.target);
    const username = fromData.get("username");
    const password = fromData.get("password");
    try {
      const res = await apiRequest.post("/login", {
        username,
        password,
      });
      // console.log(res.data);
      updateUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="loginPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading} type="submit">
            Login
          </button>
          <span>Error</span>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default LoginPage;
