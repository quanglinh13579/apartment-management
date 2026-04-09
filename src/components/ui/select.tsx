import * as React from "react"
import { useTranslation } from 'react-i18next'
import './input.css' 

export type Option = { label: string; value: string | number };

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options?: Option[]
  error?: string
  wrapperClassName?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, wrapperClassName, label, options = [], error, id, ...props }, ref) => {
    const { t } = useTranslation()
    const isInvalid = !!error

    return (
      <div className={["custom-input-group", wrapperClassName].filter(Boolean).join(" ")}>
        {label && (
          <label htmlFor={id} className="form-label">{label}</label>
        )}
        <select
          ref={ref}
          className={[
            "form-select",
            isInvalid ? "is-invalid" : "",
            className
          ].filter(Boolean).join(" ")}
          id={id}
          {...props}
        >
          <option value="">{t('common.choose_option')}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <div className="error-feedback">
            {error}
          </div>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
