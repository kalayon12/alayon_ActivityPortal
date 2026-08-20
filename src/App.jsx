import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Activity1 from './pages/Activity1';
import Activity2 from './pages/Activity2';
import Activity3 from './pages/Activity3';
import Activity4 from './pages/Activity4';
import Activity5 from './pages/Activity5';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activity1" element={<Activity1 />} />
        <Route path="/activity2" element={<Activity2 />} />
        <Route path="/activity3" element={<Activity3 />} />
        <Route path="/activity4" element={<Activity4 />} />
        <Route path="/activity5" element={<Activity5 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;