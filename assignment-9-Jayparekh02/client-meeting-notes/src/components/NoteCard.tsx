// src/components/NoteCard.jsx
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Checkbox, FormControlLabel, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

const NoteCard = ({ note, onDelete, onEdit }) => {
  const theme = useTheme();

  // Format the dates
  const formattedCreatedDate = format(new Date(note.createdDate), 'PPPp');
  const formattedUpdatedDate = format(new Date(note.updatedDate), 'PPPp');

  return (
    <Card sx={{ mb: theme.spacing(2) }}>
      <CardContent>
        <Typography variant="h5" component="div">{note.title}</Typography>
        <Typography color="text.secondary">{note.content}</Typography>
        {note.actionItems.map((item, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox checked={item.checked} disabled />}
            label={item.itemName}
            sx={{ display: 'block' }}
          />
        ))}
        {/* Display formatted dates */}
        <br></br>
        <br></br>
        <Typography variant="body2" color="text.secondary" sx={{ mt: theme.spacing(1) }}>
          Created: {formattedCreatedDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last Updated: {formattedUpdatedDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(note._id)}>Edit</Button>
        <Button size="small" startIcon={<DeleteIcon />} color="error" onClick={() => onDelete(note._id)}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
