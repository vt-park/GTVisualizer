import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RootsOfUnity from './rootsofunity';
import DihedralGroup from './dihedral'; 
import './App.css'; 

function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Group Theory Visualizer</h1>
                </header>
                    <ul>
                        <li>
                            <Link to="/roots" className="menu-box">Roots of Unity</Link>
                        </li>
                        <li>
                            <Link to="/dihedral" className="menu-box">Dihedral Groups</Link>
                        </li>
                        <li>
                          <Link to="" className="menu-box">Coming soon... (probably group actions)</Link>
                        </li>
                    </ul>
                <Routes>
                    <Route path="/roots" element={<RootsOfUnity />} />
                    <Route path="/dihedral" element={<DihedralGroup />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
