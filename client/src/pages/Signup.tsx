import {
	Alert,
	Avatar,
	Box,
	Container,
	Grid,
	Link as MuiLink,
	TextField,
	Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context';

const userSchema = Yup.object().shape({
	first_name: Yup.string().required('First name is required'),
	last_name: Yup.string().required('Last name is required'),
	username: Yup.string().required('Username is required'),
	phone: Yup.string()
		.min(10, 'Phone number should have 10 digits')
		.max(10, 'Phone number cannot have more than 10 digits')
		.optional(),
	email: Yup.string()
		.email('Enter a valid email address')
		.required('Email address is required'),
	password: Yup.string()
		.min(5, 'Password cannot be less than 5 characters')
		.required('Password is required'),
});

export const Signup = () => {
	const [error, setError] = useState('');

	const { login } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			first_name: '',
			last_name: '',
			username: '',
			phone: '',
			email: '',
			password: '',
		},
		validationSchema: userSchema,
		onSubmit: async (values) => {
			setError('');
			try {
				const response = await fetch('/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				});

				const data = await response.json();

				if (data instanceof Array) {
					// This means there are errors
					setError(data[0]);
				} else {
					// success
					login(data.user);
				}
			} catch (error) {
				console.log('Errors', error);
			}
		},
	});

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					{/* <LockOutlinedIcon /> */}
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				{error && <Alert severity="error">{error}</Alert>}
				<FormikProvider value={formik}>
					<Box
						component="form"
						noValidate
						onSubmit={formik.handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="first_name"
									required
									fullWidth
									id="firstName"
									label="First Name"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.first_name &&
										Boolean(formik.errors.first_name)
									}
									helperText={
										formik.touched.first_name &&
										formik.errors.first_name
									}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="last_name"
									autoComplete="family-name"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.last_name &&
										Boolean(formik.errors.last_name)
									}
									helperText={
										formik.touched.last_name &&
										formik.errors.last_name
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.username &&
										Boolean(formik.errors.username)
									}
									helperText={
										formik.touched.username &&
										formik.errors.username
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.email &&
										Boolean(formik.errors.email)
									}
									helperText={
										formik.touched.email &&
										formik.errors.email
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									name="phone"
									label="Phone number"
									id="phone"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.phone &&
										Boolean(formik.errors.phone)
									}
									helperText={
										formik.touched.phone &&
										formik.errors.phone
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									name="password"
									label="Password"
									id="password"
									required
									type="password"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.password &&
										Boolean(formik.errors.password)
									}
									helperText={
										formik.touched.password &&
										formik.errors.password
									}
								/>
							</Grid>
						</Grid>
						<LoadingButton
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							loading={formik.isSubmitting}
						>
							Sign Up
						</LoadingButton>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<MuiLink
									to="/login"
									variant="body2"
									component={Link}
								>
									Already have an account? Sign in
								</MuiLink>
							</Grid>
						</Grid>
					</Box>
				</FormikProvider>
			</Box>
		</Container>
	);
};
