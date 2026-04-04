"use client"

import { createContext, useContext, useState } from "react"
import { Transaction } from "@/types"
import { mockTransactions } from "@/data/mockData"

type Role = "viewer" | "admin"

type FinanceContextType = {
  transactions: Transaction[]
  role: Role
  setRole: (role: Role) => void
  addTransaction: (tx: Transaction) => void
}

const FinanceContext = createContext<FinanceContextType | null>(null)

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [role, setRole] = useState<Role>("viewer")

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [...prev, tx])
  }

  return (
    <FinanceContext.Provider value={{ transactions, role, setRole, addTransaction }}>
      {children}
    </FinanceContext.Provider>
  )
}

export const useFinance = () => {
  const context = useContext(FinanceContext)
  if (!context) throw new Error("useFinance must be used within provider")
  return context
}