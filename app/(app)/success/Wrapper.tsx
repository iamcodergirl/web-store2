import { Button } from "@/components/ui/button";
import { updatePurchases } from "@/sanity/services/product/purchases";
import { useRouter } from "next/navigation";
import { LoaderIcon  } from "lucide-react";
import React, { useEffect, useRef, useTransition } from "react";

import Confetti from "react-confetti-boom";

export default function Wrapper() {
	const called = useRef(false);
	const router = useRouter();

	const navigateToHome = () => {
		router.push("/");
	};

	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		if (called.current === false) {
			called.current = true;
			updatePurchases();
		}
	}, []);
	return (
		<div className="h-screen overflow-hidden flex flex-col justify-center items-center font-black text-6xl">
			<Confetti
				mode="fall"
				shapeSize={20}
				particleCount={500}
				colors={["#ff577f", "#ff884b"]}
			/>
			<span>PAYMENT COMPLETED!</span>

			<Button
				className="rounded-none mt-8"
				onClick={() => startTransition(navigateToHome)}
			>
				GO TO HOME {isPending ? <LoaderIcon /> : null}
			</Button>
		</div>
	);
}
