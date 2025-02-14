import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Import all pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePlan from "./pages/CreatePlan";
import ViewPlan from "./pages/ViewPlan";
import EditPlan from "./pages/EditPlan"; // Add this import

function App() {
  const [user, setUser] = useState(null); // Make sure this is defined
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-plan"
          element={user ? <CreatePlan /> : <Navigate to="/login" />}
        />
        <Route
          path="/view-plan/:id"
          element={user ? <ViewPlan /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-plan/:id"
          element={user ? <EditPlan /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
