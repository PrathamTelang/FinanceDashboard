"use client"
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"
import { useFinance } from "@/context/FinanceContext"

export default function BalanceChart() {
  const { transactions } = useFinance()

  const data = transactions.map(t => ({
    date: t.date,
    amount: t.amount,
  }))

  return (
    <LineChart width={400} height={250} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
    </LineChart>
  )
}