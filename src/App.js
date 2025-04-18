import React from 'react';
import './App.css';
// import PrimeTest from './components/test/PrimeTest';
import ProjectHealthDashboard from './components/dashboard/ProjectHealthDashboard';

// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";

function App() {
  return (
    <div className="App">
      <ProjectHealthDashboard />
      {/* <PrimeTest/> */}
    </div>
  );
}

export default App;