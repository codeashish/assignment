import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Login extends Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: '',
			password: '',
			errors: {},
		};
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	async onSubmit(e) {
		e.preventDefault();
		const newUser = { username: this.state.username, password: this.state.password };
		try {
			let res = await axios.post('/auth/login', newUser);
			window.localStorage.setItem('token', res.data.token);

			window.location.href = '/cities';
		} catch (err) {
			this.setState({ errors: err.response.data });
		}
	}
	render() {
		const { errors } = this.state;

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control', {
											'is-invalid': !errors.success,
										})}
										placeholder="username"
										name="username"
										value={this.state.username}
										onChange={this.onChange}
										required
									/>
								</div>
								<div className="form-group">
									<input
										type="password"
										className={classnames('form-control form-control', {
											'is-invalid': !errors.success,
										})}
										placeholder="Password"
										value={this.state.password}
										onChange={this.onChange}
										name="password"
									/>
									{!errors.success && <div className="invalid-feedback">{errors.error}</div>}
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
