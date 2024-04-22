import { Link, useNavigate } from "react-router-dom";
import "./loginPage.scss";
import { useState } from "react";
function LoginPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const username = fromData.get("username");
    const password = fromData.get("password");
    try {
      const res = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
    console.log(username, email, password);
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
          <button>Login</button>
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
