import { getSalesInfo } from "@/sanity/services/product/sales";
import { MdOutlineArrowDownward } from "react-icons/md";

export default async function Status() {
	const { revenue, salesCount, revenuePerSale } = await getSalesInfo();

	return <div className="md:grid md:grid-cols-3 flex flex-col gap-3">
        <Card label="Revenue Made" value={`${revenue}$`} />
        <Card label="Sales Count" value={`${salesCount}`} />
        <Card label="Avrg Revenue per sale" value={`${revenuePerSale}$`} />
    </div>;
}

function Card({ value, label }: { value: number | string; label: string }) {
	return (
		<div className="flex justify-center items-center gap-2 p-12 border">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-4">
					<div className="w-6 h-6 rounded bg-green-500"></div>
					<span className="block font-bold text-4xl">{value}</span>
				</div>
				<span className="text-zinc-600 text-xl">{label}</span>
			</div>
			<MdOutlineArrowDownward size={40}  className="text-5xl text-zinc-700 flex-1" />
		</div>
	);
}