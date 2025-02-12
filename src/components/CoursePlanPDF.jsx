// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: "Helvetica",
//   },
//   header: {
//     marginBottom: 40,
//     alignItems: "center",
//   },
//   logo: {
//     width: 200,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 40,
//   },
//   courseInfo: {
//     marginBottom: 40,
//     fontSize: 16,
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//   },
//   infoRow: {
//     display: "flex",
//     flexDirection: "row",
//     marginBottom: 8,
//   },
//   infoColumn: {
//     flex: 1,
//   },
//   label: {
//     width: 150,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   value: {
//     fontSize: 16,
//   },
//   table: {
//     marginTop: 20,
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 30,
//     alignItems: "center",
//   },
//   tableHeader: {
//     backgroundColor: "#f0f0f0",
//     borderTopWidth: 1,
//     borderTopColor: "#000",
//   },
//   tableCell: {
//     borderLeftWidth: 1,
//     borderLeftColor: "#000",
//     padding: 5,
//     fontSize: 9,
//   },
//   sessionCell: {
//     width: "5%",
//     borderLeftWidth: 1,
//   },
//   dayCell: {
//     width: "8%",
//   },
//   dateCell: {
//     width: "10%",
//   },
//   startTimeCell: {
//     width: "8%",
//   },
//   endTimeCell: {
//     width: "8%",
//   },
//   moduleCell: {
//     width: "8%",
//   },
//   topicCell: {
//     width: "20%",
//   },
//   assignmentCell: {
//     width: "8%",
//   },
//   pptCell: {
//     width: "8%",
//   },
//   materialCell: {
//     width: "8%",
//   },
//   compensationCell: {
//     width: "9%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//   },
//   notes: {
//     marginTop: 40,
//     fontSize: 10,
//   },
//   noteItem: {
//     marginBottom: 5,
//   },
// });

// const CoursePlanPDF = ({ plan, logoUrl }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.header}>
//         <Image src={logoUrl} style={styles.logo} />
//         <Text style={styles.title}>Course Plan</Text>
//       </View>

//       <View style={styles.courseInfo}>
//         <View style={{ display: "flex", flexDirection: "row" }}>
//           <View style={styles.infoColumn}>
//             <View style={styles.infoRow}>
//               <Text style={styles.label}>Course Title:</Text>
//               <Text style={styles.value}>{plan.courseTitle}</Text>
//             </View>
//             <View style={styles.infoRow}>
//               <Text style={styles.label}>Semester:</Text>
//               <Text style={styles.value}>{plan.semester}</Text>
//             </View>
//             <View style={styles.infoRow}>
//               <Text style={styles.label}>Slot:</Text>
//               <Text style={styles.value}>{plan.slot}</Text>
//             </View>
//           </View>
//           <View style={styles.infoColumn}>
//             <View style={styles.infoRow}>
//               <Text style={styles.label}>Course Code:</Text>
//               <Text style={styles.value}>{plan.courseCode}</Text>
//             </View>
//             <View style={styles.infoRow}>
//               <Text style={styles.label}>Course Type:</Text>
//               <Text style={styles.value}>{plan.courseType}</Text>
//             </View>
//             <View style={styles.infoRow}>
//               <Text style={styles.label}>Faculty Name:</Text>
//               <Text style={styles.value}>{plan.facultyName}</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       <View style={styles.table}>
//         <View style={[styles.tableRow, styles.tableHeader]}>
//           <Text style={[styles.tableCell, styles.sessionCell]}>
//             Session No.
//           </Text>
//           <Text style={[styles.tableCell, styles.dayCell]}>Day</Text>
//           <Text style={[styles.tableCell, styles.dateCell]}>Date</Text>
//           <Text style={[styles.tableCell, styles.startTimeCell]}>
//             Start Time
//           </Text>
//           <Text style={[styles.tableCell, styles.endTimeCell]}>End Time</Text>
//           <Text style={[styles.tableCell, styles.moduleCell]}>Module No.</Text>
//           <Text style={[styles.tableCell, styles.topicCell]}>Topic</Text>
//           <Text style={[styles.tableCell, styles.assignmentCell]}>
//             Assignment
//           </Text>
//           <Text style={[styles.tableCell, styles.pptCell]}>PPT Shared</Text>
//           <Text style={[styles.tableCell, styles.materialCell]}>
//             Additional Material
//           </Text>
//           <Text style={[styles.tableCell, styles.compensationCell]}>
//             Compensation Class
//           </Text>
//         </View>

//         {plan.deliveryPlan.map((session, index) => (
//           <View key={index} style={styles.tableRow}>
//             <Text style={[styles.tableCell, styles.sessionCell]}>
//               {session.sessionNo}
//             </Text>
//             <Text style={[styles.tableCell, styles.dayCell]}>
//               {session.day}
//             </Text>
//             <Text style={[styles.tableCell, styles.dateCell]}>
//               {session.date}
//             </Text>
//             <Text style={[styles.tableCell, styles.startTimeCell]}>
//               {session.startTime}
//             </Text>
//             <Text style={[styles.tableCell, styles.endTimeCell]}>
//               {session.endTime}
//             </Text>
//             <Text style={[styles.tableCell, styles.moduleCell]}>
//               {session.moduleNo}
//             </Text>
//             <Text style={[styles.tableCell, styles.topicCell]}>
//               {session.topic}
//             </Text>
//             <Text style={[styles.tableCell, styles.assignmentCell]}>
//               {session.hasAssignment}
//             </Text>
//             <Text style={[styles.tableCell, styles.pptCell]}>
//               {session.pptShared}
//             </Text>
//             <Text style={[styles.tableCell, styles.materialCell]}>
//               {session.additionalMaterial}
//             </Text>
//             <Text style={[styles.tableCell, styles.compensationCell]}>
//               {session.compensationClass}
//             </Text>
//           </View>
//         ))}
//       </View>

