import * as React from "react"
import { useTranslation } from 'react-i18next'
import './button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  loading?: boolean
  loadingText?: string
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading = false, loadingText, icon, children, disabled, ...props }, ref) => {
    const { t } = useTranslation()
    const displayLoadingText = loadingText || t('common.loading')

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          "custom-btn",
          `btn-${variant}`,
          className
        ].filter(Boolean).join(" ")}
        {...props}
      >
        {loading ? (
          <div className="button-loading-content">
            <span className="button-spinner"></span>
            {displayLoadingText && <span>{displayLoadingText}</span>}
          </div>
        ) : (
          <div className="button-content">
            {icon && <span className="button-icon">{icon}</span>}
            {children}
          </div>
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
