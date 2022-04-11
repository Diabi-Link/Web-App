import img1 from '../../../assets/svgs/Search.svg';
import img2 from '../../../assets/svgs/Team.svg';

export const homeObjOne = {
  id: 'about',
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topline: 'À propos',
  headline: 'Qui sommes-nous ?',
  description:
    "Notre application web et mobile vous permettra de suivre et d'aider les personnes diabétiques ayant des difficultés à gérer cette maladie de façon autonome. " +
    "Pour cela, nous allons faciliter la communications et le suivit du diabétique par ses parents et médecins grâce à un accès à son taux de glycémie à distance, ainsi qu’un système d'alertes et de messagerie. " +
    "DiabiLink permettra également aux médecins et parents de diabétiques peu autonome de surveiller le taux de glycémie du diabétique facilement afin de le prévenir et l'aider en cas de problème. " +
    'Nous espérons ainsi grâce à notre solution rassurer les parents de jeunes diabétiques et faciliter le travail des médecins comme la vie des diabétiques.',
  buttonLabel: 'Get started',
  picture: false,
  imgStart: false,
  img: img1,
  alt: 'Doctor',
  dark: true,
  primary: true,
  darkText: false,
};

export const homeObjTwo = {
  id: 'team',
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topline: "L'Équipe",
  headline: 'derrière le projet',
  description:
    'Notre équipe est composée de 6 développeurs tous chacun bien répartis de façon différente sur le projet. ' +
    'Front-end: Nicolas Carrasco & Djahid Bousba Back-end: Thibault Schmitt & Théo Henault\n' +
    'Mobile(IOS): Mathis Paroissien Mobile(Android): Laurent Sferlazza',
  buttonLabel: 'Get started',
  picture: true,
  imgStart: true,
  img: img2,
  alt: 'Doctor',
  dark: false,
  primary: false,
  darkText: true,
};
