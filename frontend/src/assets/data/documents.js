import document1 from "../docs/Pautas de Proyecto SP 2022.pdf";
import document2 from "../docs/taller1.pdf";
import document3 from "../docs/ejercicios bash.pdf";


const documents = [
  {
    id: "01",
    title: "Pautas del proyecto",
    subject: "Ing software II",
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    doc: document1,
    featured: true,
  },
  {
    id: "02",
    title: "Taller I",
    subject: "Ing software II",
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    doc: document2,
    featured: true,
  },
  {
    id: "03",
    title: "Ejercicios bash",
    subject: "Sistemas operativos",
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    doc: document3,
    featured: true,
  },
  
];

export default documents;
