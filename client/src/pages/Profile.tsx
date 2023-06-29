import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Container, Grid, TextField } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../context';
import { FormikProvider, useFormik } from 'formik';

export const Profile = () => {
	const { user } = useContext(AuthContext);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			first_name: user?.first_name ? user.first_name : '',
			last_name: user?.last_name ? user.last_name : '',
			username: user?.username ? user.username : '',
			phone: user?.phone ? user.phone : '',
			email: user?.email ? user.email : '',
		},
		onSubmit: async (values) => {
			console.log(values);
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
				{/* <Typography component="h1" variant="h5">
					Sign up
				</Typography> */}
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
									id="first_name"
									label="First Name"
									value={formik.values.first_name}
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
									id="last_name"
									label="Last Name"
									name="last_name"
									autoComplete="family-name"
									value={formik.values.last_name}
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
									value={formik.values.username}
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
									fullWidth
									id="phone"
									label="Phone Number"
									name="phone"
									value={formik.values.phone}
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
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={formik.values.email}
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
						</Grid>
						<LoadingButton
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Update Account
						</LoadingButton>
					</Box>
				</FormikProvider>
			</Box>
		</Container>
	);
};
