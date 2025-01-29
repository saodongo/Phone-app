import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Profiles from './components/Profiles';
import Phones from './components/About';


function App() {
  return (
    <Router>
      <div className="pt-[13vh]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/phones/:id" element={<Phones />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;