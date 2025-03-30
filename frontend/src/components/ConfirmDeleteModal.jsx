function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this task?</p>
        <div style={styles.actions}>
          <button
            onClick={onConfirm}
            style={{ ...styles.button, ...styles.delete }}
          >
            Delete
          </button>
          <button
            onClick={onClose}
            style={{ ...styles.button, ...styles.cancel }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  actions: {
    marginTop: "20px",
    textAlign: "right",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
  },
  delete: {
    background: "#dc3545",
    color: "white",
    marginRight: "10px",
  },
  cancel: {
    background: "#d9d9d9",
    color: "#000",
  },
};

export default ConfirmDeleteModal;
