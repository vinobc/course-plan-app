import PropTypes from "prop-types";
import universityLogo from "../assets/university-logo.png";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Logo */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <img
            src={universityLogo}
            alt="University Logo"
            className="h-16 mx-auto"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
