import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

export default function AssignmentDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [assignment, setAssignment] = useState(null)
    const [subSteps, setSubSteps] = useState([])

    useEffect(() => {
        async function fetchAssignment() {
        // Fetch main assignment
        const { data: mainData, error: mainError } = await supabase
            .from("assignments")
            .select("*")
            .eq("id", id)
            .single()

        if (mainError) {
            console.error(mainError)
            return
        }

        setAssignment(mainData)

        // Fetch sub-steps
        const { data: subs, error: subError } = await supabase
            .from("assignments")
            .select("*")
            .eq("parent_id", id)
            .order("due_date", { ascending: true })

        if (subError) console.error(subError)
        else setSubSteps(subs)
        }

        fetchAssignment()
    }, [id])

    if (!assignment) return <div className="p-6">Loading...</div>

    return (
        <div className="p-6">
        <button
            className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => navigate(-1)}
        >
            ← Back
        </button>

        <h1 className="text-2xl font-bold mb-2">{assignment.name}</h1>
        <p className="mb-1">
            <strong>Subject:</strong> {assignment.subject}
        </p>
        <p className="mb-1">
            <strong>Type:</strong> {assignment.type}
        </p>
        <p className="mb-1">
            <strong>Extra:</strong> {assignment.extra}
        </p>
        <p className="mb-1">
            <strong>Due Date:</strong> {assignment.due_date}
        </p>
        <p className="mb-4">
            <strong>Note:</strong> {assignment.note}
        </p>

        {subSteps.length > 0 && (
            <div>
            <h2 className="text-xl font-semibold mb-2">Sub-Steps</h2>
            <ul className="list-disc pl-6">
                {subSteps.map(sub => (
                <li key={sub.id} className="mb-1">
                    <strong>{sub.name}</strong> (Due: {sub.due_date}) — {sub.type}{" "}
                    {sub.extra && `- ${sub.extra}`}
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    )
}
