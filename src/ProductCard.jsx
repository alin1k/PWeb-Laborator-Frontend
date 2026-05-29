import Pret from "./Pret.jsx";
import StockBadge from "./StockBadge.jsx";

function ProductCard({ product, onSelect, onUpdateStock }) {
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
      <div className="stock-controls">
        <button
          className="btn-stock"
          onClick={() => onUpdateStock(product.id, -1)}
          disabled={product.stock === 0}
          aria-label="Scade stoc"
        >
          −
        </button>
        <button
          className="btn-stock"
          onClick={() => onUpdateStock(product.id, 1)}
          aria-label="Crește stoc"
        >
          +
        </button>
      </div>
      <button
        className="btn-select"
        onClick={() => onSelect(product.id)}
        disabled={product.stock === 0}
      >
        Selectează
      </button>
    </div>
  );
}

export default ProductCard;
