import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

export default function TableView() {
  const [assignments, setAssignments] = useState([])
  const navigate = useNavigate()

  // Fetch assignments from Supabase
  useEffect(() => {
    async function fetchAssignments() {
      const { data, error } = await supabase
        .from("assignments")
        .select("*")
        .order("due_date", { ascending: true })

      if (error) console.error(error)
      else setAssignments(data)
    }

    fetchAssignments()
  }, [])

  // Group sub-steps by parent_id
  const parentMap = assignments.reduce((acc, a) => {
    if (a.parent_id) {
      if (!acc[a.parent_id]) acc[a.parent_id] = []
      acc[a.parent_id].push(a)
    }
    return acc
  }, {})

  // Top-level assignments
  const topLevel = assignments.filter(a => !a.parent_id)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>

      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-1">Subject</th>
            <th className="border px-3 py-1">Assignment Name</th>
            <th className="border px-3 py-1">Type</th>
            <th className="border px-3 py-1">Extra</th>
            <th className="border px-3 py-1">Due Date</th>
            <th className="border px-3 py-1">Note</th>
          </tr>
        </thead>
        <tbody>
          {topLevel.length === 0 ? (
            <tr>
              <td colSpan="6" className="border px-3 py-2 text-center text-gray-500">
                No assignments yet.
              </td>
            </tr>
          ) : (
            topLevel.map(a => (
              <React.Fragment key={a.id}>
                <tr
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/assignment/${a.id}`)}
                >
                  <td className="border px-3 py-1">{a.subject}</td>
                  <td className="border px-3 py-1 font-semibold">{a.name}</td>
                  <td className="border px-3 py-1">{a.type}</td>
                  <td className="border px-3 py-1">{a.extra}</td>
                  <td className="border px-3 py-1">{a.due_date}</td>
                  <td className="border px-3 py-1">{a.note}</td>
                </tr>

                {/* Render sub-steps if any */}
                {parentMap[a.id]?.map(sub => (
                  <tr
                    key={sub.id}
                    className="cursor-pointer hover:bg-gray-100 bg-gray-50"
                    onClick={() => navigate(`/assignment/${a.id}`)}
                  >
                    <td className="border px-3 py-1">{sub.subject}</td>
                    <td className="border px-3 py-1 pl-6">↳ {sub.name}</td>
                    <td className="border px-3 py-1">{sub.type}</td>
                    <td className="border px-3 py-1">{sub.extra}</td>
                    <td className="border px-3 py-1">{sub.due_date}</td>
                    <td className="border px-3 py-1">{sub.note}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
