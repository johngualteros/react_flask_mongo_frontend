import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./components/About";
import { Navbar } from "./components/Navbar";
import { Users } from "./components/Users";

function App() {
  return (
    <div className="bg-zinc-900 min-h-screen">
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
