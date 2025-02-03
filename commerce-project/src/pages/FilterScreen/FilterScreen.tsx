import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

interface FilterScreenProps {
  setFilter: (filter: { category: string; sortBy: string }) => void;
  onClose: () => void;
}

const FilterScreen: React.FC<FilterScreenProps> = ({ setFilter, onClose }) => {
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  //const navigate = useNavigate();

  const applyFilter = () => {
    setFilter({ category, sortBy });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Filter</h2>
        
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">Category</h3>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded ${category === "headphones" ? "bg-green-500 text-white" : "bg-gray-200"}`}
              onClick={() => setCategory("headphones")} 
            >
              Headphones
            </button>
            <button 
              className={`px-4 py-2 rounded ${category === "headsets" ? "bg-green-500 text-white" : "bg-gray-200"}`}
              onClick={() => setCategory("headsets")}
            >
              Headsets
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">Sort By</h3>
          <div className="grid grid-cols-3 gap-2">
            {['popularity', 'newest', 'oldest', 'highPrice', 'lowPrice'].map(option => (
              <button 
                key={option}
                className={`px-4 py-2 rounded ${sortBy === option ? "bg-green-500 text-white" : "bg-gray-200"}`}
                onClick={() => setSortBy(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <button className="bg-green-500 text-white w-full py-2 rounded" onClick={applyFilter}>
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default FilterScreen;