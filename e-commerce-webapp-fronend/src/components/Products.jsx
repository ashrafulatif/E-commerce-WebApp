import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/product-management",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token]);

  const addToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:1000/cart-management/add-product-cart",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.productName}
          </h3>
          <p className="text-gray-500">Price: {product.price} €</p>
          <p className="text-gray-600">Description: {product.pDtdescription}</p>
          <button
            className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-md"
            onClick={() => addToCart(product.id)} // Call the addToCart function
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
