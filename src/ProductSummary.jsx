import Pret from "./Pret.jsx";

function ProductSummary({ products }) {
  const total = products.length;
  const valoareStoc = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );
  const sumaPreturi = products.reduce((sum, p) => sum + p.price, 0);
  const pretMediu = total === 0 ? 0 : sumaPreturi / total;
  const indisponibile = products.filter((p) => p.stock === 0).length;

  return (
    <section className="product-summary">
      <div className="summary-item">
        <span className="summary-label">Total produse</span>
        <span className="summary-value">{total}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Valoare stoc</span>
        <span className="summary-value">
          <Pret valoare={valoareStoc} />
        </span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Preț mediu</span>
        <span className="summary-value">
          <Pret valoare={pretMediu} />
        </span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Indisponibile</span>
        <span className="summary-value">{indisponibile}</span>
      </div>
    </section>
  );
}

export default ProductSummary;
