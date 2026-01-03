import React, { useEffect, useState } from "react"
import axios from "axios"
import { Trash2, SquarePen, Plus, Search } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "@/lib/api"

const AdminProduct = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem("accessToken")
  const navigate = useNavigate()

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
      `${BASE_URL}/admin/my-products`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setProducts(res.data.products)
      setFilteredProducts(res.data.products)
    } catch {
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const value = search.toLowerCase()
    setFilteredProducts(
      products.filter(
        (p) =>
          p.productName.toLowerCase().includes(value) ||
          p.category.toLowerCase().includes(value) ||
          p.brand.toLowerCase().includes(value)
      )
    )
  }, [search, products])

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/admin/delete-product/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      toast.success("Product deleted")
      setProducts((prev) => prev.filter((p) => p._id !== id))
      setFilteredProducts((prev) => prev.filter((p) => p._id !== id))
    } catch {
      toast.error("Delete failed")
    }
  }

  if (loading)
    return (
      <p className="pt-16 text-center text-gray-500">
        Loading products...
      </p>
    )

  return (
    <div className="pt-14 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-sm text-gray-500">Manage your store products</p>
        </div>

        <button
          onClick={() => navigate("/dashboard/add-product")}
          className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2.5 rounded-xl shadow hover:bg-pink-700 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-lg">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product, category or brand..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border bg-white shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow border overflow-x-auto">
        <table className="w-full text-sm table-auto min-w-[900px]">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="text-left">Category</th>
              <th className="text-left">Brand</th>
              <th className="text-left">Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No matching products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 flex items-center gap-4 max-w-[250px]">
                    <img
                      src={p.productimg?.[0]?.url}
                      alt={p.productName}
                      className="w-14 h-14 rounded-xl object-cover border"
                    />
                    <div className="truncate">
                      <p className="font-semibold text-gray-800 truncate">
                        {p.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {p._id.slice(-6)}
                      </p>
                    </div>
                  </td>

                  <td>
                    <span className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-medium">
                      {p.category}
                    </span>
                  </td>

                  <td>
                    <span className="px-3 py-1 rounded-md bg-purple-100 text-purple-700 text-xs font-medium">
                      {p.brand}
                    </span>
                  </td>

                  <td className="font-semibold text-gray-800">₹{p.productPrice}</td>

                  <td className="text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/edit-product/${p._id}`)
                        }
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                      >
                        <SquarePen size={18} />
                      </button>

                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProduct
