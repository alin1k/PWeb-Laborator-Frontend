import { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import "./App.css";

const PRODUSE_INITIALE = [
  { id: 1, name: "Tastatură mecanică", price: 349.9, stock: 12 },
  { id: 2, name: "Monitor 27 inch 4K", price: 1899.0, stock: 3 },
  { id: 3, name: "Mouse wireless", price: 159.5, stock: 0 },
  { id: 4, name: "Webcam HD", price: 229.0, stock: 7 },
];

function App() {
  const [produse] = useState(PRODUSE_INITIALE);
  const [selectat, setSelectat] = useState(null);
  const [filtru, setFiltru] = useState("");

  const produseFiltrate = produse.filter((p) =>
    p.name.toLowerCase().includes(filtru.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>Catalog produse</h1>
        <input
          className="search"
          placeholder="Caută..."
          value={filtru}
          onChange={(e) => setFiltru(e.target.value)}
        />
      </header>
      <main>
        <section className="product-list">
          {produseFiltrate.length === 0 ? (
            <p className="empty">Niciun produs găsit.</p>
          ) : (
            produseFiltrate.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={setSelectat} />
            ))
          )}
        </section>
        {selectat && (
          <aside className="selected-info">
            <h2>Produs selectat</h2>
            <p>
              <strong>{selectat.name}</strong>
            </p>
            <p>Preț: {selectat.price.toFixed(2)} lei</p>
            <p>Stoc: {selectat.stock} buc</p>
            <button onClick={() => setSelectat(null)}>Închide</button>
          </aside>
        )}
      </main>
    </div>
  );
}

export default App;
