export type FamilyEntry = { name: string; relation?: string; message?: string };

export type BrideFamily = {
  divineBlessing: FamilyEntry[];
  preciousBlessing: FamilyEntry[];
  specialRegards: FamilyEntry[];
  lovingWishes: FamilyEntry[];
  nanihalPaksh: FamilyEntry[];
  withLove: FamilyEntry[];
  littleWelcome: FamilyEntry[];
  happyHeart: FamilyEntry[];
  pending: FamilyEntry[];
};

export type GroomFamily = {
  awaitingPresence: FamilyEntry[];
  warmRegards: FamilyEntry[];
  specialInvitation: FamilyEntry[];
  nanihalPaksh: FamilyEntry[];
  withLove: FamilyEntry[];
  weLookForwardToWelcomeYou: FamilyEntry[];
  happyHeart: FamilyEntry[];
  firm: FamilyEntry[];
  'Awaiting Presence'?: FamilyEntry[];
  'Warm Regards'?: FamilyEntry[];
  'Special Invitation'?: FamilyEntry[];
  'Nanihal Paksh'?: FamilyEntry[];
  'With Love'?: FamilyEntry[];
  'We look forward to Welcome You'?: FamilyEntry[];
  'Happy Heart'?: FamilyEntry[];
  'Firm'?: FamilyEntry[];
};

export type Family = Partial<BrideFamily & GroomFamily>;

const entry = (name: string, relation = '', message?: string): FamilyEntry => ({
  name,
  relation,
  ...(message ? { message } : {}),
});

export const groomFamily: GroomFamily = {
  awaitingPresence: [
    entry('Rajkumar, Bharat, Sanjay'),
  ],
  warmRegards: [
    entry('Smt Sangeeta Rajkumar'),
    entry('Smt Sangeeta Bharat'),
    entry('Smt Shilpa Sanjay'),
  ],
  specialInvitation: [
    entry('Smt Gunvanti Sureshji Bagla'),
    entry('Smt Shakuntala Dineshji Parmar'),
  ],
  nanihalPaksh: [
    entry('Smt Sukhibai Sukhrajji Jain (Koselao)'),
  ],
  withLove: [
    entry('Jinisha Nikesh Jain'),
  ],
  weLookForwardToWelcomeYou: [
    entry('Surbhi-Rushabji, Yashika-Jigarji, Harsh, Daksh'),
  ],
  happyHeart: [
    entry('Vihana Jain', '', 'Mere chachu ki shaadi mein jarur jarur aana'),
  ],
  firm: [
    entry('Shree Meenakshi Textile'),
  ],
};

groomFamily['Awaiting Presence'] = groomFamily.awaitingPresence;
groomFamily['Special Invitation'] = groomFamily.specialInvitation;
groomFamily['Nanihal Paksh'] = groomFamily.nanihalPaksh;
groomFamily['We look forward to Welcome You'] = groomFamily.weLookForwardToWelcomeYou;
groomFamily['Happy Heart'] = groomFamily.happyHeart;
groomFamily['Firm'] = groomFamily.firm;

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
