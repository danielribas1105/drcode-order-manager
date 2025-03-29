import React from "react"
import { twMerge } from "tailwind-merge"

export interface ContainerProps {
   children: React.ReactNode
   className?: string
}

export default function Container({ children, className }: ContainerProps) {
   const defaultClass = 'max-w-7xl mx-auto px-10 py-4 flex'
   const combinedClasses = twMerge(defaultClass, className)
   return (
      <div className={combinedClasses}>
         {children}
      </div>
   )
}