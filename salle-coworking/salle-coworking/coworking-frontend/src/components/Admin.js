import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import RoomManagement from "./admin/RoomManagement";
import "./admin/Admin.css";

const Admin = () => {
    return (
        <section className="container mt-5" style={{ backgroundColor: "#f5f5dc", minHeight: "100vh", padding: "2rem 1rem" }}>
            <h2 className="text-center">Welcome, Administrator!</h2>
            <Link to="/admin/rooms" className="btn btn-primary">Room Management</Link>
            <Routes>
                <Route path="/rooms" element={<RoomManagement />} />
            </Routes>
        </section>
    );
};

export default Admin;
