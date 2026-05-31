import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight } from '../Icons';

type CustomPaginationProps = {
	currentPage?: number;
	page?: number;
	activePage?: number;
	totalPages?: number;
	total?: number;
	count?: number;
	pageSize?: number;
	rowsPerPage?: number;
	limit?: number;
	onPageChange?: (page: number) => void;
	setPage?: (page: number) => void;
	handlePageChange?: (page: number) => void;
	className?: string;
	disabled?: boolean;
};

type PageButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	active?: boolean;
};

function PageButton({ active, className, children, ...props }: PageButtonProps) {
	return (
		<button
			type="button"
			className={cn(
				'inline-flex h-12 w-12 items-center justify-center rounded-[18px] text-base font-medium transition-all duration-150 select-none',
				active
					? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] text-gray-900 font-bold'
					: 'bg-[#ebebeb] text-gray-500 hover:bg-gray-200',
				props.disabled && 'opacity-30 cursor-not-allowed',
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}

function ArrowButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type="button"
			className={cn(
				'inline-flex h-12 w-10 items-center justify-center text-gray-400 transition-colors duration-150',
				'hover:text-gray-700 disabled:opacity-25 disabled:cursor-not-allowed',
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}

function buildPages(currentPage: number, totalPages: number) {
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}
	const pages: Array<number | 'ellipsis'> = [1];
	const start = Math.max(2, currentPage - 1);
	const end = Math.min(totalPages - 1, currentPage + 1);
	if (start > 2) pages.push('ellipsis');
	for (let p = start; p <= end; p++) pages.push(p);
	if (end < totalPages - 1) pages.push('ellipsis');
	pages.push(totalPages);
	return pages;
}

export function CustomPagination({
	currentPage,
	page,
	activePage,
	totalPages,
	total,
	count,
	pageSize,
	rowsPerPage,
	limit,
	onPageChange,
	setPage,
	handlePageChange,
	className,
	disabled = false,
}: CustomPaginationProps) {
	const resolvedCurrentPage = Math.max(1, currentPage ?? page ?? activePage ?? 1);

	const resolvedTotalPages =
		totalPages ??
		Math.max(
			1,
			Math.ceil((total ?? count ?? 0) / (pageSize ?? rowsPerPage ?? limit ?? 1)),
		);

	const emitPageChange = (nextPage: number) => {
		if (disabled) return;
		const clamped = Math.min(Math.max(nextPage, 1), resolvedTotalPages);
		onPageChange?.(clamped);
		setPage?.(clamped);
		handlePageChange?.(clamped);
	};

	const pages = buildPages(resolvedCurrentPage, resolvedTotalPages);

	return (
		<div className={cn('flex items-center gap-2', className)}>
			<ArrowButton
				aria-label="Previous page"
				disabled={disabled || resolvedCurrentPage <= 1}
				onClick={() => emitPageChange(resolvedCurrentPage - 1)}
			>
				<ChevronLeft />
			</ArrowButton>
			{pages.map((item, index) =>
				item === 'ellipsis' ? (
					<span
						key={`ellipsis-${index}`}
						className="inline-flex h-12 w-12 items-center justify-center text-sm text-gray-400"
					>
						…
					</span>
				) : (
					<PageButton
						key={item}
						active={item === resolvedCurrentPage}
						disabled={disabled}
						onClick={() => emitPageChange(item)}
					>
						{item}
					</PageButton>
				),
			)}

			<ArrowButton
				aria-label="Next page"
				disabled={disabled || resolvedCurrentPage >= resolvedTotalPages}
				onClick={() => emitPageChange(resolvedCurrentPage + 1)}
			>
				<ChevronRight />
			</ArrowButton>
		</div>
	);
}

export default CustomPagination;
