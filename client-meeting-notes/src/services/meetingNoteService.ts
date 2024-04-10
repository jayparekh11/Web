import { MeetingNote } from '../types';

const API_URL = 'http://localhost:3000/meetingNotes'; 

export const getAllMeetingNotes = async (): Promise<MeetingNote[]> => {
  const response = await fetch(`${API_URL}/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getSingleMeetingNote = async (id: string): Promise<MeetingNote> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const filterMeetingNotes = async (filter: object): Promise<MeetingNote[]> => {
  const queryParams = new URLSearchParams(filter as any).toString();
  const response = await fetch(`${API_URL}/filter?${queryParams}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const addMeetingNote = async (note: MeetingNote): Promise<MeetingNote> => {
  const response = await fetch(`${API_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const updateMeetingNote = async (id: string, note: Partial<MeetingNote>): Promise<MeetingNote> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const deleteMeetingNote = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
