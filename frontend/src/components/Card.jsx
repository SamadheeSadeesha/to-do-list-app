function Card({ children }) {
  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {children}
    </div>
  );
}

export default Card;
