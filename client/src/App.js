import './App.css';
import HomePage from './components/HomePage';
import StructureDetailsPage from './components/StructureDetailsPage';
import MyReviewsPage from './components/MyReviewsPage';
import NavBar from './components/NavBar';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const parkingStructureData = [
    {
      id: "stucture-1",
      number: "1",
      name: "Palmer Structure",
      address: "450 W. Palmer, Detroit, MI, 48202",
      description: "It is a six-level aboveground parking deck accessible to faculty, staff, students, guests and visitors with assigned and open parking. The structure has approximately 1,913 spaces available for parking. Gates 1 and 2 and designated for assigned faculty/staff use only.",
      operationHours: "24/7",
      studentParkingRates: {
          semesterPermit: "$222.00",
          oneCardDebit: "$4.00"
      },
      facultyAndStaffRates: {
          semesterPermit: "$392.00",
          oneCardDebit: "$7.50",
          biweeklyPayrollDeduction: "$45.50"
      },
      creditCardRate: "$8.50",
      cash: "N/A",
      image: "https://parking.wayne.edu/images/structure_1_in_text.jdw.111813.jpg",
      coordinates: [42.3591, -83.0665],
      hours: {
          monday: "24/7",
          tuesday: "24/7",
          wednesday: "24/7",
          thursday: "24/7",
          friday: "24/7",
          saturday: "24/7",
          sunday: "24/7"
      }
  }, 
  {
      id: "stucture-2",
      number: "2",
      name: "Manoogian Structure",
      address: "5150 Lodge Service Dr, Detroit, MI, 48202",
      description: "Parking Structure 2 was built in 1972. Located at 5150 Lodge Service Drive, bordered by Kirby Street and Anthony Wayne Drive, it is also known as the Manoogian Structure. It is a six-level aboveground parking deck accessible to faculty, staff, students, residents, and visitors with assigned and open parking. The structure has approximately 2,045 spaces available. Gate 3 is designated for assigned faculty/staff use only.",
      operationHours: "24/7",
      studentParkingRates: {
          semesterPermit: "$222.00",
          oneCardDebit: "$4.00"
      },
      facultyAndStaffRates: {
          semesterPermit: "$392.00",
          oneCardDebit: "$7.50",
          biweeklyPayrollDeduction: "$45.50"
      },
      creditCardRate: "$8.50",
      cash: "N/A",
      image: "https://parking.wayne.edu/images/structure_2_in_text.jdw.111813.jpg",
      coordinates: [42.356515,-83.073742],
      hours: {
          monday: "24/7",
          tuesday: "24/7",
          wednesday: "24/7",
          thursday: "24/7",
          friday: "24/7",
          saturday: "24/7",
          sunday: "24/7"
      }
  },
  {
      id: "stucture-3",
      number: "3",
      name: "Rackham Structure",
      address: "45 E. Warren, Detroit, MI, 48202",
      description: "Parking Structure 3 was built in 1977. Located at 45 E. Warren between Woodward and John R, it is also known as the Rackham Structure. It is a three-level aboveground parking deck accessible to faculty, staff, students, guests and visitors with assigned and open parking. The structure has approximately 320 parking spaces and is the smallest of the eight parking structures. ",
      operationHours: "6:00 AM - 12:00AM, Monday-Friday",
      studentParkingRates: {
          semesterPermit: "N/A",
          oneCardDebit: "$4.00"
      },
      facultyAndStaffRates: {
          semesterPermit: "$392.00",
          oneCardDebit: "$7.50",
          biweeklyPayrollDeduction: "$45.50"
      },
      creditCardRate: "$8.50",
      cash: "N/A",
      image: "https://parking.wayne.edu/info/structure3.jpg",
      coordinates: [42.357561,-83.063282],
      hours: {
          monday: "6:00 a.m. - 12:00 a.m.",
          tuesday: "6:00 a.m. - 12:00 a.m.",
          wednesday: "6:00 a.m. - 12:00 a.m.",
          thursday: "6:00 a.m. - 12:00 a.m.",
          friday: "6:00 a.m. - 12:00 a.m.",
          saturday: "Closed",
          sunday: "Closed"
      }
  },
  {
      id: "stucture-4",
      number: "4",
      name: "Medical School Structure",
      address: "555 E. Canfield, Detroit, MI, 48202",
      description: "Parking Structure 4 was built in 1978. Located at 555 E. Canfield at St. Antoine on the east side of campus in the medical center, it is also known as the Medical School Structure. It is an eight level aboveground parking deck accessible to faculty, staff, students and DMC staff with assigned parking only. The structure has approximately 1,200 available parking spaces. There are two entrance/exit gates.",
      operationHours: "5:45 a.m. - 12:30 a.m., Monday-Friday",
      studentParkingRates: {
          semesterPermit: "$222.00",
          oneCardDebit: "N/A"
      },
      facultyAndStaffRates: {
          semesterPermit: "$392.00",
          oneCardDebit: "N/A",
          biweeklyPayrollDeduction: "$45.50"
      },
      creditCardRate: "N/A",
      cash: "N/A",
      image: "https://parking.wayne.edu/info/structure4.jpg",
      coordinates: [42.355912,-83.055128],
      hours: {
          monday: "5:45 a.m. - 12:30 a.m.",
          tuesday: "5:45 a.m. - 12:30 a.m.",
          wednesday: "5:45 a.m. - 12:30 a.m",
          thursday: "5:45 a.m. - 12:30 a.m",
          friday: "5:45 a.m. - 12:30 a.m",
          saturday: "Closed",
          sunday: "Closed"
      }
  },
  {
      id: "stucture-5",
      number: "5",
      name: "Anthony Wayne Dr. Structure, Detroit, MI, 48202",
      address: "5501 Anthony Wayne Dr",
      description: "Parking Structure 5 was built in 1987. Located at 5501 Anthony Wayne Drive bordered by the Lodge Service Drive and Kirby across from Structure 2, it is also known as the Anthony Wayne Drive Structure. It is a four-level aboveground parking deck accessible to faculty, staff, students, guests and visitors with assigned and open parking. The structure has approximately 1,076 spaces available in the structure and 142 surface spaces. There are two entrance/exit gates available for customer use.",
      operationHours: "6:00 a.m. - 12:00 a.m., Monday-Friday",
      studentParkingRates: {
          semesterPermit: "$222.00",
          oneCardDebit: "$4.00"
      },
      facultyAndStaffRates: {
          semesterPermit: "$392.00",
          oneCardDebit: "$7.50",
          biweeklyPayrollDeduction: "$45.50"
      },
      creditCardRate: "$2.00 First 20 minutes or fraction of, $1.00 each additional 20 minutes or fraction of, $12.00 maximum",
      cash: "N/A",
      image: "https://parking.wayne.edu/images/structure_5_in_text.jdw.111813.jpg",
      coordinates: [42.358132,-83.074188],
      hours: {
          monday: "6:00 a.m. - 12:00 a.m.",
          tuesday: "6:00 a.m. - 12:00 a.m.",
          wednesday: "6:00 a.m. - 12:00 a.m.",
          thursday: "6:00 a.m. - 12:00 a.m.",
          friday: "6:00 a.m. - 12:00 a.m.",
          saturday: "Closed",
          sunday: "Closed"
      }
  },
  {
      id: "stucture-6",
      number: "6",
      name: "Welcome Center Garage",
      address: "61 Putnam, Detroit, MI, 48202",
      description: "Parking Structure 6 was built in 2001. Located at 61 Putnam between Woodward and Cass, it is also known as the Welcome Center Garage. Centrally located on campus, it is our only premium parking garage. It is a six-level aboveground parking deck accessible to faculty, staff, students, guests and visitors with assigned and open parking. The structure has approximately 705 available parking spaces. The structure features a separate area for visitor parking, with a ticket-spitter and cashier booth at the exit. Generally the visitor parking area has 55 parking spaces; however, the spaces can be adjusted when necessary.",
      operationHours: "6:00 a.m. - 12:00 a.m., Monday-Saturday",
      studentParkingRates: {
          semesterPermit: "$285.25",
          oneCardDebit: "$5.00"
      },
      facultyAndStaffRates: {
          semesterPermit: "$495.00",
          oneCardDebit: "$8.75",
          biweeklyPayrollDeduction: "$57.00"
      },
      creditCardRate: "Staff/student section- $9.50 Credit Card as space allows. Visitor's section- $2.00 First 20 minutes or fraction of, $1.00 each additional 20 minutes or fraction of, $12.00 max. V",
      cash: "N/A",
      image: "https://parking.wayne.edu/info/structure6.jpg",
      coordinates: [42.356903,-83.066474],
      hours: {
          monday: "6:00 a.m. - 12:00 a.m.",
          tuesday: "6:00 a.m. - 12:00 a.m.",
          wednesday: "6:00 a.m. - 12:00 a.m.",
          thursday: "6:00 a.m. - 12:00 a.m.",
          friday: "6:00 a.m. - 12:00 a.m.",
          saturday: "6:00 a.m. - 12:00 a.m.",
          sunday: "Closed"
      }
  }, 
  {
      id: "stucture-7",
      number: "7",
      name: "Midtown Garage",
      address: "3717 John R, Detroit, MI, 48202",
      description: "Parking Structure 7 is located at 3717 John R at the corner of Mack Avenue. It is also known as the Pharmacy Structure. It is an aboveground parking deck accessible to faculty, staff, students, guests and visitors with assigned and open parking. This structure is managed by a third-party parking management company based on a contract between the developer and WSU. The structure has approximately 954 spaces available for parking, of which 500 are dedicated to WSU. There are four entrance gates and four exit gates; two gates have reversible lanes. ",
      operationHours: "24/7",
      studentParkingRates: {
          semesterPermit: "$222.00",
          oneCardDebit: "$4.00"
      },
      facultyAndStaffRates: {
          semesterPermit: "$392.00",
          oneCardDebit: "$7.50",
          biweeklyPayrollDeduction: "$45.50"
      },
      creditCardRate: "$2.00 every 20 minutes, $12 maximum. Special Event Rates may apply",
      cash: "N/A",
      image: "https://parking.wayne.edu/info/structure7.jpg",
      coordinates: [42.349030,-83.057054],
      hours: {
          monday: "24/7",
          tuesday: "24/7",
          wednesday: "24/7",
          thursday: "24/7",
          friday: "24/7",
          saturday: "24/7",
          sunday: "24/7"
      }
  },
  {
      id: "stucture-8",
      number: "8",
      name: "University Towers/South Village",
      address: "91 West Forest, Detroit, MI, 48202",
      description: "Parking Structure 7 is located at 3717 John R at the corner of Mack Avenue. It is also known as the Pharmacy Structure. It is an aboveground parking deck accessible to faculty, staff, students, guests and visitors with assigned and open parking. This structure is managed by a third-party parking management company based on a contract between the developer and WSU. The structure has approximately 954 spaces available for parking, of which 500 are dedicated to WSU. There are four entrance gates and four exit gates; two gates have reversible lanes. ",
      operationHours: "24/7",
      studentParkingRates: {
          semesterPermit: "$222.00",
          oneCardDebit: "$4.00"
      },
      facultyAndStaffRates: {
          semesterPermit: "$392.00",
          oneCardDebit: "$7.50",
          biweeklyPayrollDeduction: "$45.50"
      },
      creditCardRate: "$2.00 First 20 minutes or fraction of, $1.00 each additional 20 minutes or fraction of, $12.00 maximum.",
      cash: "N/A",
      image: "http://maps.wayne.edu/images/location/96/parking-structure-8.jpg",
      coordinates: [42.353747,-83.063791],
      hours: {
          monday: "24/7",
          tuesday: "24/7",
          wednesday: "24/7",
          thursday: "24/7",
          friday: "24/7",
          saturday: "24/7",
          sunday: "24/7"
      }
  }
  ];

  return (
    render(
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/StructureDetailsPage/1" element={<StructureDetailsPage structureInfo={parkingStructureData[0]}/>}></Route>
          <Route path="/StructureDetailsPage/2" element={<StructureDetailsPage structureInfo={parkingStructureData[1]}/>}></Route>
          <Route path="/StructureDetailsPage/3" element={<StructureDetailsPage structureInfo={parkingStructureData[2]}/>}></Route>
          <Route path="/StructureDetailsPage/4" element={<StructureDetailsPage structureInfo={parkingStructureData[3]}/>}></Route>
          <Route path="/StructureDetailsPage/5" element={<StructureDetailsPage structureInfo={parkingStructureData[4]}/>}></Route>
          <Route path="/StructureDetailsPage/6" element={<StructureDetailsPage structureInfo={parkingStructureData[5]}/>}></Route>
          <Route path="/StructureDetailsPage/7" element={<StructureDetailsPage structureInfo={parkingStructureData[6]}/>}></Route>
          <Route path="/StructureDetailsPage/8" element={<StructureDetailsPage structureInfo={parkingStructureData[7]}/>}></Route>
          <Route path="/MyReviewsPage" element={<MyReviewsPage />}></Route>
        </Routes>
      </BrowserRouter>,
      document.getElementById("root")
    )
  );
}

export default App;
