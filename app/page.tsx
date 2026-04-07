"use client"
import React, { useState } from 'react'

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

console.log(categoryTotals)

  return (
    <div>
      <h1>Finance Dashboard</h1>
      <p className='bg-blue-500 text-black w-fit p-2'>Balance: {summary.balance}</p>
      <div className='bg-green-500 text-black w-fit p-2'>Total Income: {summary.income}</div> 
      <div className='bg-red-500 text-black w-fit p-2'>Total Expense: {summary.expense}</div> 
      <button 
      className='bg-white rounded-lg text-black p-2 cursor-pointer'
      onClick={() => setTransactions(prev => [...prev, { amount: 100, type: "income", category: "Salary" }])}>Add Income (+100)</button>
      <button 
      className='bg-white rounded-lg text-black p-2 cursor-pointer'
      onClick={() => setTransactions(prev => [...prev, { amount: 50, type: "expense", category: "Food" }])}>Add Food Expense (-50)</button>
      <button 
      className='bg-white rounded-lg text-black p-2 cursor-pointer'
      onClick={() => setTransactions(prev => [...prev, { amount: 100, type: "expense", category: "Shopping" }])}>Add Shopping Expense (-100)</button>
      <p className="bg-yellow-300 text-black w-fit p-2">
  Top Spending: {topCategory[0]} ({topCategory[1]})
</p>
      <div className="space-y-2 mt-4">
        {
          transactions.map((t, index) => (
            <p key={index}>
              {t.type} - {t.category}: {t.amount} 
            </p>
        ))
        }
      </div>
      
    </div>
  )
}
