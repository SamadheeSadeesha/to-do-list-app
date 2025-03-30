function PrimaryButton({ text, onClick, disabled, loading, type = "button" }) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      style={{
        ...styles.button,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.7 : 1,
      }}
    >
      {loading ? "Loading..." : text}
    </button>
  );
}

const styles = {
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "4px",
    width: "100%",
    fontSize: "16px",
  },
};

export default PrimaryButton;
