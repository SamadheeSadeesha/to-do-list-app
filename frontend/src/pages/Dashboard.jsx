import Header from "../components/Header";
import TaskTable from "../components/TaskTable";

function Dashboard() {
  return (
    <main>
      <Header />
      <section style={styles.container}>
        <TaskTable />
      </section>
    </main>
  );
}

const styles = {
  container: {
    marginTop: "24px",
    padding: "0 16px",
  },
};

export default Dashboard;
