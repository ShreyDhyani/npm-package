import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chooser.css';

function Chooser() {
	const [resultsArray, setResultsArray] = useState([]);
	const [localList, setLocalList] = useState([]);
	let selectedPackage = '';
	let reason = '';
	const navigate = useNavigate();

	const onInput = async query => {
		if (query !== '') {
			const val = await fetch(`https://api.npms.io/v2/search?q=${query}`)
				.then(res => {
					return res.json();
				})
				.then(result => {
					return result.results.map(ele => ele.package.name);
				})
				.catch(error => {
					console.log(error);
				});
			setResultsArray([...val]);
		}
	};

	const handleClick = () => {
		if (selectedPackage !== '' && reason !== '') {
			//   localStorage.setItem("packages", );
			// localList.push({name:selectedPackage, reason:reason});

			const temp = localList;
			temp.push({ name: selectedPackage, reason: reason });
			console.log(temp);
			localStorage.setItem('favpack', JSON.stringify(temp));
			//   navigator
			navigate('/');
		}
	};

	useEffect(() => {
		if (localStorage.getItem('favpack')) {
			console.log('Check');
			setLocalList([...JSON.parse(localStorage.getItem('favpack'))]);
		} else {
			localStorage.setItem('favpack', JSON.stringify([]));
		}
	}, []);

	return (
		<div className='wrapper'>
			<input
				className='input-field'
				onInput={e => {
					onInput(e.target.value);
				}}
			></input>
			<div className='wrapper2'>
				{resultsArray.length > 0 &&
					resultsArray.map(ele => {
						return (
							<div key={ele}>
								{' '}
								<input
									key={ele}
									type={'radio'}
									name={'grouped'}
									onClick={() => {
										selectedPackage = ele;
									}}
								/>
								{ele}
							</div>
						);
					})}
			</div>
			<textarea
				id='reason'
				rows={10}
				onInput={e => {
					// console.log(e.target.value);
					reason = e.target.value;
				}}
			></textarea>

			<button onClick={handleClick}>Submit</button>
		</div>
	);
}

export default Chooser;
