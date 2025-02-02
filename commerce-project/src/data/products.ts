import headphoneImage from "../assets/headphone-image.png";
import cableImage from "../assets/cable-image.png";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  { id: 1, name: "TMA-2 HD Wireless", price: 350, image: headphoneImage, category: "Headphone" },
  { id: 2, name: "CO2 – Cable", price: 25, image: cableImage, category: "Headphone" },
  { id: 3, name: "TMA-2 Modular Headphone", price: 200, image: headphoneImage, category: "Headphone" },
];