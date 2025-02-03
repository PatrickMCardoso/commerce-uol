import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Importe o hook useNavigate
import { ChevronLeftIcon } from "@heroicons/react/24/solid"; // Importe o ícone
import { FiShoppingCart } from "react-icons/fi"; // Ícone do carrinho
import slidersIcon from "../../assets/sliders.png"; // Importe a imagem
import headphoneImage from "../../assets/headphone-image.png"; // Importe a imagem do headphone

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  reviews: { rating: number }[];
  popularity: number;
  createdAt: string;
}

interface ExploreProductsProps {
  filter: { category: string; sortBy: string };
  onOpenFilter: () => void;
}

export default function ExploreProducts({ filter, onOpenFilter }: ExploreProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate(); // Use o hook useNavigate

  useEffect(() => {
    fetch("https://run.mocky.io/v3/71448aa4-d73a-4213-a87e-fbd7d1758109")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    if (!products.length) return; // Evita executar antes do carregamento
    let filtered = [...products];
  
    if (filter.category) {
      // Verifique se a categoria está presente antes de filtrar
      filtered = filtered.filter(product => product.category === filter.category);
    }
  
    if (filter.sortBy) {
      switch (filter.sortBy) {
        case "popularity":
          filtered.sort((a, b) => b.popularity - a.popularity);
          break;
        case "newest":
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "oldest":
          filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        case "highPrice":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "lowPrice":
          filtered.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }
    }
  
    setFilteredProducts(filtered);
    console.log("Produtos filtrados:", filtered); // Debug
  }, [filter, products]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center p-4">
        {/* Ícone de voltar */}
        <button onClick={() => navigate("/home")}>
          <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
        </button>

        {/* Ícone do carrinho com notificação */}
        <div className="relative">
          <FiShoppingCart size={24} className="cursor-pointer" />
          <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full px-1">
            2
          </span>
        </div>
      </div>

      {/* Título centralizado */}
      <h2 className="text-2xl font-bold text-left mt-2 mb-4">All Products</h2>

      {/* Botão de filtro estilizado */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onOpenFilter}
        className="border p-3 rounded-lg flex justify-center items-center w-full mb-30"
      >
        <img src={slidersIcon} alt="Filter" className="mr-2 h-5 w-5" />
        Filter
      </motion.button>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {filteredProducts.map((product) => (
          <motion.div key={product.id} className="border p-4 rounded-lg shadow-md" whileHover={{ scale: 1.05 }}>
            <img src={headphoneImage} alt={product.name} className="w-full h-32 object-cover rounded-lg" />
            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p className="text-black-500 font-bold mb-2">USD{product.price}</p>
            <div className="flex items-center text-xs text-black-500">
              <span>⭐ {(
                product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
              ).toFixed(1)}</span>
              <span className="ml-1">• {product.reviews.length} Reviews</span>
              <button
                onClick={() => navigate(`/product-details/${product.id}`)}
                className="text-black-500 ml-auto"
              >
                ⋮
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}