import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Carousel } from "../../components/ui/carousel";
import { products } from "../../data/products";
import defaultAvatar from "../../assets/default-avatar.png";
import menuIcon from "../../assets/menu-variant.png";
import greenIcon from "../../assets/green-icon.png";
import searchIcon from "../../assets/search.png";
import headphoneImage from "../../assets/headphone-image.png";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-4">
      <header className="flex items-center justify-between">
        <img src={menuIcon} alt="Menu" className="w-6 h-6" />

        <div className="flex items-center gap-2">
          <img src={greenIcon} alt="Icon" className="w-5 h-5" />
          <h1 className="text-xl font-bold">Audio</h1>
        </div>

        <img src={defaultAvatar} alt="User" className="w-8 h-8 rounded-full" />
      </header>
      <h2 className="text-lg text-gray-500 mt-6">Hi, Andrea</h2>
      <p className="text-3xl font-bold text-gray-700 mb-7">What are you looking for today?</p>

      <div className="relative mt-2 w-full mb-12">
        <img 
          src={searchIcon} 
          alt="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
        />
        
        <Input
          placeholder="Search headphone"
          className="pl-10 w-full" 
          onClick={() => navigate("/search")}
        />
      </div>
      
      <div className="mt-6 flex space-x-2">
        <Button
          variant={selected === "headphone" ? "selected" : "outline"}
          className="mr-2"
          onClick={() => setSelected("headphone")}
        >
          Headphone
        </Button>
        <Button
          variant={selected === "headset" ? "selected" : "ghost"}
          onClick={() => setSelected("headset")}
        >
          Headset
        </Button>
      </div>

      <Card className="mt-4 flex items-center justify-between p-6 rounded-xl">
        <CardContent className="p-0">
          <h3 className="text-xl font-bold">TMA-2 Modular Headphone</h3>
          <button 
            className="text-[#0ACF83] flex items-center gap-1 mt-4 transition-colors hover:text-[#08b76f]"
            onClick={() => navigate("/product-detail")}
          >
            Shop now <span>→</span>
          </button>
        </CardContent>
        <img src={headphoneImage} alt="Headphone" className="w-32 h-32" />
      </Card>

      <div className="px-4">
        <h3 className="text-lg font-bold mt-6 flex justify-between items-center">
          Featured Products
          <button 
            className="text-gray-500 p-0 text-lg hover:underline font-normal"
            onClick={() => navigate("/explore-products")}
          >
            See All
          </button>
        </h3>

        <div className="w-full flex flex-col items-center justify-center">
          <Carousel>
            {products.map((product) => (
              <div key={product.id} className="w-full flex flex-col items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full max-w-xs h-40 object-contain mb-2" 
                />
                <Card className="w-full text-center p-2"> 
                  <CardContent>
                    <h4 className="text-2xl font-semibold">{product.name}</h4>
                    <p className="text-lg font-bold text-gray-600">USD {product.price}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;