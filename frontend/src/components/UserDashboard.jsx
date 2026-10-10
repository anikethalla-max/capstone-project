import { NavLink, Outlet } from "react-router-dom";
function UserDashboard() {
  return <div>
      <div className="dashboard-heading"><p className="eyebrow">Discover something new</p><h1>The reading room<span>.</span></h1><p>Fresh ideas and thoughtful perspectives, all in one place.</p></div>
      <ul className="dashboard-tabs list-unstyled"><li><NavLink to="all-articles" className="nav-link">All articles</NavLink></li></ul>
      <Outlet />
    </div>;
}
export default UserDashboard;
