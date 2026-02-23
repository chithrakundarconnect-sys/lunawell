export type Reminder = {
  id: string;
  title: string;
  time: string;
  type: 'Medication' | 'Appointment' | 'Self-care';
};

export type SkincareItem = {
  id: string;
  name: string;
  completed: boolean;
};
