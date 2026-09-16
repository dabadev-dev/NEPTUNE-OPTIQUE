export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: "Enfants" | "Femmes" | "Hommes"
  type: "Optiques" | "Solaires"
  shape: "Carrées" | "Ovales" | "Rectangulaires" | "Rondes"
}

export const products: Product[] = [
  {
    id: 1,
    name: "Lunette De Soleil",
    price: 30000,
    image: "/images/lunette1.jpg",
    category: "Femmes",
    type: "Optiques",
    shape: "Carrées",
  },
  {
    id: 2,
    name: "Lunette De Soleil 2",
    price: 30000,
    image: "/images/lunette2.jpg",
    category: "Femmes",
    type: "Optiques",
    shape: "Carrées",
  },
  {
    id: 3,
    name: "Lunette De Soleil 3",
    price: 30000,
    image: "/images/lunette3.jpg",
    category: "Hommes",
    type: "Solaires",
    shape: "Rondes",
  },
  {
    id: 4,
    name: "Lunette De Soleil 4",
    price: 30000,
    image: "/images/lunette4.jpg",
    category: "Hommes",
    type: "Optiques",
    shape: "Ovales",
  },
  {
    id: 5,
    name: "Lunette De Soleil 5",
    price: 30000,
    image: "/images/lunette5.jpg",
    category: "Femmes",
    type: "Solaires",
    shape: "Rondes",
  },
  {
    id: 6,
    name: "Lunette De Soleil 6",
    price: 30000,
    image: "/images/lunette12.jpg",
    category: "Enfants",
    type: "Optiques",
    shape: "Rondes",
  },
  {
    id: 7,
    name: "Lunette De Soleil 7",
    price: 30000,
    image: "/images/lunette7.jpg",
    category: "Hommes",
    type: "Solaires",
    shape: "Ovales",
  },
  {
    id: 8,
    name: "Lunette De Soleil 8",
    price: 30000,
    image: "/images/lunette8.jpg",
    category: "Hommes",
    type: "Solaires",
    shape: "Rondes",
  },
  {
    id: 9,
    name: "Lunette De Soleil 9",
    price: 30000,
    image: "/images/lunette9.jpg",
    category: "Femmes",
    type: "Solaires",
    shape: "Ovales",
  },
  {
    id: 10,
    name: "Lunette De Soleil Femme 1",
    price: 30000,
    image: "/images/lunette11.jpg",
    category: "Femmes",
    type: "Solaires",
    shape: "Rectangulaires",
  },
  {
    id: 11,
    name: "Lunette De Soleil Femme 1",
    price: 30000,
    image: "/images/lunette10.jpg",
    category: "Femmes",
    type: "Optiques",
    shape: "Rectangulaires",
  },
  {
    id: 12,
    name: "Lunette De Soleil Femme 1",
    price: 30000,
    image: "/images/lunette11.jpg",
    category: "Femmes",
    type: "Optiques",
    shape: "Rectangulaires",
  },
  
  
]

