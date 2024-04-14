import React, { useEffect, useState } from "react";
import "./UsernameModal.css";
import { useAppDispatch } from "../../store/store";
import { SocketUtils } from "../../sockets/socketUtils";
import { socket } from "../../sockets/socket";
import { setUsername } from "../../store/slices/userSlice";

export const UsernameModal = ({show}: {show: boolean}) => {
	const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);

	if (show) {
		document.body.classList.add("active-modal");
	} else {
		document.body.classList.remove("active-modal");
	}

	const isUsernameValid = () : boolean => {
		if (value.replace(/\s/g, '' ).length > 32){
			return false
		}
		return true
	}

	const [value, setValue] = useState("");
	const dispatch = useAppDispatch();
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onSubmit = (submittedUsername: string) => {
		const isValid = isUsernameValid();

		if (isValid) {
			SocketUtils.setUsername(submittedUsername);
		}
		setIsUsernameInvalid(isValid)
	};

	const onClose = () => {
		console.log("closed modal");
	};


	useEffect(() => {
		socket.on("UsernameOK", (data) => {
			dispatch(setUsername(data.username));
			onClose();
		});
		socket.on("UsernameKO", () => {
			console.log("bad uername");
		});
		return () => {
			socket.off('UsernameOK');
			socket.off('UsernameKO');
		};
	}, []);

	const handleSubmit = () => {
		onSubmit(value);
	};

	return (
		<>
			{show && (
				<div className="modal">
					<div className="modal-content">
						{isUsernameInvalid && <div>You name is invalid, needs to be between 3-32 characters long</div>}
						<span className="close" onClick={onClose}>
							&times;
						</span>
						<h2>Enter Your Username</h2>
						<input
							type="text"
							placeholder="Username"
							value={value}
							onChange={handleInputChange}
						/>
						<button onClick={handleSubmit}>Submit</button>
					</div>
				</div>
			)}
		</>
	);
};
