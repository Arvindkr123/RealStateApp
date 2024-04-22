import { Link, useNavigate } from "react-router-dom";
import "./registerPage.scss";
import axios from "axios";
import { useState } from "react";
function RegisterPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const username = fromData.get("username");
    const email = fromData.get("email");
    const password = fromData.get("password");
    try {
      const res = await axios.post("http://localhost:4000/api/register", {
        username,
        email,
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
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button>Register</button>
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
