import * as MeetingNoteService from "../Services/meetingNotesService.js";
import { setResponse, setError } from "./handleResponse.js";

// Get all meeting notes
export const getAllMeetingNotes = async (req, res) => {
  try {
    const meetingNotes = await MeetingNoteService.getAllMeetingNotes();
    setResponse(meetingNotes, res);
  } catch (err) {
    setError(err, res);
  }
};

// Filter meeting notes
export const filterMeetingNotes = async (req, res) => {
  try {
    const filteredMeetingNotes = await MeetingNoteService.filterMeetingNotes(
      req.query
    );
    setResponse(filteredMeetingNotes, res);
  } catch (err) {
    setError(err, res);
  }
};

// Add a meeting note
export const addMeetingNote = async (req, res) => {
  try {
    const newMeetingNote = await MeetingNoteService.addMeetingNote(req.body);
    setResponse(newMeetingNote, res);
  } catch (err) {
    setError(err, res);
  }
};

// Update a meeting note
export const updateMeetingNote = async (req, res) => {
  try {
    const updatedMeetingNote = await MeetingNoteService.updateMeetingNote(
      req.params.id,
      req.body
    );
    setResponse(updatedMeetingNote, res);
  } catch (err) {
    setError(err, res);
  }
};

// Delete a meeting note
export const deleteMeetingNote = async (req, res) => {
  try {
    await MeetingNoteService.deleteMeetingNote(req.params.id);
    setResponse({ message: "Meeting note deleted" }, res);
  } catch (err) {
    setError(err, res);
  }
};
