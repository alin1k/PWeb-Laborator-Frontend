import { useEffect, useState } from "react";
import { productApi } from "./api/productApi";

function ProductDetail({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    productApi
      .getById(id)
      .then(setProduct)
      .catch((err) => {
        if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          setError(err);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="status">Se încarcă produsul...</p>;
  }

  if (notFound) {
    return (
      <p className="status status-error">
        Produsul cu id-ul {id} nu există.
      </p>
    );
  }

  if (error) {
    return (
      <p className="status status-error">
        Eroare la încărcarea produsului: {error.message}
      </p>
    );
  }

  return (
    <>
      <p>
        <strong>{product.name}</strong>
      </p>
      <p>Preț: {product.price.toFixed(2)} lei</p>
      <p>Stoc: {product.stock} buc</p>
    </>
  );
}

export default ProductDetail;
