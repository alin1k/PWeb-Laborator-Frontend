function Pret({ valoare, moneda = "lei" }) {
  return (
    <span>
      {valoare.toFixed(2)} {moneda}
    </span>
  );
}

export default Pret;
