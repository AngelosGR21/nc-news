import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Topic from "./components/Topic";
import Navbar from "./components/Navbar/Navbar";

import { ThemeProvider } from "@mui/private-theming";
import theme from "./styles/customTheme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:topic_name" element={<Topic />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
