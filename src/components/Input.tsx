import React, { useState, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import './Input.css';
import EyeIcon from './Icons/EyeIcon';
import EyeOffIcon from './Icons/EyeOffIcon';
import UncheckedIcon from './Icons/UncheckedIcon';
import CheckedIcon from './Icons/CheckedIcon';

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
		const { t } = useTranslation();
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
							<option value="">{t('common.choose_option')}</option>
							{options.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					);

				case 'checkbox':
					const isChecked = !!(rest as any).checked;
					return (
						<label className="form-check-wrapper" htmlFor={id}>
							<input
								ref={ref as React.Ref<HTMLInputElement>}
								type="checkbox"
								id={id}
								className="form-check-hidden"
								{...(rest as any)}
							/>
							<div className="custom-checkbox-icon">
								{isChecked ? <CheckedIcon size={22} /> : <UncheckedIcon size={22} />}
							</div>
							{label && <span className="form-check-label">{label}</span>}
						</label>
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
										<EyeIcon size={22} />
									) : (
										<EyeOffIcon size={22} />
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

