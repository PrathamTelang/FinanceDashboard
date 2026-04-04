"use client"
import SummaryCard from "@/components/SummaryCard"
import BalanceChart from "@/components/BalanceChart"
import CategoryChart from "@/components/CategoryChart"
import TransactionsTable from "@/components/TransactionsTable"
import RoleSwitcher from "@/components/RoleSwitcher"
import { useFinance } from "@/context/FinanceContext"

export default function Page() {
  const { transactions } = useFinance()

  const income = transactions.filter(t => t.type === "income")
    .reduce((a, t) => a + t.amount, 0)

  const expense = transactions.filter(t => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0)

  const balance = income - expense

  return (
    <div className="p-6 space-y-6">
      <RoleSwitcher />

      <div className="grid grid-cols-3 gap-4">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expense} />
      </div>

      <div className="flex gap-6">
        <BalanceChart />
        <CategoryChart />
      </div>

      <TransactionsTable />
    </div>
  )
}