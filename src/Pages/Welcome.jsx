import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
	const navigate = useNavigate();

	const [selectedList, setSeletedList] = useState([]);
	useEffect(() => {
		console.log('>>', JSON.parse(localStorage.getItem('favpack')));
		setSeletedList([...JSON.parse(localStorage.getItem('favpack'))]);
	}, []);

	return (
		<div className='bg-red-400'>
			{selectedList.length > 0 ? (
				selectedList.map(ele => {
					console.log(ele);
					return <div key={ele}>{ele.name}</div>;
				})
			) : (
				<div className='empty'>No results found</div>
			)}
			<button
				onClick={() => {
					navigate('/add');
				}}
			>
				Add New
			</button>
		</div>
	);
}

export default Welcome;
