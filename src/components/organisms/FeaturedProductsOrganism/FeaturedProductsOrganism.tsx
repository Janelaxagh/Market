import { useState, useEffect } from "react";
import { DiscountProductsMolecules } from "../../molecules/";
import { Product } from "../../atoms/ProductCard/ProductCard.interface";
import ProductController from "../../../controllers/ProductController";

export const FeaturedProductsOrganism = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productsData = await ProductController.getProduct();
        setProducts(productsData.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProduct();
  }, []);

  return (
    <div>
      <DiscountProductsMolecules products={products} />
    </div>
  );
};
