import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AirdateComponent from './components/AirdateComponent';
import PaintingDetail from './components/PaintingDetail';

const App = () => {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Hello nerds</h1>
                    <Routes>
                        <Route path="/" element={<AirdateComponent />} />
                        <Route path="/painting/:id" element={<PaintingDetail />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
};

export default App;
