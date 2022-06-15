import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Topic from "./components/Topic";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:topic_name" element={<Topic />} />
      </Routes>
    </>
  );
}

export default App;
