import React, { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";

const normalize = (value) =>
  value ? value.trim().toLowerCase() : "";

const FilterSidebar = ({
  allProducts,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  searchQuery,
  setSearchQuery,
}) => {

  /* =======================
     UNIQUE CATEGORIES
  ======================= */
  const categories = useMemo(() => {
    if (!allProducts?.length) return ["All"];

    const unique = new Set(
      allProducts.map((p) => normalize(p.category))
    );

    return ["All", ...unique];
  }, [allProducts]);

  /* =======================
     UNIQUE BRANDS
  ======================= */
  const brands = useMemo(() => {
    if (!allProducts?.length) return ["All"];

    const unique = new Set(
      allProducts.map((p) => normalize(p.brand))
    );

    return ["All", ...unique];
  }, [allProducts]);

  /* =======================
     PRICE RANGE
  ======================= */
  const minPrice = allProducts.length
    ? Math.min(...allProducts.map((p) => p.productPrice))
    : 0;

  const maxPrice = allProducts.length
    ? Math.max(...allProducts.map((p) => p.productPrice))
    : 1000;

  const [localPriceRange, setLocalPriceRange] = useState({
    min: priceRange?.min || minPrice,
    max: priceRange?.max || maxPrice,
  });

  useEffect(() => {
    setLocalPriceRange({
      min: priceRange?.min || minPrice,
      max: priceRange?.max || maxPrice,
    });
  }, [priceRange, minPrice, maxPrice]);

  const handlePriceChange = (range) => {
    setLocalPriceRange(range);
    setPriceRange(range);
  };

  return (
    <div className="w-64 bg-gray-100 border border-gray-200 rounded-2xl p-5 space-y-6 sticky top-36 shadow-sm max-h-[80vh] overflow-y-auto">

      {/* 🔍 SEARCH */}
      <div>
        <label className="text-xs font-semibold text-gray-600">SEARCH</label>
        <div className="relative mt-2">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400"
          />
        </div>
      </div>

      {/* 📦 CATEGORY */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">CATEGORY</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left text-sm px-4 py-2 rounded-xl border transition capitalize
                ${
                  selectedCategory === cat
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white border-gray-200 hover:bg-pink-50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 🏷 BRAND */}
      <div>
        <h3 className="text-xs font-semibold text-gray-600 mb-2">BRAND</h3>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 uppercase focus:ring-2 focus:ring-pink-300"
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* 💰 PRICE */}
      <div className="bg-white p-4 rounded-xl border space-y-3">
        <h3 className="text-xs font-semibold text-gray-600">PRICE RANGE</h3>

        <input
          type="number"
          value={localPriceRange.min}
          onChange={(e) =>
            handlePriceChange({
              ...localPriceRange,
              min: Number(e.target.value),
            })
          }
          className="w-full px-4 py-2 rounded-lg border"
        />

        <input
          type="number"
          value={localPriceRange.max}
          onChange={(e) =>
            handlePriceChange({
              ...localPriceRange,
              max: Number(e.target.value),
            })
          }
          className="w-full px-4 py-2 rounded-lg border"
        />

        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={localPriceRange.max}
          onChange={(e) =>
            handlePriceChange({
              ...localPriceRange,
              max: Number(e.target.value),
            })
          }
          className="w-full accent-pink-500"
        />

        <button
          onClick={() => handlePriceChange({ min: minPrice, max: maxPrice })}
          className="w-full py-2 text-sm text-pink-600 border border-pink-400 rounded-lg hover:bg-pink-50"
        >
          Reset Price
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
