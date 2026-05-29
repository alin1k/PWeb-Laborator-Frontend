import ProductCard from "./ProductCard.jsx";

function ProductsList({ products, loading, error, onSelect, onUpdateStock }) {
  if (loading) {
    return <p className="status">Se încarcă produsele...</p>;
  }

  if (error) {
    return (
      <p className="status status-error">
        Eroare la încărcarea produselor: {error.message}
      </p>
    );
  }

  if (products.length === 0) {
    return <p className="empty">Niciun produs găsit.</p>;
  }

  return (
    <section className="product-list">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onSelect={onSelect}
          onUpdateStock={onUpdateStock}
        />
      ))}
    </section>
  );
}

export default ProductsList;
