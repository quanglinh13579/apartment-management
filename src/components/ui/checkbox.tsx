import * as React from "react"
import CheckedIcon from '../Icons/CheckedIcon'
import UncheckedIcon from '../Icons/UncheckedIcon'
import './input.css' 

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  wrapperClassName?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, wrapperClassName, label, id, checked, ...props }, ref) => {
    return (
      <label className={["form-check-wrapper", wrapperClassName].filter(Boolean).join(" ")} htmlFor={id}>
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className="form-check-hidden" // CSS hides this
          checked={checked}
          {...props}
        />
        <div className="custom-checkbox-icon">
          {checked ? <CheckedIcon size={22} /> : <UncheckedIcon size={22} />}
        </div>
        {label && <span className="form-check-label">{label}</span>}
      </label>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
