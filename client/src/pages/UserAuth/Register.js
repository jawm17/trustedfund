import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import AuthMessage from './AuthMessage';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href=" ">
//                 MyMo
//       </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

const Register = props => {
    const classes = useStyles();
    const [user, setUser] = useState({ username: "", password: "", password2: "" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setUser({ username: "", password: "", password2: "" });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (!user.username || !user.password || !user.password2) {
            setMessage({ msgBody: "Please fill out all fields", msgError: true });
        }
        else if (user.password !== user.password2) {
            setMessage({ msgBody: "Passwords do not match", msgError: true });
            setUser({ ...user, password: "", password2: "" });
        }
        else {
            AuthService.register(user).then(data => {
                const { message } = data;
                setMessage(message);
                console.log(data);
                resetForm();
                if (!message.msgError) {
                    timerID = setTimeout(() => {
                        props.history.push('/login');
                    }, 1500)
                }
            });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h2" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} onSubmit={onSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={user.username}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={user.password}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password2"
                                label="Repeat Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={user.password2}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    {message ? <AuthMessage message={message} /> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/* <Box mt={5}>
                <Copyright />
            </Box> */}
        </Container>
    );
}

export default Register;