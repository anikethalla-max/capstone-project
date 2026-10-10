import Header from './Header';
import { Outlet } from 'react-router-dom';
function RootLayout() {
  return <div className="app-shell">
      <Header />
      <main id="main-content" className="container page-container"><Outlet /></main>
      <footer className="site-footer"><span className="footer-brand">BlogApp<span>.</span></span><p>A home for ideas worth sharing.</p><span>Read. Write. Connect.</span></footer>
    </div>;
}
export default RootLayout;
