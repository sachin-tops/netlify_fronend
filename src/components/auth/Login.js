import React, {  useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {  useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";


const Login = ({ login, isLoggedIn }) => {
	const dispatch = useDispatch();
	// const [formData, setFormData] = useState({
	// 	email: "",
	// 	password: "",
	// });

	const initialValues = { email: "", password: "" };
	const [formData, setFormData] = useState(initialValues);
	const [isSubmit, setIsSubmit] = useState(false);


	const { email, password } = formData;
	const [formErrors, setFormErrors] = useState({});
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		setFormErrors(validate(formData));
		setIsSubmit(true);
		dispatch(login(formData));
		login(email, password);
	};

	useEffect(() => {
		console.log("sachin",formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
		    console.log("patel",formData);
		}
	  }, [formErrors]);

	if (isLoggedIn) {
		return <Redirect to="/dashboard" />;
	}

	const validate = () => {
		const values = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		 console.log(typeof("sach",values))
		
		if (!values.email) {
			values.email = "Email is required!";
		} else if (!regex.test(values.email)) {
			values.email = "This is not a valid email format!";
		}
		if (!values.password) {
			values.password = "Password is required";
		} else if (values.password.length < 4) {
			values.password = "Password must be more than 4 characters";
		} else if (values.password.length > 10) {
			values.password = "Password cannot exceed more than 10 characters";
		}
		return values;
	  };
	return (
		<div className="login-form">
			<h1 className="heading">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign Into Your Account
			</p>
			{/* <Alert /> */}
			<br />
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={formData.email}
						onChange={(e) => onChange(e)}
						
					/>
					<p style={{color:'red'}}>{formErrors.email}</p>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						value={formData.password}
						onChange={(e) => onChange(e)}
						
					/>
						<p style={{color:'red'}}>{formErrors.password}</p>
				</div>
				<div className="col d-flex justify-content-center">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </div>
				<input type="submit" className="btn" value="Login" />
			</form>
			
			<p className="link">
				Dont have an account? <Link to="/register">Sign Up</Link>
			</p>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, { login })(Login);