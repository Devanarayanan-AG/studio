export type Location = {
  id: string;
  classNumber: string;
  type: 'class' | 'lab';
  block: string;
  floor: string;
  faculty: string;
};

export const locations: Location[] = [];
