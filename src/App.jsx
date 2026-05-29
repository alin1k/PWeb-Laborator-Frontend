import { useEffect, useState } from "react";
import LoginForm from "./LoginForm.jsx";
import ProductsList from "./ProductsList.jsx";
import ProductSummary from "./ProductSummary.jsx";
import { productApi } from "./api/productApi";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("jwt") !== null
  );
  const [produse, setProduse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectat, setSelectat] = useState(null);
  const [filtru, setFiltru] = useState("");
  const [sortBy, setSortBy] = useState("implicit");

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    setError(null);
    productApi
      .getAll()
      .then(setProduse)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const actualizeazaStoc = (productId, delta) => {
    setProduse((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, stock: Math.max(0, p.stock + delta) }
          : p
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setProduse([]);
    setSelectat(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="app">
        <LoginForm onSuccess={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  const produseFiltrate = produse.filter((p) =>
    p.name.toLowerCase().includes(filtru.toLowerCase())
  );

  const produseAfisate = (() => {
    if (sortBy === "asc") {
      return [...produseFiltrate].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "desc") {
      return [...produseFiltrate].sort((a, b) => b.price - a.price);
    }
    return produseFiltrate;
  })();

  return (
    <div className="app">
      <header>
        <h1>Catalog produse</h1>
        <div className="controls">
          <input
            className="search"
            placeholder="Caută..."
            value={filtru}
            onChange={(e) => setFiltru(e.target.value)}
          />
          <select
            className="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="implicit">Implicit</option>
            <option value="asc">Preț crescător</option>
            <option value="desc">Preț descrescător</option>
          </select>
          <button className="btn-logout" onClick={handleLogout}>
            Deconectează
          </button>
        </div>
      </header>
      <ProductSummary products={produse} />
      <main>
        <ProductsList
          products={produseAfisate}
          loading={loading}
          error={error}
          onSelect={setSelectat}
          onUpdateStock={actualizeazaStoc}
        />
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
