"use client"
import React, { useState } from 'react'
import { PieChart, Pie, Tooltip } from "recharts"

export default function Page() {

  type Transaction = {
    amount: number
    type: "income" | "expense"
    category: string
  }

  const [transactions, setTransactions] = useState<Transaction[]>([])

  const summary = transactions.reduce((acc, t) => {
    if (t.type === "income") {
      acc.income += t.amount
      acc.balance += t.amount
    } else {
      acc.expense += t.amount
      acc.balance -= t.amount
    }
    return acc
  }, { income: 0, expense: 0, balance: 0 })

  const categoryTotals = transactions.reduce((acc, t) => {
  if (t.type === "expense") {
    if (!acc[t.category]) {
      acc[t.category] = 0
    }
    acc[t.category] += t.amount
  }
  return acc
}, {} as Record<string, number>)

const entries = Object.entries(categoryTotals)

const topCategory = entries.reduce((max, curr) => {
  if (curr[1] > max[1]) {
    return curr
  }
  return max
}, ["", 0])

const spendingChartData = Object.entries(categoryTotals).map(([key, value]) => ({
  name: key,
  value: value
}))

const incomeExpenseChartData = [
  { name: "Income", value: summary.income },
  { name: "Expense", value: summary.expense }
]

  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")

  const filteredTransactions = transactions.filter((t) => {
  if (filter === "all") return true
  return t.type === filter
})


  return (
    <div className="p-6 space-y-6">
      <h1>Finance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  
  <div className="bg-white text-black p-4 rounded-xl shadow">
    <p className="text-sm text-gray-500">Balance</p>
    <h2 className="text-xl font-bold">₹{summary.balance}</h2>
  </div>

  <div className="bg-white text-black p-4 rounded-xl shadow ">
    <p className="text-sm text-gray-500">Income</p>
    <h2 className="text-xl font-bold text-green-600">₹{summary.income}</h2>
  </div>

  <div className="bg-white text-black p-4 rounded-xl shadow">
    <p className="text-sm text-gray-500">Expense</p>
    <h2 className="text-xl font-bold text-red-600">₹{summary.expense}</h2>
  </div>

</div>
      <div className='flex gap-4'>
        <button 
      className='bg-green-500 hover:bg-green-600 text-white rounded-lg  p-2 cursor-pointer'
      onClick={() => setTransactions(prev => [...prev, { amount: 100, type: "income", category: "Salary" }])}>Add Income (+100)</button>
      <button 
      className='bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 cursor-pointer'
      onClick={() => setTransactions(prev => [...prev, { amount: 50, type: "expense", category: "Food" }])}>Add Food Expense (-50)</button>
      <button 
      className='bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 cursor-pointer'
      onClick={() => setTransactions(prev => [...prev, { amount: 100, type: "expense", category: "Shopping" }])}>Add Shopping Expense (-100)</button>
      </div>
      <p className="bg-yellow-300 text-black w-fit p-2">
  Top Spending: {topCategory[0]} ({topCategory[1]})
</p>

<div className="bg-white p-4 rounded-xl shadow mt-6 flex gap-4">
<div>
    <h2 className="font-semibold mb-4 text-black">Spending Breakdown</h2>

  <PieChart width={300} height={250} className='bg-gray-200'>
    <Pie
      data={spendingChartData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={80}
      fill="#8884d8"
    />
    <Tooltip />
  </PieChart>
</div>
<div>
  <h2 className="font-semibold mb-4 text-black">Income Expense Breakdown</h2>
    <PieChart width={300} height={250} className='bg-gray-200'>
      <Pie
        data={incomeExpenseChartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
      cy="50%"
      outerRadius={80}
      fill="#8884d8"
      />
        <Tooltip />
    </PieChart>
</div>
</div>

<div className="flex gap-2">
  <button
   className={`px-3 py-1 rounded ${
  filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
}`}
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button
    className={`px-3 py-1 rounded ${
  filter === "income" ? "bg-green-500 text-white" : "bg-gray-200 text-black"
}`}
    onClick={() => setFilter("income")}
  >
    Income
  </button>

  <button
    className={`px-3 py-1 rounded ${
  filter === "expense" ? "bg-red-500 text-white" : "bg-gray-200 text-black"
}`}
    onClick={() => setFilter("expense")}
  >
    Expense
  </button>
</div>

      <div className="bg-white text-black p-4 rounded-xl shadow mt-4">
  <h2 className="font-semibold mb-2">Transactions</h2>

  {transactions.length === 0 ? (
    <p className="text-gray-500">No transactions yet</p>
  ) : (
    filteredTransactions.map((t, index) => (
      <p key={index}>
        {t.type} - {t.category}: ₹{t.amount}
      </p>
    ))
  )}
</div>
      
    </div>
  )
}
