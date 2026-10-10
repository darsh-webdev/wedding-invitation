export type FamilyEntry = { name: string; relation: string; message?: string };
export type Family = {
  divineBlessing: FamilyEntry[];
  preciousBlessing: FamilyEntry[];
  specialRegards: FamilyEntry[];
  lovingWishes: FamilyEntry[];
  nanihalPaksh: FamilyEntry[];
  withLove: FamilyEntry[];
  littleWelcome: FamilyEntry[];
  happyHeart: FamilyEntry[];
  firm?: FamilyEntry[];
  pending: FamilyEntry[];
};
const entry = (name: string, relation = ''): FamilyEntry => ({ name, relation });
export const groomFamily: Family = {
  divineBlessing: [entry('Late Shri Surajmalji Chogmalji Jain')],
  preciousBlessing: [entry('Shrimati Rantanben Surajmalji Jain')],
  specialRegards: [
    entry('Sangeeta Rajkumar Jain', 'Mom'),
    entry('Sangeeta Bharat Jain', 'Chachi'),
    entry('Shilpa Sanjay Jain', '2nd Chachi'),
  ],
  lovingWishes: [
    entry('Gunvati Sureshkumarji Bagla', 'eldest Bua'),
    entry('Shakuntala Dineshji Parmar', 'Bua'),
  ],
  nanihalPaksh: [entry('Shrimati Sukhibai Sukjhrajji Jain', 'Nani')],
  withLove: [
    entry('Jinisha Nikesh Jain', 'Bhabhi'),
    entry('Surbhi Rushabji Jain'),
    entry('Yashika Jigarji Jain'),
    entry('Harsh Bharat Jain'),
    entry('Daksh Bharat Jain'),
  ],
  littleWelcome: [entry('Vihana Nikesh Jain', 'Niece')],
  happyHeart: [],
  firm: [entry('Shree Meenakshi Textile')],
  pending: [entry('Late Arvindkumar Jain (Sangeeta Rajkumar Jain)')],
};
export const brideFamily: Family = {
  divineBlessing: [entry('Late Shri Umedmalji Babulalji Jain')],
  preciousBlessing: [entry('Shrimati Mohiniben Umedmalji Jain'), entry('Pushpa Rameshji Jain')],
  specialRegards: [
    entry('Shilpa Ramanlal Jain', 'Mom'),
    entry('Kavitha Suresh Jain', 'Badi Mummy'),
    entry('Sarika Vikram Jain', 'Chachi'),
    entry('Sangeeta Rajeshji Jain', 'Bua'),
    entry('Khushi Akshit Jain'),
    entry('Shikha Aashish Jain'),
    entry('Bhakti Amitji Jain'),
  ],
  lovingWishes: [
    entry('Vinita Sanjayji Jain'),
    entry('Nital Lokeshji Jain'),
    entry('Jinal Jitendraji Jain'),
    entry('Karishma Shreepalji Jain'),
    entry('Shreepal Prakashchandra Jain'),
  ],
  nanihalPaksh: [
    entry('Shri Prakashchandra Genmalji Jain'),
    entry('Shrimati Lalitaben Prakashchandra Jain'),
  ],
  withLove: [
    entry('Paroksh Ramanlal Jain'),
    entry('Diya Vikram Jain'),
    entry('Riva Vikram Jain'),
    entry('Jeeral Jenilji Jain'),
    entry('Nishi Sanjayji Jain'),
    entry('Rashi Jitendraji Jain'),
    entry('Meet Sanjay Jain'),
    entry('Dhyana Lokesh Jain'),
    entry('Misty Lokesh Jain'),
    entry('Yaksha Jeetendra Jain'),
    entry('Leisha Jeetendra Jain'),
    entry('Dhruvit Shreepal Jain'),
    entry('Saksham Shreepal Jain'),
    entry('Pinky Akshar Jain'),
  ],
  littleWelcome: [
    entry('Jinaya Akshit Jain'),
    entry('Daksh Akshar Jain'),
    entry('Pranit Amitji Jain'),
  ],
  happyHeart: [],
  pending: [],
};
