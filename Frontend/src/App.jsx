// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './components/NavBar/NavBar';
// import Dashboard from './components/dashboard'; // Assuming you have a Dashboard component

// import Appl from './components/Appl';
// import ApplList from './components/appllist';
// import Attendance from './components/Attendance';
// import AttendanceList from './components/AttendanceList';
// import Feedback from './components/feedback';
// import Aartifromations from './components/Aartifromations';
// import Event from './components/Event';
// import NewPurchase from './components/NewPurchase';
// import PurchaseList from './components/PurchaseList';
// import UpcomingEvent from './components/UpcomingEvent';
// import FeedbackData from './components/Feedbackdata';
// import Login from './components/Login';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [selectedSubmenu, setSelectedSubmenu] = useState('');

//   const handleSubmenuClick = (submenu) => {
//     setSelectedSubmenu(submenu);
//   };

//   const renderMainContent = () => {
//     switch (selectedSubmenu) {
//       case 'appl':
//         return <Appl />;
//       case 'appllist':
//         return <ApplList />;
//       case 'attendance':
//         return <Attendance />;
//       case 'attendancelist':
//         return <AttendanceList />;
//       case 'feedback':
//         return <Feedback />;
//       case 'aartifromations':
//         return <Aartifromations />;
//       case 'event':
//         return <Event />;
//       case 'newpurchase':
//         return <NewPurchase />;
//       case 'purchaselist':
//         return <PurchaseList />;
//       case 'upcomingevent':
//         return <UpcomingEvent />;
//       case 'feedbackData':
//         return <FeedbackData />;
//       default:
//         return null;
//     }
//   };

//   const MainContentWrapper = () => {
//     if (selectedSubmenu === '') {
//       return <Dashboard />;
//     } else {
//       return (
//         <Routes>
//           <Route path="/" element={renderMainContent()} />
//         </Routes>
//       );
//     }
//   };

//   const handleLogin = () => {
//     setIsAuthenticated(true); // Simulate login success
//   };

//   return (
//     <Router>
//       <div>
//         {/* If not authenticated, show login page */}
//         {!isAuthenticated ? (
//           <Login onLogin={handleLogin} />
//         ) : (
//           <>
//             <Navbar onSubmenuClick={handleSubmenuClick} />
//             <div className="main-content">
//               <MainContentWrapper />
//             </div>
//           </>
//         )}
//       </div>
//     </Router>
//   );
// };

// export default App;



import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Dashboard from './components/dashboard';
import Appl from './components/Appl';
import ApplList from './components/appllist';
import Attendance from './components/Attendance';
import AttendanceList from './components/AttendanceList';
import Feedback from './components/Feedback';
import Aartifromations from './components/Aartifromations';
import Event from './components/Event';
import NewPurchase from './components/NewPurchase';
import PurchaseList from './components/PurchaseList';
import UpcomingEvent from './components/UpcomingEvent'; 
import FeedbackData from './components/Feedbackdata';
import Login from './components/Login';
import VendorForm from './components/Vendor';
import Finance from './components/Finance';
import Yajman from './components/Yajman';
import Yajmanregister from './components/Yajmanregister';
import TodaysYajman from './components/TodaysYajman';
import YajmanList from './components/Yajmanlist';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSubmenu, setSelectedSubmenu] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmenuClick = (submenu) => {
    setSelectedSubmenu(submenu);
  };

  const handleLogin = (role, id) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserId(id);
  };

  const renderMainContent = () => {
    const routePermissions = {
      'appl': ['samithi'],
      'appllist': ['group-sevak', 'samithi'],
      'attendance': ['group-sevak', 'samithi'],
      'attendancelist': ['sevak', 'group-sevak', 'samithi'],
      'feedback': ['sevak', 'group-sevak', 'samithi'],
      'aartifromations': ['sevak', 'group-sevak', 'samithi'],
      'event': ['group-sevak', 'samithi'],
      'newpurchase': ['samithi'],
      'purchaselist': ['samithi'],
      'upcomingevent': ['sevak', 'group-sevak', 'samithi'],
      'feedbackData': ['group-sevak', 'samithi'],
      'vendorform': ['group-sevak', 'samithi'],
      'finance': ['group-sevak', 'samithi'],
      'yajman': ['group-sevak', 'samithi'],
      'yajmanregister': ['group-sevak', 'samithi'],
      'todaysyajman': ['group-sevak', 'samithi'],
      'yajmanlist': ['group-sevak', 'samithi'],
    };

    if (selectedSubmenu && !routePermissions[selectedSubmenu]?.includes(userRole)) {
      return <Navigate to="/" />;
    }

    switch (selectedSubmenu) {
      case 'appl':
        return <Appl />;
      case 'appllist':
        return <ApplList />;
      case 'attendance':
        return <Attendance />;
      case 'attendancelist':
        return <AttendanceList />;
      case 'feedback':
        return <Feedback />;
      case 'aartifromations':
        return <Aartifromations />;
      case 'event':
        return <Event />;
      case 'newpurchase':
        return <NewPurchase />;
      case 'purchaselist':
        return <PurchaseList />;
      case 'upcomingevent':
        return <UpcomingEvent />;
      case 'vendorform':
        return <VendorForm />;
      case 'feedbackData':
        return <FeedbackData />;
      case 'finance':
        return <Finance />;
      case 'yajman':
        return <Yajman />;
      case 'yajmanregister':
        return <Yajmanregister />;
      case 'todaysyajman':
        return <TodaysYajman />;
      case 'yajmanlist':
        return <YajmanList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <div>
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <Navbar 
              onSubmenuClick={handleSubmenuClick} 
              userRole={userRole}
              userId={userId}
            />
            <div className="main-content">
              {renderMainContent()}
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;