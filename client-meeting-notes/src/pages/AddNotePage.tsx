// src/pages/AddNotePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMeetingNote } from '../services/meetingNoteService';
import NoteForm from '../components/NoteForm'; // Reusable form component for add/edit

const AddNotePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (noteData) => {
    try {
      await addMeetingNote(noteData);
      navigate('/'); // Redirect to the notes list page after adding
    } catch (error) {
      console.error('Failed to add the note', error);
    }
  };

  return (
    <div>
      <h1>Add New Note</h1>
      <NoteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddNotePage;
