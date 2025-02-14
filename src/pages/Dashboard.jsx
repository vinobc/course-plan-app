import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();
  const [coursePlans, setCoursePlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoursePlans = async () => {
      try {
        const q = query(
          collection(db, "coursePlans"),
          where("userId", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const plans = [];
        querySnapshot.forEach((doc) => {
          plans.push({ id: doc.id, ...doc.data() });
        });

        setCoursePlans(plans);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course plans:", error);
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      fetchCoursePlans();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Course Plan Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{auth.currentUser?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => navigate("/create-plan")}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Create New Course Plan
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Course Plans</h2>
          {loading ? (
            <p>Loading...</p>
          ) : coursePlans.length > 0 ? (
            <div className="space-y-4">
              {coursePlans.map((plan) => (
                <div
                  key={plan.id}
                  className="border p-4 rounded hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{plan.courseTitle}</h3>
                      <p className="text-gray-600">
                        Course Code: {plan.courseCode}
                      </p>
                      <p className="text-gray-600">Semester: {plan.semester}</p>
                      <p className="text-gray-600">Slot: {plan.slot}</p>
                      <p className="text-sm text-gray-500">
                        Created on:{" "}
                        {new Date(plan.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/edit-plan/${plan.id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => navigate(`/view-plan/${plan.id}`)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No course plans yet. Create one to get started!
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
