// src/pages/EditNotePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleMeetingNote, updateMeetingNote } from '../services/meetingNoteService';
import NoteForm from '../components/NoteForm';

const EditNotePage: React.FC = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getSingleMeetingNote(id).then(setNote);
    }
  }, [id]);

  const handleSubmit = async (noteData) => {
    try {
      await updateMeetingNote(id, noteData);
      navigate('/');
    } catch (error) {
      console.error('Failed to update the note', error);
    }
  };

  return (
    <div>
      <h1>Edit Note</h1>
      {note ? <NoteForm note={note} onSubmit={handleSubmit} /> : <p>Loading...</p>}
    </div>
  );
};

export default EditNotePage;
