import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function CreatePlan() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    semester: "",
    courseCode: "",
    courseTitle: "",
    courseVersion: "",
    courseType: "",
    tpc: "",
    sessionsNeeded: "",
    slot: "",
    classroom: "",
    sessionsAvailable: "",
    facultyName: "",
    facultySchool: "",
    isOpenNotes: false,
    isPBL: false,
    specialRequirements: "",
  });

  const courseTypes = ["Theory+Lab", "Theory Only", "Lab Only"];
  const slots = [
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
    "D1",
    "D2",
    "E1",
    "E2",
    "F1",
    "F2",
    "G1",
    "G2",
    "A1+TA1",
    "A2+TA2",
    "B1+TB1",
    "B2+TB2",
    "C1+TC1",
    "C2+TC2",
    ...Array.from({ length: 20 }, (_, i) => `L${2 * i + 1}+L${2 * i + 2}`),
  ];

  const [deliveryPlan, setDeliveryPlan] = useState([]);
  const [showPlanTable, setShowPlanTable] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (name === "slots" && type === "select-multiple") {
      const selectedSlots = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({
        ...prev,
        slots: selectedSlots,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const generateDeliveryPlan = () => {
    if (!formData.sessionsAvailable || formData.sessionsAvailable <= 0) {
      alert("Please enter the number of sessions available first");
      return;
    }

    const newPlan = Array(parseInt(formData.sessionsAvailable))
      .fill()
      .map((_, index) => ({
        sessionNo: index + 1,
        day: "",
        date: "",
        startTime: "",
        endTime: "",
        time: "",
        moduleNo: "",
        topic: "",
        hasAssignment: "No",
        pptShared: "No",
        additionalMaterial: "No",
        compensationClass: "",
      }));

    setDeliveryPlan(newPlan);
    setShowPlanTable(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!deliveryPlan.length) {
      alert("Please generate and fill the delivery plan table first");
      return;
    }

    // Validate delivery plan table rows
    const requiredTableFields = [
      "day",
      "date",
      "startTime",
      "endTime",
      "topic",
    ];
    const emptyRows = deliveryPlan.filter((row) =>
      requiredTableFields.some(
        (field) => !row[field] || row[field].trim() === ""
      )
    );

    if (emptyRows.length > 0) {
      alert(
        `Please fill in all required fields in the delivery plan table: Day, Date, Time, and Topic are mandatory for each row`
      );
      return;
    }

    // Check if required fields are filled
    const requiredFields = [
      "semester",
      "courseCode",
      "courseTitle",
      "courseType",
      "slot",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      if (!auth.currentUser) {
        alert("You must be logged in to create a course plan");
        return;
      }

      const docData = {
        ...formData,
        deliveryPlan,
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
        userEmail: auth.currentUser.email,
      };

      console.log("Attempting to save:", docData);
      const docRef = await addDoc(collection(db, "coursePlans"), docData);
      console.log("Document written with ID: ", docRef.id);
      alert("Course plan created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating course plan:", error);
      alert(
        `Error creating course plan: ${error.message}\nPlease check the console for more details.`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Create Course Plan</h2>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back to Dashboard
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Semester
                </label>
                <input
                  type="text"
                  name="semester"
                  placeholder="e.g. Winter 2024-25"
                  value={formData.semester}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Code
                  <span className="text-xs text-red-500 ml-1">
                    Get these details ONLY from Academics Office
                  </span>
                </label>
                <input
                  type="text"
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Type
                </label>
                <select
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                >
                  <option value="">Select Course Type</option>
                  {courseTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Slot
                  <span className="text-xs text-red-500 ml-1">
                    Get these details from School offering this course
                  </span>
                </label>
                <select
                  name="slot"
                  value={formData.slot}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                >
                  <option value="">Select Slot</option>
                  {slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Title
                  <span className="text-xs text-red-500 ml-1">
                    Get these details ONLY from Academics Office
                  </span>
                </label>
                <input
                  type="text"
                  name="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Version
                  <span className="text-xs text-red-500 ml-1">
                    Get these details ONLY from Academics Office
                  </span>
                </label>
                <input
                  type="text"
                  name="courseVersion"
                  value={formData.courseVersion}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  T-P-C
                  <span className="text-xs text-red-500 ml-1">
                    Get these details ONLY from Academics Office
                  </span>
                </label>
                <input
                  type="text"
                  name="tpc"
                  value={formData.tpc}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  No. of Sessions needed to complete syllabus
                  <span className="text-xs text-red-500 ml-1">
                    Get these details ONLY from Academics Office
                  </span>
                </label>
                <input
                  type="number"
                  name="sessionsNeeded"
                  value={formData.sessionsNeeded}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Classroom
                  <span className="text-xs text-red-500 ml-1">
                    Get these details from School offering this course
                  </span>
                </label>
                <input
                  type="text"
                  name="classroom"
                  value={formData.classroom}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  No. of Sessions available to complete syllabus
                  <span className="text-xs text-red-500 ml-1">
                    Get these details from School offering this course
                  </span>
                </label>
                <input
                  type="number"
                  name="sessionsAvailable"
                  value={formData.sessionsAvailable}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>

            {/* Faculty Details */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Faculty Name
                </label>
                <input
                  type="text"
                  name="facultyName"
                  value={formData.facultyName}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Faculty School
                </label>
                <input
                  type="text"
                  name="facultySchool"
                  value={formData.facultySchool}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>

            {/* Course Mode */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isOpenNotes"
                  checked={formData.isOpenNotes}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label className="text-sm font-medium text-gray-700">
                  Is the Course under Open Class Notes Exam mode? (Refer the
                  Syllabus for this course)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isPBL"
                  checked={formData.isPBL}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label className="text-sm font-medium text-gray-700">
                  Is the Course under Project Based Learning (PBL) mode? (Refer
                  the Syllabus for this course)
                </label>
              </div>
            </div>

            {/* Special Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                List any special requirements (like tools/ software, etc.)
                needed
              </label>
              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
            </div>

            {/* Course Delivery Plan Table */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Course Delivery Plan</h3>
                <button
                  type="button"
                  onClick={generateDeliveryPlan}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Generate Plan Table
                </button>
              </div>

              {showPlanTable && (
                <div className="overflow-x-auto">
                  <table className="min-w-full border">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 border">Class/Session No.</th>
                        <th className="px-4 py-2 border">Day</th>
                        <th className="px-4 py-2 border">Date of Session</th>
                        <th className="px-4 py-2 border">Start Time</th>
                        <th className="px-4 py-2 border">End Time</th>
                        <th className="px-4 py-2 border">Module No.</th>
                        <th className="px-4 py-2 border">Topic</th>
                        <th className="px-4 py-2 border">Assignment</th>
                        <th className="px-4 py-2 border">PPT Shared</th>
                        <th className="px-4 py-2 border">
                          Additional Material
                        </th>
                        <th className="px-4 py-2 border">Compensation Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryPlan.map((session, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 border">
                            {session.sessionNo}
                          </td>
                          <td
                            className="px-4 py-2 border"
                            style={{ minWidth: "120px" }}
                          >
                            <input
                              type="text"
                              className="w-full p-1 border rounded"
                              placeholder="e.g., Monday"
                              value={session.day}
                              onChange={(e) => {
                                const newPlan = [...deliveryPlan];
                                newPlan[index].day = e.target.value;
                                setDeliveryPlan(newPlan);
                              }}
                            />
                          </td>
                          <td className="px-4 py-2 border">
                            <input
                              type="date"
                              className="w-full p-1 border rounded"
                              value={session.date}
                              onChange={(e) => {
                                const newPlan = [...deliveryPlan];
                                newPlan[index].date = e.target.value;
                                setDeliveryPlan(newPlan);
                              }}
                            />
                          </td>
                          <td className="px-4 py-2 border">
                            <input
                              type="time"
                              className="w-full p-1 border rounded"
                              value={session.startTime}
                              onChange={(e) => {
                                const newPlan = [...deliveryPlan];
                                newPlan[index].startTime = e.target.value;
                                setDeliveryPlan(newPlan);
                              }}
                            />
                          </td>
                          <td className="px-4 py-2 border">
                            <input
                              type="time"
                              className="w-full p-1 border rounded"
                              value={session.endTime}
                              onChange={(e) => {
                                const newPlan = [...deliveryPlan];
                                newPlan[index].endTime = e.target.value;
                                setDeliveryPlan(newPlan);
                              }}
                            />
                          </td>
                          <td className="px-4 py-2 border">
                            <input
                              type="text"
                              className="w-full p-1 border rounded"
                              value={session.moduleNo}
                              onChange={(e) => {
                                const newPlan = [...deliveryPlan];
                                newPlan[index].moduleNo = e.target.value;
                                setDeliveryPlan(newPlan);
                              }}
                            />
                          </td>

                          <td className="px-4 py-2 border">
                            <textarea
                              className="w-full p-1 border rounded"
                              value={session.topic}
                              rows="3"
                              style={{ minWidth: "300px" }}
                              onChange={(e) => {
                                const newPlan = [...deliveryPlan];
                                newPlan[index].topic = e.target.value;
                                setDeliveryPlan(newPlan);
                              }}
                            />
                          </td>

                          <td className="px-4 py-2 border">
                            <select
                              className="w-full p-1 border rounded"
                              value={session.hasAssignment}
                              onChange={(e) => {
                                const newPlan = [...deliveryPlan];
                                newPlan[index].hasAssignment = e.target.value;
                                setDeliveryPlan(newPlan);
                              }}
                            >
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </td>
                          <td className="px-4 py-2 border">
                            <select
                              className="w-full p-1 border rounded"
                              value={session.pptShared}
                              onChange={(e) => {
                                const newPlan = [...deliveryPlan];
                                newPlan[index].pptShared = e.target.value;
                                setDeliveryPlan(newPlan);
                              }}
                            >
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </td>
                          <td className="px-4 py-2 border">
                            <select
                              className="w-full p-1 border rounded"
                              value={session.additionalMaterial}
                              onChange={(e) => {
                                const newPlan = [...deliveryPlan];
                                newPlan[index].additionalMaterial =
                                  e.target.value;
                                setDeliveryPlan(newPlan);
                              }}
                            >
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </td>
                          <td className="px-4 py-2 border">
                            <input
                              type="text"
                              className="w-full p-1 border rounded"
                              value={session.compensationClass}
                              onChange={(e) => {
                                const newPlan = [...deliveryPlan];
                                newPlan[index].compensationClass =
                                  e.target.value;
                                setDeliveryPlan(newPlan);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              {/* Notes Section */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Important Notes:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                  <li>
                    Maintain total number of session-hours specified for each
                    module in the syllabus
                  </li>
                  <li>
                    For each one credit, 15 hours of delivery/ classes/ sessions
                    will be there. In few cases, depending on holidays on
                    specific slot days, the total number of classes/ sessions
                    that you get may be less. Hence prepare your course plan
                    accordingly.
                  </li>
                  <li>
                    In case a class scheduled was not taken by you, indicate so
                    in column "Compensation Class". Also indicate how this
                    missed class portion will be compensated - by using a free
                    slot (give date & slot no.), or any other means. This is a
                    "must" information.
                  </li>
                  <li>
                    After populating the details, share your course plan (this
                    sheet) with your School Academic Coordinator/ HoD/ HoI for
                    monitoring purposes.
                  </li>
                </ol>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create Course Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePlan;
