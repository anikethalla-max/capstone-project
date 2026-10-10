import { SignedIn, SignedOut, SignInButton, UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
function Header() {
  const {
    isSignedIn,
    getToken
  } = useAuth();
  const {
    isLoaded
  } = useUser();
  const navigate = useNavigate();
  const {
    setCurrentUser
  } = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (!isSignedIn || !isLoaded || checked) return;
    const checkUserAndNavigate = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${API_URL}/user-api/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await res.json();
        if (data.firstLogin === true) {
          navigate("/role-selection");
          return;
        }
        const role = data.payload.role;
        setCurrentUser(data.payload);
        if (role === "USER") {
          navigate("/user-dashboard");
        } else {
          navigate("/author-dashboard");
        }
        setChecked(true);
      } catch (err) {
        console.error("Header auth check error:", err);
      }
    };
    checkUserAndNavigate();
  }, [isSignedIn, isLoaded, getToken, navigate, setCurrentUser, checked]);
  return <nav className="navbar site-header" aria-label="Main navigation"><a className="skip-link" href="#main-content">Skip to content</a>

      <a className="navbar-brand fw-bold" href="/">
        BlogApp<span className="brand-dot">.</span>
      </a>


      <div className="ms-auto header-actions">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-primary">Sign in <span aria-hidden="true">&#8599;</span></button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>;
}
export default Header;
