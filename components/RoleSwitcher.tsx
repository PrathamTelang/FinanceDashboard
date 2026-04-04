"use client"
import { useFinance } from "@/context/FinanceContext"

export default function RoleSwitcher() {
  const { role, setRole } = useFinance()

  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value as any)}
      className="border p-2 rounded"
    >
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  )
}