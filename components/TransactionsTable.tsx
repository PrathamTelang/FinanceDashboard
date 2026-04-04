"use client"
import { useFinance } from "@/context/FinanceContext"

export default function TransactionsTable() {
  const { transactions } = useFinance()

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Transactions</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(t => (
            <tr key={t.id} className="border-t">
              <td>{t.date}</td>
              <td>{t.category}</td>
              <td>₹{t.amount}</td>
              <td className={t.type === "income" ? "text-green-500" : "text-red-500"}>
                {t.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}