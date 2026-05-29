import Pret from "./Pret.jsx";
import StockBadge from "./StockBadge.jsx";

function ProductCard({ product, onSelect }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <div className="product-price">
        <Pret valoare={product.price} />
      </div>
      <div className="product-stock">
        Stoc: {product.stock} buc
        <StockBadge stock={product.stock} />
      </div>
      <button
        className="btn-select"
        onClick={() => onSelect(product)}
        disabled={product.stock === 0}
      >
        Selectează
      </button>
    </div>
  );
}

export default ProductCard;
