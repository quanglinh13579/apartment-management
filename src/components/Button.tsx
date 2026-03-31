import React from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	loading?: boolean;
	loadingText?: string;
	icon?: ReactNode;
	children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	loading = false,
	loadingText,
	icon,
	disabled,
	className = '',
	...rest
}) => {
	const { t } = useTranslation();
	const displayLoadingText = loadingText || t('common.loading');
	
	const buttonClasses = `custom-btn btn-${variant} ${className}`;

	return (
		<button
			{...rest}
			disabled={disabled || loading}
			className={buttonClasses}
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
	);
};

export default Button;

