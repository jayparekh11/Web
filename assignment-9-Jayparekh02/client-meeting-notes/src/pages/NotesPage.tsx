import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Modal, Typography, TextField, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import {
  getAllMeetingNotes,
  deleteMeetingNote,
  updateMeetingNote,
  addMeetingNote,
} from '../services/meetingNoteService';

const NotesPage = () => {
  const theme = useTheme();
  const [notes, setNotes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const fetchedNotes = await getAllMeetingNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Failed to load notes:", error);
      setNotes([]);
    }
  };

  const handleDelete = async (id) => {
    await deleteMeetingNote(id);
    loadNotes();
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setOpenModal(true);
  };

  const handleAddOrEditNote = async (noteData) => {
    if (noteData._id) {
      await updateMeetingNote(noteData._id, noteData);
    } else {
      await addMeetingNote(noteData);
    }
    setOpenModal(false);
    setCurrentNote(null);
    loadNotes();
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: theme.spacing(4),
    outline: 'none',
  };

  return (
    <Box sx={{ p: theme.spacing(3) }}>
      <Typography variant="h4" color="primary" sx={{ mb: theme.spacing(4) }}>Meeting Notes</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search Keywords"
          variant="outlined"
          fullWidth
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={loadNotes}>Search</Button>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={() => {
          setCurrentNote(null); // Reset for adding a new note
          setOpenModal(true);
        }}
        sx={{ mb: theme.spacing(2) }}
      >
        Create Note
      </Button>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setCurrentNote(null);
        }}
        aria-labelledby="add-note-modal-title"
      >
        <Box sx={modalStyle}>
          <NoteForm onSubmit={handleAddOrEditNote} existingNote={currentNote} />
        </Box>
      </Modal>
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={note._id}>
            <NoteCard
              note={note}
              onDelete={handleDelete}
              onEdit={() => handleEdit(note)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NotesPage;
