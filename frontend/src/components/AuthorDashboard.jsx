import { NavLink, Outlet } from "react-router-dom";
function AuthorDashboard() {
  return <div className="author-profile">
      <div className="dashboard-heading"><p className="eyebrow">Your creative workspace</p><h1>The writing room<span>.</span></h1><p>Shape your ideas, share your expertise, and make your mark.</p></div>
      <ul className="dashboard-tabs list-unstyled">
        <li><NavLink to="articles" className="nav-link">My articles</NavLink></li>
        <li><NavLink to="article" className="nav-link">Write an article &#8599;</NavLink></li>
      </ul>
      <Outlet />
    </div>;
}
export default AuthorDashboard;
