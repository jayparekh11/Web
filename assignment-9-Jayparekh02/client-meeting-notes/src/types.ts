export interface Note {
    id: number;
    title: string;
    content: string;
    // Include other properties that match your backend model
  }
  export interface ActionItem {
    itemName: string;
    checked: boolean;
  }
 
  export interface MeetingNote {
    _id: string;
    title: string;
    content: string;
    actionItems: ActionItem[];
    createdDate: Date;
    updatedDate: Date;
  }
  