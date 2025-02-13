import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CoursePlanPDF from "../components/CoursePlanPDF";
import universityLogo from "../assets/university-logo.png";
import Layout from "../components/Layout";

function ViewPlan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const docRef = doc(db, "coursePlans", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPlan({ id: docSnap.id, ...docSnap.data() });
        } else {
          alert("No such course plan!");
          navigate("/dashboard");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course plan:", error);
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Plan not found
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Course Plan Details</h2>
              <div className="space-x-4">
                <PDFDownloadLink
                  document={
                    <CoursePlanPDF plan={plan} logoUrl={universityLogo} />
                  }
                  fileName={`${plan.courseCode}-${plan.semester}-course-plan.pdf`}
                >
                  {({ loading }) => (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      disabled={loading}
                    >
                      {loading ? "Generating PDF..." : "Download PDF"}
                    </button>
                  )}
                </PDFDownloadLink>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Course Title:</h3>
                <p>{plan.courseTitle}</p>
              </div>
              <div>
                <h3 className="font-semibold">Course Code:</h3>
                <p>{plan.courseCode}</p>
              </div>
              <div>
                <h3 className="font-semibold">Semester:</h3>
                <p>{plan.semester}</p>
              </div>
              <div>
                <h3 className="font-semibold">Course Type:</h3>
                <p>{plan.courseType}</p>
              </div>
              <div>
                <h3 className="font-semibold">Slot:</h3>
                <p>{plan.slot}</p>
              </div>
              <div>
                <h3 className="font-semibold">Faculty Name:</h3>
                <p>{plan.facultyName}</p>
              </div>
            </div>

            {/* Delivery Plan Table */}
            <h3 className="text-xl font-semibold mb-4">Course Delivery Plan</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 border">Session No.</th>
                    <th className="px-4 py-2 border">Day</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Start Time</th>
                    <th className="px-4 py-2 border">End Time</th>
                    <th className="px-4 py-2 border">Module No.</th>
                    <th className="px-4 py-2 border">Topic</th>
                    <th className="px-4 py-2 border">Assignment</th>
                    <th className="px-4 py-2 border">PPT Shared</th>
                    <th className="px-4 py-2 border">Additional Material</th>
                    <th className="px-4 py-2 border">Compensation Class</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.deliveryPlan.map((session, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">{session.sessionNo}</td>
                      <td className="px-4 py-2 border">{session.day}</td>
                      <td className="px-4 py-2 border">{session.date}</td>
                      <td className="px-4 py-2 border">{session.startTime}</td>
                      <td className="px-4 py-2 border">{session.endTime}</td>
                      <td className="px-4 py-2 border">{session.moduleNo}</td>
                      <td className="px-4 py-2 border">{session.topic}</td>
                      <td className="px-4 py-2 border">
                        {session.hasAssignment}
                      </td>
                      <td className="px-4 py-2 border">{session.pptShared}</td>
                      <td className="px-4 py-2 border">
                        {session.additionalMaterial}
                      </td>
                      <td className="px-4 py-2 border">
                        {session.compensationClass}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ViewPlan;
