import "./layout.scss";
import Navbar from "./../navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/Auth.Context";
const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

const RequireAuthLayout = () => {
  const { currentUser } = useAuthContext();

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
export { RequireAuthLayout };
export default Layout;
