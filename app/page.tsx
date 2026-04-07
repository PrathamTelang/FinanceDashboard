"use client"
import React, { useState } from 'react'

export default function Page() {

  type Transaction = {
    amount: number
    type: "income" | "expense"
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

  return (
    <div>
      <h1>Finance Dashboard</h1>
      <p className='bg-blue-500 text-black w-fit p-2'>Balance: {summary.balance}</p>
      <div className='bg-green-500 text-black w-fit p-2'>Total Income: {summary.income}</div> 
      <div className='bg-red-500 text-black w-fit p-2'>Total Expense: {summary.expense}</div> 
      <button 
      className='bg-white rounded-lg text-black p-2 cursor-pointer'
      onClick={() => setTransactions(prev => [...prev, { amount: 100, type: "income" }])}>Add Income (+100)</button>
      <button 
      className='bg-white rounded-lg text-black p-2 cursor-pointer'
      onClick={() => setTransactions(prev => [...prev, { amount: 50, type: "expense" }])}>Add Expense (-50)</button>
      <div>
        {
          transactions.map((t, index) => (
            <p key={index}>
              {t.type}: {t.amount}
            </p>
        ))
        }
      </div>
    </div>
  )
}
