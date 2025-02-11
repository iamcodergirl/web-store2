import React from "react";
import Logo from "./Logo";
import Links from "./Links";
import Search from "./Search";
import Cart from "./Cart";
import Menu from "./Menu";

export default function NavBar() {
	return (
		<nav className="sticky z-10 top-0 inset-x-4 px-4 py-3 border-b border-primary/10 bg-white">
			<div className="flex items-center justify-between py-2">
				<Logo />
				<div className="hidden md:flex items-center gap-4 text-[14.5px] text-neutral-700">
					<Links />
				</div>

				<div className="flex items-center gap-3">
					<div className="hidden md:inline ">
						<Search />
					</div>
					<Cart />
					<Menu />
				</div>
			</div>
		</nav>
	);
}
