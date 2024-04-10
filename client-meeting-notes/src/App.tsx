import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import AddNotePage from './pages/AddNotePage';
import EditNotePage from './pages/EditNotePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/add" element={<AddNotePage />} />
        <Route path="/edit/:id" element={<EditNotePage />} />
      </Routes>
    </Router>
  );
};

export default App;
