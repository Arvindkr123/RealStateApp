import { useState } from "react";
import "./updateProfile.scss";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "./../../context/Auth.Context";
import apiRequest from "../../lib/apiRequest";
function UpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, updateUser } = useAuthContext();
  console.log(currentUser);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    console.log(username, email, password);
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
      });
      updateUser(res.data);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={currentUser.email}
          />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit" disabled={isLoading}>
            Update
          </button>
          {error && <span>{error}</span>}
        </form>
      </div>

      <div className="imgContainer">
        <img src="/favicon.png" alt="" />
      </div>
    </div>
  );
}

export default UpdateProfile;
