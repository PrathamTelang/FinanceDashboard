"use client"
import { PieChart, Pie, Tooltip } from "recharts"
import { useFinance } from "@/context/FinanceContext"

export default function CategoryChart() {
  const { transactions } = useFinance()

  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = acc[t.category] || { name: t.category, value: 0 }
        acc[t.category].value += t.amount
      }
      return acc
    }, {} as any)
  )

  return (
    <PieChart width={300} height={250}>
      <Pie data={categoryData} dataKey="value" nameKey="name" />
      <Tooltip />
    </PieChart>
  )
}