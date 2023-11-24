import './App.css';
import React from 'react';
import { QuestionProvider } from './context/QuestionContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Question from './pages/ShowQuestion';

function App() {
  return (
    <QuestionProvider>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="question" element={<Question />}></Route>
            <Route path="*" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </QuestionProvider>
  );
}

export default App;