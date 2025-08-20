import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import TableView from "./components/TableView"
import CalendarView from "./components/CalendarView"
import AssignmentDetail from "./components/AssignmentDetail"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/table" />} />
        <Route path="/table" element={<TableView />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/assignment/:id" element={<AssignmentDetail />} />
      </Routes>
    </div>
  )
}