//       {/* <View style={styles.notes}>
//         <Text style={{ marginBottom: 10 }}>Notes:</Text>
//         <Text style={styles.noteItem}>1. Maintain total number of session-hours specified for each module in the syllabus</Text>
//         <Text style={styles.noteItem}>2. For each one credit, 15 hours of delivery/ classes/ sessions will be there.</Text>
//         <Text style={styles.noteItem}>3. In case a class scheduled was not taken, indicate in Compensation Class column.</Text>
//         <Text style={styles.noteItem}>4. Share this plan with your School Academic Coordinator/ HoD/ HoI for monitoring purposes.</Text>
//       </View> */}
//     </Page>
//   </Document>
// );

// export default CoursePlanPDF;

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: "80%",
    height: "auto",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
  },
  courseInfo: {
    marginBottom: 20,
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    flexWrap: "wrap",
  },
  infoColumn: {
    flex: 1,
    minWidth: "45%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    flexShrink: 1, // Prevents truncation
  },
  table: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 30,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#000",
  },
  tableCell: {
    borderLeftWidth: 1,
    borderLeftColor: "#000",
    padding: 5,
    fontSize: 9,
  },
  sessionCell: { width: 40 },
  dayCell: { width: 60 },
  dateCell: { width: 80 },
  startTimeCell: { width: 60 },
  endTimeCell: { width: 60 },
  moduleCell: { width: 60 },
  topicCell: { width: 150 },
  assignmentCell: { width: 60 },
  pptCell: { width: 60 },
  materialCell: { width: 60 },
  compensationCell: {
    width: 80,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
});

const CoursePlanPDF = ({ plan, logoUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image src={logoUrl} style={styles.logo} />
        <Text style={styles.title}>Course Plan</Text>
      </View>

      {/* Course Info */}
      <View style={styles.courseInfo}>
        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Course Title: </Text>
            <Text style={styles.value}>{plan.courseTitle}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Semester: </Text>
            <Text style={styles.value}>{plan.semester.trim()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Slot: </Text>
            <Text style={styles.value}>{plan.slot}</Text>
          </View>
        </View>
        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Course Code: </Text>
            <Text style={styles.value}>{plan.courseCode}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Course Type: </Text>
            <Text style={styles.value}>{plan.courseType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Faculty Name: </Text>
            <Text style={styles.value}>{plan.facultyName}</Text>
          </View>
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.sessionCell]}>
            Session No.
          </Text>
          <Text style={[styles.tableCell, styles.dayCell]}>Day</Text>
          <Text style={[styles.tableCell, styles.dateCell]}>Date</Text>
          <Text style={[styles.tableCell, styles.startTimeCell]}>
            Start Time
          </Text>
          <Text style={[styles.tableCell, styles.endTimeCell]}>End Time</Text>
          <Text style={[styles.tableCell, styles.moduleCell]}>Module No.</Text>
          <Text style={[styles.tableCell, styles.topicCell]}>Topic</Text>
          <Text style={[styles.tableCell, styles.assignmentCell]}>
            Assignment
          </Text>
          <Text style={[styles.tableCell, styles.pptCell]}>PPT Shared</Text>
          <Text style={[styles.tableCell, styles.materialCell]}>
            Additional Material
          </Text>
          <Text style={[styles.tableCell, styles.compensationCell]}>
            Compensation Class
          </Text>
        </View>

        {plan.deliveryPlan.map((session, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.sessionCell]}>
              {session.sessionNo}
            </Text>
            <Text style={[styles.tableCell, styles.dayCell]}>
              {session.day}
            </Text>
            <Text style={[styles.tableCell, styles.dateCell]}>
              {session.date}
            </Text>
            <Text style={[styles.tableCell, styles.startTimeCell]}>
              {session.startTime}
            </Text>
            <Text style={[styles.tableCell, styles.endTimeCell]}>
              {session.endTime}
            </Text>
            <Text style={[styles.tableCell, styles.moduleCell]}>
              {session.moduleNo}
            </Text>
            <Text style={[styles.tableCell, styles.topicCell]}>
              {session.topic}
            </Text>
            <Text style={[styles.tableCell, styles.assignmentCell]}>
              {session.hasAssignment}
            </Text>
            <Text style={[styles.tableCell, styles.pptCell]}>
              {session.pptShared}
            </Text>
            <Text style={[styles.tableCell, styles.materialCell]}>
              {session.additionalMaterial}
            </Text>
            <Text style={[styles.tableCell, styles.compensationCell]}>
              {session.compensationClass}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default CoursePlanPDF;
