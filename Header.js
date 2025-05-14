
import { useNavigate, Link } from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux";
 import { logout } from "../Features/UserSlice";
 

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  const handleLogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/Login");
  };

  const profileImageURL = user?.profilePic
    ? `http://localhost:3001/uploads/${user.profilePic}`
    : null;

  return (
    <header className="header-bar">
      <div className="header-left">
        {user?.email && (
          <div className="profile-info">
            {profileImageURL && (
              <Link to="/profile">
                <img
                   src={profileImageURL}
                   alt="Profile"
                   className="profile-pic"
                   style={{ cursor: "pointer" }}
                   title="Update Profile"
                 />
              </Link>
            )}
            <div>
              <strong>Profile:</strong> {user.name || "Anonymous"}
              <br />
              <small>{user.email}</small>
            </div>
          </div>
        )}
      </div>

      <nav className="header-nav">
      <Link to="/" className="header-link">HOME</Link>


        {user?.email ? (
          <span onClick={handleLogout} className="header-link clickable">Logout</span>
        ) : (
          <Link to="/SelectUser" className="header-link">Log in</Link>
        )}
      </nav>
    </header>
  );
};
export default Header;
