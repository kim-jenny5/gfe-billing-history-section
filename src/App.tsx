import { useState, useEffect } from 'react';

type BillingHistoryItem = {
	amount: number;
	created_at: string;
	invoice_url: string;
	plan: string;
	status: string;
};

export default function App() {
	const [history, setHistory] = useState<BillingHistoryItem[]>([]);

	useEffect(() => {
		const fetchApi = async () => {
			try {
				const response = await fetch(
					'https://www.greatfrontend.com/api/projects/challenges/account/billing/history'
				);

				const data = await response.json();
				setHistory(data.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchApi();
	});

	const formatAmount = (amount: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(amount);

	return (
		<div className='w-[375px] flex flex-col bg-gradient-to-b from-gray-50 to-[#d2d6db]'>
			<div className='flex flex-col gap-6 self-stretch grow bg-white py-8'>
				<div className='flex gap-8 self-stretch px-4'>
					<div className='flex flex-col gap-8 grow'>
						<div className='flex flex-col justify-center gap-2 self-stretch'>
							<h1>Payment History</h1>
							<div className='font-normal text-sm text-neutral-500'>
								Please reach out to our friendly team via team@codepulse.com if
								you have questions.
							</div>
						</div>
						<div className='flex flex-col gap-4 self-stretch'>
							{history.map((item, idx) => (
								<div
									key={idx}
									className='flex flex-col gap-3 self-stretch bg-white py-4 rounded-lg border border-solid border-neutral-200'
								>
									<div className='flex justify-between px-4 font-medium text-sm'>
										<div className='text-neutral-600'>Invoice</div>
										<div className='text-neutral-900'>
											{new Date(item.created_at).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
												year: 'numeric'
											})}
										</div>
									</div>
									<div className='flex flex-col gap-2 self-stretch'>
										<div className='h-px bg-neutral-300'></div>
									</div>
									<div className='flex justify-between px-4'>
										<div className='font-medium text-sm text-neutral-600'>
											Status
										</div>
										<div
											className={`flex items-center px-2 py-0.5 rounded-full border border-solid ${
												item.status === 'pending'
													? 'bg-gray-50 border-neutral-200'
													: 'bg-green-50 border-green-200'
											}`}
										>
											<div
												className={`font-normal text-sm text-center ${
													item.status === 'pending'
														? 'text-neutral-600'
														: 'text-green-700'
												} capitalize`}
											>
												{item.status}
											</div>
										</div>
									</div>
									<div className='flex flex-col gap-2 self-stretch'>
										<div className='h-px bg-neutral-300'></div>
									</div>
									<div className='flex justify-between px-4 font-medium text-sm'>
										<div className='text-neutral-600'>Amount</div>
										<div>{formatAmount(item.amount)}</div>
									</div>
									<div className='flex flex-col gap-2 self-stretch'>
										<div className='h-px bg-neutral-300'></div>
									</div>
									<div className='flex justify-between px-4 font-medium text-sm'>
										<div className='text-neutral-600'>Plan</div>
										<div>
											<span className='capitalize'>{item.plan}</span> plan
										</div>
									</div>
									<div className='flex flex-col gap-2 self-stretch'>
										<div className='h-px bg-neutral-300'></div>
									</div>
									<div className='flex justify-center items-center px-0.5'>
										<a
											href={item.invoice_url}
											className='font-medium text-sm text-indigo-700 hover:text-indigo-900'
										>
											Download
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
