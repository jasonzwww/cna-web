
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Results from './pages/Results';
import Members from './pages/Members';
import Endurance from './pages/Endurance';
import Globe from './pages/Globe';
import Profile from './pages/Profile';
import SeriesGT3 from './pages/SeriesGT3';
import SeriesRookies from './pages/SeriesRookies';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/results" element={<Results />} />
          <Route path="/members" element={<Members />} />
          <Route path="/globe" element={<Globe />} />
          <Route path="/endurance" element={<Endurance />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/series/gt3" element={<SeriesGT3 />} />
          <Route path="/series/rookies" element={<SeriesRookies />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
