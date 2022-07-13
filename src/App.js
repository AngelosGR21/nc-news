import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "./utils/UserContext";

import Home from "./pages/Home/Home";
import Topic from "./pages/Topic/Topic";
import Navbar from "./components/Navbar/Navbar";
import Article from "./pages/Article/Article";
import Login from "./pages/Login/Login";
import NotFound from "./pages/ErrorPage/ErrorPage";


function App() {
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setAvatar(localStorage.getItem("avatar"));
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{ username, avatar, setUsername, setAvatar }}
      >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:topic_name" element={<Topic />} />
            <Route path="/:topic_name/:article_id" element={<Article />} />
            <Route
              path="/login"
              element={
                username && avatar ? <Navigate to="/" replace /> : <Login />
              }
            />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
