import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import modalStyles from "../styles/modalStyles";

function TaskModal({ isOpen, onClose, onSave, taskToEdit }) {
  const [form, setForm] = useState({ title: "", datetime: null });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      const dt = new Date(taskToEdit.date);
      setForm({ title: taskToEdit.title, datetime: dt });
    } else {
      resetForm();
    }
  }, [taskToEdit, isOpen]);

  const resetForm = () => {
    setForm({ title: "", datetime: null });
    setErrors({});
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({ title: form.title.trim(), date: form.datetime });
    onClose();
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!form.title.trim()) validationErrors.title = "Title is required.";
    if (!form.datetime)
      validationErrors.datetime = "Date and time is required.";
    return validationErrors;
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>{taskToEdit ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <label style={modalStyles.label}>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task title"
            style={modalStyles.input}
          />
          {errors.title && <p style={modalStyles.error}>{errors.title}</p>}

          <label style={modalStyles.label}>Date & Time</label>
          <DatePicker
            selected={form.datetime}
            onChange={(date) =>
              setForm((prev) => ({ ...prev, datetime: date }))
            }
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="dd/MM/yyyy, h:mm aa"
            placeholderText="Select date and time"
            minDate={new Date()}
            className="custom-datepicker-input"
            wrapperClassName="date-wrapper"
          />
          {errors.datetime && (
            <p style={modalStyles.error}>{errors.datetime}</p>
          )}

          <div style={{ marginTop: "10px", textAlign: "right" }}>
            <button type="submit" style={modalStyles.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              style={modalStyles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
