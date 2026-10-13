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
  preciousBlessing: [entry('Smt. Rantanben Surajmalji Jain')],
  specialRegards: [
    entry('Sangeeta Rajkumar Jain', 'Mom'),
    entry('Sangeeta Bharat Jain', 'Chachi'),
    entry('Shilpa Sanjay Jain', '2nd Chachi'),
  ],
  lovingWishes: [
    entry('Gunvati Sureshkumarji Bagla', 'eldest Bua'),
    entry('Shakuntala Dineshji Parmar', 'Bua'),
  ],
  nanihalPaksh: [entry('Smt. Sukhibai Sukjhrajji Jain', 'Nani')],
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
  preciousBlessing: [
    entry('Smt. Mohiniben Umedmalji Jain'),
    entry(' Smt. Pushpa Rameshkumar Jain'),
  ],
  specialRegards: [
    entry('Kavitha - Sureshkumar', 'Badi Mummy'),
    entry('Shilpa - Ramanlal', 'Mom'),
    entry('Sarika - Vikram', 'Chachi'),
    entry('Sangeeta - Rajeshji', 'Bua'),
    entry('Bhakti - Amitji'),
    entry('Pinky - Akshar'),
  ],
  lovingWishes: [
    // entry('Vinita Sanjayji Jain'),
    // entry('Nital Lokeshji Jain'),
    // entry('Jinal Jitendraji Jain'),
    // entry('Shreepal Prakashchandra Jain'),
    // entry('Karishma Shreepalkumar Jain'),
  ],
  nanihalPaksh: [
    // entry('Shri Prakashchandra Genmalji Jain'),
    entry('Smt. Lalitaben Prakashchandra Jain'),
    // entry('Shreepal Prakashchandra Jain'),
    entry('Karishma - Shreepalkumar'),
    entry('Dhruvit'),
    entry('Saksham'),
  ],
  withLove: [
    entry('Jeeral - Jenilji'),
    entry('Khushi - Akshit'),
    entry('Shikha - Aashish'),
    entry('Mith'),
    entry('Paroksh'),
    entry('Diya'),
    entry('Riva'),
    // entry('Nishi Sanjayji Jain'),
    // entry('Rashi Jitendraji Jain'),
    // entry('Meet Sanjay Jain'),
    // entry('Dhyana Lokesh Jain'),
    // entry('Misty Lokesh Jain'),
    // entry('Yaksha Jeetendra Jain'),
    // entry('Leisha Jeetendra Jain'),
  ],
  littleWelcome: [
    entry('Daksh'),
    entry('Pranit'),
    // entry('Jinaya Akshit Jain'),
  ],
  happyHeart: [
    entry('Jinaya'),
    entry('Stavya'),
    entry('(Meli Bhua aur Maachi ki shaadi me jalool padharna)'),
  ],
  pending: [],
};
