import {
	faCircleUser,
	faAngleDown,
	faTicket,
	faRightFromBracket,
	faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Navbar({userDetails}) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const menuRef = useRef(null);
	const triggerRef = useRef(null);

	// Toggle menu
	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	// Close menu when clicking outside of it
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				triggerRef.current &&
				!triggerRef.current.contains(event.target)
			) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className="fixed top-0 z-50 w-[100vw] h-[70px] bg-gray-800 flex justify-between items-center sm:px-0 md:px-8 lg:px-6 text-white">
			<h1
				onClick={() => navigate("/home")}
				className="text-xl md:text-2xl pl-3 font-bold cursor-pointer hover:text-blue-500"
			>
				MoviEase
			</h1>

			<div
				ref={triggerRef}
				onClick={toggleMenu}
				className={`userMenu rounded-[60px] group relative h-[80%] px-[1.5rem] flex items-center gap-3 cursor-pointer select-none
        ${
					isMenuOpen
						? "bg-gray-500 text-white"
						: "hover:bg-gray-500 hover:text-white"
				}`}
			>
				<FontAwesomeIcon className="text-2xl md:text-3xl" icon={faCircleUser}/>
				<h1 className="text-base md:text-lg font-semibold hidden sm:block">
					{userDetails ? userDetails.name.toUpperCase() : "Login"}
				</h1>
				{isMenuOpen ? (
					<FontAwesomeIcon
						icon={faAngleUp}
						className="arrow text-xl md:text-2xl transition-all duration-300 ease-in-out"
					/>
				) : (
					<FontAwesomeIcon
						icon={faAngleDown}
						className="arrow text-xl md:text-2xl transition-all group-hover:pt-3 group-hover:animate-bounce duration-500 ease-in-out"
					/>
				)}

				<div
					ref={menuRef}
					className={`absolute right-0 top-[65px] z-10 w-[220px] md:w-[245px] bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out
  ${isMenuOpen ? "max-h-[200px] py-2" : "max-h-0"}`}
				>
					<ul className="px-2">
						<li
							onClick={() => navigate("/bookedShows")}
							className="leading-[2.5] px-3 rounded-lg hover:bg-slate-300 hover:bg-opacity-20 cursor-pointer"
						>
							<FontAwesomeIcon className="text-gray-400" icon={faTicket}/>
							<span className="ml-3">Booked Shows</span>
						</li>
						<li
							onClick={() => {
								localStorage.removeItem("token");
								navigate("/");
							}}
							className="leading-[2.5] px-3 rounded-lg hover:bg-slate-300 hover:bg-opacity-20 cursor-pointer"
						>
							<FontAwesomeIcon
								className="text-gray-400 pr-[2px]"
								icon={faRightFromBracket}
							/>
							<span className="ml-3">Log Out</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
