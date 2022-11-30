import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StoryForm from "./pages/StoryForm";
import UpdateForm from "./pages/UpdateForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { userActions } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // checking for an existing user in the local storage
  //and dispatching it to the redux store

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      dispatch(userActions.setUser(storedUser));
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="./login" />}
            />
            <Route
              path="/write"
              element={user ? <StoryForm /> : <Navigate to="./login" />}
            />
            <Route
              path="/update/:id"
              element={user ? <UpdateForm /> : <Navigate to="./login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
