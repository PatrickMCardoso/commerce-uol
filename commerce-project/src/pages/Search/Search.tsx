import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import shoppingCartIcon from "../../assets/shopping-cart.png";
import searchIcon from "../../assets/search.png";
import headphoneImage from "../../assets/headphone-image.png";

interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  postedAt: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  details: string;
  img: string;
  reviews: Review[];
  popularity: number;
}

const Search: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/71448aa4-d73a-4213-a87e-fbd7d1758109")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const getAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
  };

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate("/home")}>
          <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold">Search</h1>
        <img 
          src={shoppingCartIcon} 
          alt="Shopping Cart" 
          className="h-6 w-6 text-gray-500" 
          onClick={() => navigate("/shopping")} 
        /> 
      </div>

      {/* Campo de Busca */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search headphone"
          className="w-full p-3 pl-10 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={searchIcon} 
          alt="Search" 
          className="absolute left-3 top-3 h-5 w-5 text-gray-400" 
        />
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 overflow-y-auto">
        {/* Produtos pesquisados */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-3 border rounded-md shadow-sm cursor-pointer"
              onClick={() => navigate(`/details/${product.id}`)}
            >
              <img
                src={product.img || headphoneImage} 
                alt={product.name}
                className="w-14 h-14 rounded-md"
                onError={(e) => {
                    e.currentTarget.src = headphoneImage; // Imagem alternativa caso a original falhe
                }}
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{product.name}</h3>                
                <p className="text-sm font-medium text-gray-600">
                  USD {product.price.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 flex items-center">
                  ⭐ {getAverageRating(product.reviews).toFixed(1)} •{" "}
                  {product.reviews.length} Reviews
                </p>
              </div>
            </div>
          ))
        ) : (
          // Espaço reservado para não mover o "Popular Product"
          <div className="flex-1"></div>
        )}
      </div>

      {/* Popular Products (Sempre fixo no final) */}
      <div className="sticky bottom-0 bg-white pb-4">
        <h2 className="text-md font-semibold mb-3 mt-4">Popular product</h2>
        <div className="space-y-4">
          {products
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 3)
            .map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 border rounded-md shadow-sm cursor-pointer"
                onClick={() => navigate(`/details/${product.id}`)}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-14 h-14 rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{product.name}</h3>                
                  <p className="text-sm font-medium text-gray-600">
                    USD {product.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center">
                    ⭐ {getAverageRating(product.reviews).toFixed(1)} •{" "}
                    {product.reviews.length} Reviews
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
