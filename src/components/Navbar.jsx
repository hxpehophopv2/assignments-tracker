import React from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-gray-100 shadow-md">
      <div className="space-x-2">
        <Link to="/table" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Table
        </Link>
        <Link to="/calendar" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Calendar
        </Link>
      </div>
      <Link
        to="/add"
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        + Add Assignment
      </Link>
    </nav>
  )
}
