type Props = {
  title: string
  value: number
}

export default function SummaryCard({ title, value }: Props) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-xl font-bold">₹{value}</p>
    </div>
  )
}