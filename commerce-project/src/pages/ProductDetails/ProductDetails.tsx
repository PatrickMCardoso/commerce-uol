import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Carousel } from "../../components/ui/carousel";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { FiShoppingCart } from "react-icons/fi";
import headphoneImage from "../../assets/headphone-image.png";
import defaultAvatar from "../../assets/default-avatar.png";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  details: string;
  reviews?: Review[];
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
}

const API_URL = "https://run.mocky.io/v3/71448aa4-d73a-4213-a87e-fbd7d1758109";

const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao buscar os produtos");
    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
};

const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const products = await getAllProducts();
    return products.find((product) => product.id === id) || null;
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
};

const getReviews = async (id: string): Promise<Review[]> => {
  try {
    const product = await getProductById(id);
    return product?.reviews ?? [];
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "features">("overview");

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([getProductById(id), getReviews(id), getAllProducts()])
        .then(([productData, reviewsData, productsData]) => {
          setProduct(productData);
          setReviews(reviewsData);
          setProducts(productsData);
        })
        .catch(error => console.error("Erro ao buscar dados:", error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex justify-between items-center p-4">
        <button onClick={() => navigate("/home")}>
          <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
        </button>

        <div className="relative">
          <FiShoppingCart size={24} className="cursor-pointer" />
        </div>
      </div>

      <p className="text-green-600 text-lg font-bold">USD {product.price}</p>
      <h1 className="text-3xl font-bold">{product.name}</h1>

      <div className="flex gap-4 my-4">
        <button 
          className={`border-b-2 ${activeTab === "overview" ? "border-green-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button 
          className={`border-b-2 ${activeTab === "features" ? "border-green-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
      </div>

      {activeTab === "overview" ? (
        <>
          <img src={headphoneImage} alt={product.name} className="w-full h-64 object-contain" />

          <h2 className="text-xl font-semibold mt-6 mb-5">Reviews ({reviews.length})</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="border-b py-3 flex items-start">
                <img src={defaultAvatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  <p>{"⭐".repeat(review.rating)}</p>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma avaliação disponível.</p>
          )}

          <h3 className="text-xl font-semibold mt-10 mb-4 flex justify-between items-center">
            Another Product
            <button 
              className="text-gray-500 p-0 text-lg hover:underline font-normal"
              onClick={() => navigate("/explore-products")}
            >
              See All
            </button>
          </h3>
          <Carousel>
            {products.map((prod) => (
              <div 
                key={prod.id} 
                className="flex flex-col items-center cursor-pointer" 
                onClick={() => navigate(`/product-details/${prod.id}`)}
              >
                <img src={headphoneImage} alt={prod.name} className="w-full max-w-xs h-40 object-contain mb-2" />
                <Card className="w-full text-center p-2">
                  <CardContent>
                    <h4 className="text-2xl font-semibold">{prod.name}</h4>
                    <p className="text-lg font-bold text-gray-600">USD {prod.price}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Carousel>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-4">Highly Detailed Audio</h2>
          {[...Array(3)].map((_, index) => (
            <p key={`detail-${index}`} className="text-gray-600 mt-4">
              {product.details}
            </p>
          ))}
        </>
      )}

      <button 
        className="w-full bg-green-500 text-white text-lg font-bold py-3 rounded-md mt-6"
      >
        Add To Cart
      </button>

    </div>
  );
};

export default ProductDetails;