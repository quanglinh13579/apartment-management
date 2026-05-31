import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import historyData from '../../pages/device/device.mock.json';
import deviceStatusData from '../../pages/device/device-status.mock.json';
import { ChevronDownIcon, DoorIcon2, FridgeIcon } from "../Icons";
import { CustomPagination } from '../common/CustomPagination';
import { t } from 'i18next';

const PAGE_SIZE = 6;

const STATUS_FIELDS: {
	key: keyof typeof deviceStatusData[0];
	label: string;
}[] = [
		{ key: 'currentStatus', label: 'Current status:' },
		{ key: 'lastActivity', label: 'Last activity:' },
		{ key: 'batteryLevel', label: 'Battery level:' },
		{ key: 'signal', label: 'Signal:' },
		{ key: 'lastSynced', label: 'Last synced:' },
	];

const DoorIconSVG = ({ active }: { active: boolean }) => <DoorIcon2 active={active} />;
const FridgeIconSVG = ({ active }: { active: boolean }) => <FridgeIcon active={active} />;
const ChevronDown = () => <ChevronDownIcon width={16} height={16} color="currentColor" />;

const TABS = [
	{ id: 'main_door', label: t('device.main_door'), badge: null, Icon: DoorIconSVG },
	{ id: 'fridge_door', label: t('device.fridge_door'), badge: 3, Icon: FridgeIconSVG },
] as const;

const DevicePage = () => {
	const [activeTab, setActiveTab] = useState<'main_door' | 'fridge_door'>('main_door');
	const [showFilter, setShowFilter] = useState(false);
	const [filter, setFilter] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);

	const filterRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
				setShowFilter(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const deviceStatus = deviceStatusData.find((d) => d.deviceId === activeTab)!;

	const filterOptions = [
		'All',
		...Array.from(new Set(historyData.map((item) => item.date))),
	];

	const filteredHistory =
		filter === 'All'
			? historyData
			: historyData.filter((item) => item.date === filter);

	const totalPages = Math.max(1, Math.ceil(filteredHistory.length / PAGE_SIZE));
	const safePage = Math.min(currentPage, totalPages);
	const pagedHistory = filteredHistory.slice(
		(safePage - 1) * PAGE_SIZE,
		safePage * PAGE_SIZE,
	);

	const handleFilterChange = (opt: string) => {
		setFilter(opt);
		setCurrentPage(1);
		setShowFilter(false);
	};

	const handleTabChange = (tabId: 'main_door' | 'fridge_door') => {
		setActiveTab(tabId);
		setFilter('All');
		setCurrentPage(1);
	};

	return (
		<div className="flex flex-col h-full bg-F8F8F8">
			<div className="flex items-center justify-center mt-2 mb-6">
				{TABS.map((tab, i) => (
					<>
						{i > 0 && <div key={`sep-${i}`} className="h-8 w-px bg-border-default mx-2" />}
						<div
							key={tab.id}
							onClick={() => handleTabChange(tab.id)}
							className={cn(
								'flex flex-col items-center gap-2 px-6 cursor-pointer border-b-2 transition-all pb-2',
								activeTab === tab.id ? 'border-text-main' : 'border-transparent opacity-50',
							)}
						>
							<div className="relative">
								<tab.Icon active={activeTab === tab.id} />
								{tab.badge === null ? (
									<div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-text-main rounded-full border-2 border-F8F8F8" />
								) : (
									<div className="absolute -top-2 -right-3 min-w-[18px] h-[18px] px-1 bg-text-main rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-F8F8F8">
										{tab.badge}
									</div>
								)}
							</div>
							<span className={cn('font-bold text-sm', activeTab === tab.id ? 'text-text-main' : 'text-text-muted')}>
								{tab.label}
							</span>
						</div>
					</>
				))}
			</div>

			<div className="bg-[#f0f0f0] rounded-2xl px-5 mb-6 overflow-hidden">
				{STATUS_FIELDS.map(({ key, label }, index) => (
					<div
						key={key}
						className={cn(
							'flex items-center py-4',
							index < STATUS_FIELDS.length - 1 && 'border-b border-[#e0e0e0]',
						)}
					>
						<span className="w-26 shrink-0 text-sm text-gray-600">{label}</span>
						<span className="text-sm font-normal text-black">{deviceStatus[key]}</span>
					</div>
				))}
			</div>

			<div className="mb-4">
				<div className="flex items-center justify-between mb-4 relative z-10">
					<div className="font-bold text-base text-black">{t('device.history_activity')}</div>
					<div className="relative" ref={filterRef}>
						<div
							onClick={() => setShowFilter(!showFilter)}
							className="flex items-center gap-2 border border-border-default rounded-full px-3 py-1.5 cursor-pointer bg-white min-w-[100px] justify-between"
						>
							<span className="text-sm font-medium text-text-dark">{filter}</span>
							<ChevronDown />
						</div>

						{showFilter && (
							<div className="absolute top-full right-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-border-default overflow-hidden z-20">
								{filterOptions.map((opt) => (
									<div
										key={opt}
										onClick={() => handleFilterChange(opt)}
										className={cn(
											'px-4 py-2 text-sm cursor-pointer hover:bg-gray-50',
											filter === opt ? 'bg-gray-200 font-medium text-black' : 'text-text-dark',
										)}
									>
										{opt}
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="flex flex-col">
					{pagedHistory.map((item, index) => (
						<div
							key={item.id}
							className={cn(
								'flex justify-between items-center py-4',
								index !== pagedHistory.length - 1 && 'border-b border-border-default/50',
							)}
						>
							<span className="text-text-dark text-sm font-medium w-1/3">{item.action}</span>
							<span className="text-black text-sm font-bold w-1/3 text-center">{item.date}</span>
							<span className="text-black text-sm font-bold w-1/3 text-right">{item.time}</span>
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-center items-center mt-4 pb-8">
				<CustomPagination
					currentPage={safePage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	);
};

export default DevicePage;
