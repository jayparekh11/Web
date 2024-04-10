import MeetingNote from "../models/meetingNote.js";

// Get all meeting notes
export const getAllMeetingNotes = async () => {
  return await MeetingNote.find();
};

// Filter meeting notes
export const filterMeetingNotes = async ({ keyword, fromDate, toDate }) => {
  const query = {};

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { content: { $regex: keyword, $options: "i" } },
      { "actionItems.itemName": { $regex: keyword, $options: "i" } },
    ];
  }

  if (fromDate && toDate) {
    query.createdDate = { $gte: new Date(fromDate), $lte: new Date(toDate) };
  }

  const filteredMeetingNotes = await MeetingNote.find(query);
  return filteredMeetingNotes;
};

// Add a meeting note
export const addMeetingNote = async (meetingNoteData) => {
  const meetingNote = new MeetingNote(meetingNoteData);
  return await meetingNote.save();
};

// Update a meeting note
export const updateMeetingNote = async (id, newData) => {
    try {
      const meetingNote = await MeetingNote.findById(id);
   
      if (!meetingNote) {
        throw new Error("Meeting note not found");
      }
   
      // Update or add new action items if provided in newData
      if (newData.actionItems && Array.isArray(newData.actionItems)) {
        newData.actionItems.forEach((newActionItem) => {
          const index = meetingNote.actionItems.findIndex(
            (item) => item._id.toString() === newActionItem._id
          );
   
          if (index !== -1) {
            // Update existing action item
            Object.assign(
              meetingNote.actionItems[index],
              // Only copy the properties that need to be updated
              newActionItem
            );
          } else {
            // Add new action item (if _id is not null)
            if (newActionItem._id !== null) {
              meetingNote.actionItems.push(newActionItem);
            }
          }
        });
      }
   
      // Prepare the meeting note for update by removing actionItems from newData
      delete newData.actionItems;
      // Update other fields in the meeting note
      Object.assign(meetingNote, newData);
   
      // Save the updated meeting note
      const updatedMeetingNote = await meetingNote.save();
   
      return updatedMeetingNote;
    } catch (error) {
      throw error;
    }
  };

// Delete a meeting note
export const deleteMeetingNote = async (id) => {
  await MeetingNote.findByIdAndDelete(id);
};
