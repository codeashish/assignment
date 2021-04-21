import React, { Component } from 'react';
import axios from 'axios';

class Cities extends Component {
	constructor() {
		super();
		this.state = {
			cities: [],
		};
	}
	async componentDidMount() {
		let res = await axios.get('/cities');
		this.setState({
			cities: res.data.data,
		});
	}
	render() {
		const { cities } = this.state;
		console.log(cities);
		return (
			<div className="container">
				<ul className="list-group" style={{ display: 'flex', justifyContent: 'center' }}>
					{cities.map((city) => (
						<li className="list-group-item list-group-item-dark" key={city.id}>
							{city.name}
							<br />
							<small>{city.state}</small>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Cities;
