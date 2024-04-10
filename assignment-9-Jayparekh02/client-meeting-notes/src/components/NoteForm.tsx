import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box, FormGroup, useTheme } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const NoteForm = ({ onSubmit, existingNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [actionItems, setActionItems] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setActionItems(existingNote.actionItems || []);
    } else {
      setTitle('');
      setContent('');
      setActionItems([]);
    }
  }, [existingNote]);

  const handleAddActionItem = () => {
    setActionItems([...actionItems, { itemName: '', checked: false }]);
  };

  const handleActionItemChange = (index, event) => {
    const updatedActionItems = actionItems.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        };
      }
      return item;
    });
    setActionItems(updatedActionItems);
  };

  const handleSaveNote = () => {
    const noteData = { title, content, actionItems };
    if (existingNote?._id) noteData._id = existingNote._id; // Include _id for edits
    onSubmit(noteData);
  };

  return (
    <Box sx={{ padding: theme.spacing(3), display: 'flex', flexDirection: 'column', gap: theme.spacing(2) }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        variant="outlined"
        margin="dense"
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        margin="dense"
      />
      <FormGroup>
        {actionItems.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox
              checked={item.checked}
              onChange={(e) => handleActionItemChange(index, e)}
              name="checked"
              color="primary"
            />
            <TextField
              value={item.itemName}
              onChange={(e) => handleActionItemChange(index, e)}
              name="itemName"
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Action Item"
            />
          </Box>
        ))}
      </FormGroup>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddActionItem}
        >
          Add Action Item
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSaveNote}
        >
          Save Note
        </Button>
      </Box>
    </Box>
  );
};

export default NoteForm;
