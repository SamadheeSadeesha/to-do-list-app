import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import TaskModal from "./TaskModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState("all");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleSave = async (task) => {
    try {
      if (taskToEdit) {
        await axios.put(`/tasks/${taskToEdit._id}`, task);
        toast.success("Task updated successfully!");
      } else {
        await axios.post("/tasks", task);
        toast.success("Task created successfully!");
      }
      fetchTasks();
      setTaskToEdit(null);
    } catch {
      toast.error("Failed to save task");
    }
  };

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString("en-GB"),
      time: date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const isToday = (dateStr) => {
    const today = new Date().toLocaleDateString("en-GB");
    const taskDate = new Date(dateStr).toLocaleDateString("en-GB");
    return taskDate === today;
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "today" ? isToday(task.date) : true
  );

  const sortTasks = (order) => {
    const sorted = [...tasks].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setTasks(sorted);
  };

  const renderTaskCard = (task) => {
    const { date, time } = formatDateTime(task.date);

    return (
      <div
        key={task._id}
        style={{
          display: "flex",
          alignItems: "center",
          background: "#fff",
          borderRadius: "10px",
          padding: "8px 16px",
          marginBottom: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ flex: 1, marginLeft: "12px" }}>
          <p style={{ fontSize: "18px", fontWeight: 500 }}>{task.title}</p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            {time}, {date}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              setTaskToEdit(task);
              setIsModalOpen(true);
            }}
            title="Edit Task"
            style={iconButtonStyle}
          >
            <FiEdit3 />
          </button>

          <button
            onClick={() => {
              setTaskToDelete(task);
              setIsDeleteModalOpen(true);
            }}
            title="Delete Task"
            style={iconButtonStyle}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          margin: "40px 0",
          fontSize: "35px",
        }}
      >
        To-Do List
      </h2>

      <div style={toolbarStyle}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="all">All Tasks</option>
          <option value="today">Today's Tasks</option>
        </select>

        <select
          onChange={(e) => {
            setSortOrder(e.target.value);
            sortTasks(e.target.value);
          }}
          value={sortOrder}
          style={selectStyle}
        >
          <option value="asc">Sort by Date & Time (Due Soonest First)</option>
          <option value="desc">Sort by Date & Time (Due Latest First)</option>
        </select>

        <button
          onClick={() => {
            setTaskToEdit(null);
            setIsModalOpen(true);
          }}
          style={addButtonStyle}
        >
          Add Task
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#888",
            marginTop: "120px",
            fontSize: "18px",
          }}
        >
          No tasks found
        </p>
      ) : (
        filteredTasks.map(renderTaskCard)
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        taskToEdit={taskToEdit}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={async () => {
          if (taskToDelete) {
            await handleDelete(taskToDelete._id);
            setIsDeleteModalOpen(false);
            setTaskToDelete(null);
          }
        }}
      />
    </div>
  );
}

const toolbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px",
  borderRadius: "8px",
  marginBottom: "24px",
  gap: "10px",
};

const selectStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "16px",
  cursor: "pointer",
};

const addButtonStyle = {
  background: "#007bff",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

const iconButtonStyle = {
  color: "#000",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
};

export default TaskTable;
