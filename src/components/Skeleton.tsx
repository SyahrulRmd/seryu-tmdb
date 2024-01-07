import { HTMLAttributes } from "react"
import { cn } from "../lib/cn"

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('rounded-lg bg-gray-500 animate-pulse', className)} />
  )
}
