import { formatter } from '@/lib/numberUtils'
import { cn } from '@/lib/utils'

interface NumberFormatProps {
  amount: number
}

const NumberFormat = ({ amount }: NumberFormatProps) => {
  return (
    <span
      className={cn({
        'text-destructive': amount < 0
      })}
    >
      {formatter.format(amount).replace(/[^0-9, ,]+/g, '')}
    </span>
  )
}

export default NumberFormat
