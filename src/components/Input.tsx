import React, { useState, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { FORM_DEFAULTS } from '../constants/Index';
import './Input.css';

export type Option = { label: string; value: string | number };

export interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
	label?: string;
	controlType?: 'input' | 'select' | 'checkbox';
	options?: Option[];
	hasPasswordToggle?: boolean;
	error?: string;
	wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
	(props, ref) => {
		const {
			label,
			controlType = 'input',
			type = 'text',
			options = [],
			hasPasswordToggle = false,
			error,
			wrapperClassName = '',
			className = '',
			id,
			...rest
		} = props;

		const [showPassword, setShowPassword] = useState(false);
		const isInvalid = !!error;

		const currentInputType = hasPasswordToggle
			? (showPassword ? 'text' : 'password')
			: type;

		const renderControl = () => {
			switch (controlType) {
				case 'select':
					return (
						<select
							ref={ref as React.Ref<HTMLSelectElement>}
							className={`form-select ${isInvalid ? 'is-invalid' : ''} ${className}`}
							id={id}
							{...(rest as any)}
						>
							<option value="">{FORM_DEFAULTS.CHOOSE_OPTION}</option>
							{options.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					);

				case 'checkbox':
					return (
						<div className="form-check-wrapper">
							<input
								ref={ref as React.Ref<HTMLInputElement>}
								type="checkbox"
								id={id}
								className={`form-check-input ${isInvalid ? 'is-invalid' : ''} ${className}`}
								{...(rest as any)}
							/>
							{label && <label htmlFor={id} className="form-check-label">{label}</label>}
						</div>
					);

				default:
					return (
						<div className="input-with-icon">
							<input
								ref={ref as React.Ref<HTMLInputElement>}
								type={currentInputType}
								className={`form-control ${isInvalid ? 'is-invalid' : ''} ${className}`}
								id={id}
								{...(rest as any)}
							/>
							{hasPasswordToggle && (
								<button
									type="button"
									className="password-toggle-btn"
									onClick={() => setShowPassword(!showPassword)}
									tabIndex={-1}
								>
									{showPassword ? (
										<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
											<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
											<circle cx="12" cy="12" r="3" />
										</svg>
									) : (
										<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
											<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
											<circle cx="12" cy="12" r="3" />
										</svg>
									)}
								</button>
							)}
						</div>
					);
			}
		};

		return (
			<div className={`custom-input-group ${wrapperClassName}`}>
				{label && controlType !== 'checkbox' && (
					<label htmlFor={id} className="form-label">{label}</label>
				)}
				{renderControl()}
				{error && (
					<div className="error-feedback">
						{error}
					</div>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;

