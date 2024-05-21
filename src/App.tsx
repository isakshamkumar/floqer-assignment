import "./App.css";
import Header from "./components/Header";
import { Layout } from "antd";
import SallaryData from "./components/SallaryData";

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <SallaryData />
    </Layout>
  );
}

export default App;
