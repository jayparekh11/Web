import mongoose, { Schema } from "mongoose";
 
const actionItemSchema = new Schema({
  itemName: { type: String, required: false },
  checked: { type: Boolean, default: false },
});
 
// Define the MeetingNote schema
const meetingNoteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [50, "Title cannot exceed 50 characters"],
  },
  content: { type: String, required: true, trim: true },
  actionItems: { type: [actionItemSchema], default: [] },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});
 
meetingNoteSchema.pre("save", function (next) {
  this.updatedDate = new Date();
  next();
});
 
// Create the MeetingNote model
const MeetingNote = mongoose.model("MeetingNote", meetingNoteSchema);
 
// Export the model
export default MeetingNote;
 