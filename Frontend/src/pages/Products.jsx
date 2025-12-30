// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";

// import FilterSidebar from "@/components/FilterSidebar";
// import ProductCard from "@/components/ProductCard";
// import { setProducts } from "@/redux/productSlice";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const Product = () => {
//   // ✅ Corrected useSelector
//   const { Products } = useSelector((store) => store.product || { products: [] });

//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const dispatch = useDispatch();

//   // Filters
//   const [sort, setSort] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedBrand, setSelectedBrand] = useState("All");
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch products
//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         "http://localhost:8000/api/v1/product/getallproducts"
//       );
//       if (res.data.success) {
//         setAllProducts(res.data.products);
//         dispatch(setProducts(res.data.products));
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(
//         error.response?.data?.message || "Failed to fetch products"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   // Filtered & Sorted Products
//   const filteredProducts = useMemo(() => {
//     let filtered = [...allProducts];

//     if (selectedCategory !== "All") {
//       filtered = filtered.filter((p) => p.category === selectedCategory);
//     }
//     if (selectedBrand !== "All") {
//       filtered = filtered.filter((p) => p.brand === selectedBrand);
//     }

//     filtered = filtered.filter(
//       (p) =>
//         p.productPrice >= (priceRange.min || 0) &&
//         p.productPrice <= (priceRange.max || 1000000)
//     );

//     if (searchQuery.trim() !== "") {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (p) =>
//           p.productName.toLowerCase().includes(query) ||
//           p.brand.toLowerCase().includes(query) ||
//           p.category.toLowerCase().includes(query)
//       );
//     }

//     if (sort === "LowToHigh") {
//       filtered.sort((a, b) => a.productPrice - b.productPrice);
//     } else if (sort === "HighToLow") {
//       filtered.sort((a, b) => b.productPrice - a.productPrice);
//     }

//     return filtered;
//   }, [allProducts, selectedCategory, selectedBrand, priceRange, searchQuery, sort]);

//   return (
//     <div className="pt-24 pb-20">
//       <div className="max-w-7xl mx-auto flex gap-7">
//         {/* Sidebar */}
//         <FilterSidebar
//           allProducts={allProducts}
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//           selectedBrand={selectedBrand}
//           setSelectedBrand={setSelectedBrand}
//           priceRange={priceRange}
//           setPriceRange={setPriceRange}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//         />

//         {/* Main product section */}
//         <div className="flex flex-col flex-1">
//           {/* Sort */}
//           <div className="flex justify-end mb-4">
//             <Select onValueChange={(value) => setSort(value)}>
//               <SelectTrigger className="w-[200px]">
//                 <SelectValue placeholder="Sort by price" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectItem value="LowToHigh">Price: Low To High</SelectItem>
//                   <SelectItem value="HighToLow">Price: High To Low</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Products */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
//             {loading
//               ? Array.from({ length: 10 }).map((_, i) => (
//                   <ProductCard key={i} loading={true} />
//                 ))
//               : filteredProducts.length === 0
//               ? (
//                 <p className="col-span-full text-center text-gray-500">
//                   No products found
//                 </p>
//               )
//               : filteredProducts.map((product) => (
//                   <ProductCard key={product._id} product={product} />
//                 ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;

















































import React, { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

import FilterSidebar from "@/components/FilterSidebar"
import ProductCard from "@/components/ProductCard"
import { setProducts } from "@/redux/productSlice"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Product = () => {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  // Filters
  const [sort, setSort] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 })
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        "http://localhost:8000/api/v1/product/getallproducts"
      )
      if (res.data.success) {
        setAllProducts(res.data.products)
        dispatch(setProducts(res.data.products))
      }
    } catch (error) {
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  // ✅ CASE-INSENSITIVE FILTERING
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) =>
          p.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (selectedBrand !== "All") {
      filtered = filtered.filter(
        (p) =>
          p.brand?.toLowerCase() === selectedBrand.toLowerCase()
      )
    }

    filtered = filtered.filter(
      (p) =>
        Number(p.productPrice) >= priceRange.min &&
        Number(p.productPrice) <= priceRange.max
    )

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.productName?.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
      )
    }

    if (sort === "LowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice)
    } else if (sort === "HighToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice)
    }

    return filtered
  }, [
    allProducts,
    selectedCategory,
    selectedBrand,
    priceRange,
    searchQuery,
    sort,
  ])

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto flex gap-7">
        {/* Sidebar */}
        <FilterSidebar
          allProducts={allProducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Products */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-end mb-4">
            <Select onValueChange={setSort}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="LowToHigh">Price: Low → High</SelectItem>
                  <SelectItem value="HighToLow">Price: High → Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <ProductCard key={i} loading />
              ))
            ) : filteredProducts.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                No products found
              </p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
