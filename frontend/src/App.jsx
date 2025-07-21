import { useState } from "react";
import Navbar from "./General/NavBar";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookings" element={<h1>Bookings Page</h1>} />
          <Route path="/itinerary" element={<h1>Itinerary Page</h1>} />
          <Route path="/diary" element={<h1>Diary Page</h1>} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
