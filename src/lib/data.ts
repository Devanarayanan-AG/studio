export type Location = {
  id: string;
  name: string;
  type: 'class' | 'lab';
  block: string;
  floor: string;
  faculty: string;
};

export const locations: Location[] = [
  {
    id: 'CS101',
    name: 'Intro to Programming',
    type: 'class',
    block: 'Block A',
    floor: '1st Floor',
    faculty: 'Dr. Ada Lovelace',
  },
  {
    id: 'CSL-A2',
    name: 'Data Structures Lab',
    type: 'lab',
    block: 'Block A',
    floor: '2nd Floor',
    faculty: 'Dr. Charles Babbage',
  },
  {
    id: 'PHY201',
    name: 'Modern Physics',
    type: 'class',
    block: 'Block C',
    floor: 'Ground Floor',
    faculty: 'Dr. Albert Einstein',
  },
  {
    id: 'CHML-B1',
    name: 'Chemistry Lab',
    type: 'lab',
    block: 'Block B',
    floor: '1st Floor',
    faculty: 'Dr. Marie Curie',
  },
  {
    id: 'MATH301',
    name: 'Advanced Calculus',
    type: 'class',
    block: 'Main Building',
    floor: '3rd Floor',
    faculty: 'Dr. Isaac Newton',
  },
  {
    id: 'ENG101',
    name: 'Communicative English',
    type: 'class',
    block: 'Block B',
    floor: '2nd Floor',
    faculty: 'Prof. William Shakespeare',
  },
  {
    id: 'BIOL-L1',
    name: 'Biology Lab',
    type: 'lab',
    block: 'Block C',
    floor: '1st Floor',
    faculty: 'Dr. Gregor Mendel',
  },
  {
    id: 'CS404',
    name: 'Artificial Intelligence',
    type: 'class',
    block: 'Block A',
    floor: '3rd Floor',
    faculty: 'Dr. Alan Turing',
  },
];
