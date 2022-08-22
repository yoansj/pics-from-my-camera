// import PortraitIcon from '@material-ui/icons/Portrait'; //Portrait
// import BrokenImageIcon from '@material-ui/icons/BrokenImage'; //Montage
// import Brightness2Icon from '@material-ui/icons/Brightness2'; //Nuit
// "https://img.icons8.com/pastel-glyph/64/000000/sneaker--v2.png" Sneakers
// import ApartmentIcon from '@material-ui/icons/Apartment'; //Architecture

//Liste des images

const Categories = {
  portrait: { name: "portrait", style: "Portrait" },
  montage: { name: "montage", style: "Montage" },
  paysage: { name: "paysage", style: "Landscape" },
  sneakers: { name: "sneakers", style: "Sneakers" },
  architecture: { name: "architecture", style: "Architecture" },
  lightPainting: { name: "lightPainting", style: "Light Painting" },
  night: { name: "night", style: "Night" },
  bw: { name: "blackAndWhite", style: "Black & White" },
};

// Liste des images
// Une image est un objet qui contient
// name : le nom de l'image
// src : le chemin vers la source de l'image
// categories : un tableau contenant les catégories
const imageList = [
  {
    name: "Through my phone",
    src: "https://i.ibb.co/tYZ63VV/see-through-phone-ile-de-re.jpg",
    categories: [Categories.paysage, Categories.montage],
  },
  { name: "Red", src: "https://i.ibb.co/t2P43Mm/red.jpg", categories: [Categories.architecture] },
  { name: "AJ3 I", src: "https://i.ibb.co/XD0JKbd/Jordan-2.jpg", categories: [Categories.sneakers] },
  { name: "AJ3 II", src: "https://i.ibb.co/Mh4HmTJ/jay-jay.jpg", categories: [Categories.sneakers] },
  { name: "Airmax x Lacoste", src: "https://i.ibb.co/YLyZ3cm/airmax-x-lacoste.jpg", categories: [Categories.sneakers] },
  { name: "Blue", src: "https://i.ibb.co/BZhVgcg/square.jpg", categories: [Categories.architecture] },
  { name: "Pink Sunset", src: "https://i.ibb.co/y6KnZfY/IMG-3878.jpg", categories: [Categories.paysage] },
  {
    name: "Red and White",
    src: "https://i.ibb.co/YpMytxS/light-painting.jpg",
    categories: [Categories.lightPainting, Categories.night],
  },
  { name: "City", src: "https://i.ibb.co/ysVHMvJ/city.jpg", categories: [Categories.night] },
  {
    name: "Shades of Grey",
    src: "https://i.ibb.co/C57Fms3/b-w.jpg",
    categories: [Categories.bw, Categories.paysage, Categories.portrait],
  },
  {
    name: "Blue Metro",
    src: "https://i.ibb.co/gT3sKPg/blue.jpg",
    categories: [Categories.night, Categories.architecture],
  },
  { name: "The blocks", src: "https://i.ibb.co/Y0hFft2/another-blockview.jpg", categories: [Categories.architecture] },
  { name: "Free smoke", src: "https://i.ibb.co/tXZQcjk/free-smoke.jpg", categories: [Categories.night] },
  { name: "Blockview", src: "https://i.ibb.co/qr6NB0c/da-block.jpg", categories: [Categories.architecture] },
  { name: "Haxo", src: "https://i.ibb.co/9YVQv5F/haxo.jpg", categories: [Categories.architecture, Categories.night] },
  {
    name: "In the dark",
    src: "https://i.ibb.co/mHpjhtq/lamp.jpg",
    categories: [Categories.architecture, Categories.night, Categories.bw],
  },
  {
    name: "New York",
    src: "https://i.ibb.co/v3Gx3d4/newyork.jpg",
    categories: [Categories.architecture, Categories.portrait],
  },
  {
    name: "Two blocks",
    src: "https://i.ibb.co/x8z06xm/the-final-blockview.jpg",
    categories: [Categories.architecture],
  },
  { name: "Tramway", src: "https://i.ibb.co/6vWYdPQ/tramwaayy.jpg", categories: [Categories.night] },
  { name: "A View", src: "https://i.ibb.co/Kqs5J8r/view.jpg", categories: [Categories.architecture] },
  { name: "Bars", src: "https://i.ibb.co/SNnCmkw/bars.jpg", categories: [Categories.architecture, Categories.bw] },
  { name: "Bleu et Beige", src: "https://i.ibb.co/nrztJvP/bleuetbeige.jpg", categories: [Categories.architecture] },
];

export default imageList;
