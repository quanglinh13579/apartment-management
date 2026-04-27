import * as React from "react"
import { useState } from "react"
import { cn } from "../../lib/utils"
import EyeIcon from "../Icons/EyeIcon"
import EyeOffIcon from "../Icons/EyeOffIcon"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasPasswordToggle?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasPasswordToggle, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    
    const isPassword = type === "password"
    const currentType = isPassword && showPassword ? "text" : type

    return (
      <div className="relative w-full">
        <input
          type={currentType}
          className={cn(
            "flex h-height-input w-full rounded-input border border-border bg-white px-5 py-1 text-input text-text-main font-medium shadow-none transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-0 focus-visible:border-border-dark disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && hasPasswordToggle && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-dark hover:text-text-main"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeIcon size={22} /> : <EyeOffIcon size={22} />}
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
