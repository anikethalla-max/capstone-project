import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { FiArrowUpRight, FiBookOpen, FiEdit3, FiMessageCircle } from "react-icons/fi";
function Home() {
  const {
    currentUser
  } = useContext(UserContext);
  return <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A space for curious minds</p>
          <h1>Good ideas<br />deserve a <em>voice.</em></h1>
          <p className="hero-description">Discover a fresh perspective. Share something you know. Find your next great idea in a community of readers and writers.</p>
          <SignedOut><SignInButton mode="modal"><button className="btn btn-primary hero-cta">Start your story <FiArrowUpRight /></button></SignInButton></SignedOut>
          <SignedIn><Link className="btn btn-primary hero-cta" to={currentUser?.role === "AUTHOR" ? "/author-dashboard" : "/user-dashboard"}>Explore your workspace <FiArrowUpRight /></Link></SignedIn>
          <p className="hero-note">Read thoughtfully. Write freely.</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit" /><div className="paper paper-back" />
          <div className="paper paper-front"><span className="paper-label">THE NEXT CHAPTER</span><span className="paper-title">It starts<br />with an idea.</span><div className="paper-lines"><span /><span /><span /></div><div className="paper-signature">Make it yours. &#8599;</div></div>
          <div className="art-stamp">WORDS<br />CONNECT<br />US</div><span className="art-spark">&#10035;</span>
        </div>
      </section>
      <section className="discovery" aria-labelledby="discovery-title">
        <div className="section-heading"><p className="eyebrow">Made for discovery</p><h2 id="discovery-title">A little curiosity goes a long way.</h2></div>
        <div className="feature-grid">
          <div className="feature"><FiBookOpen /><h3>Find a new perspective</h3><p>Explore articles on programming, artificial intelligence, and databases.</p></div>
          <div className="feature"><FiEdit3 /><h3>Put your ideas into words</h3><p>Your knowledge has a place here. Create, publish, and shape your own articles.</p></div>
          <div className="feature"><FiMessageCircle /><h3>Keep the conversation going</h3><p>Leave a thoughtful comment and connect with the ideas that move you.</p></div>
        </div>
      </section>
    </div>;
}
export default Home;
