import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {ILoginData, login} from "../../store/reducers/MainSlice";
import {useAppDispatch} from "../../hooks/redux";
import {
    Box, Button,
    Container, createTheme,
    CssBaseline,
    Grid, Link,
    TextField,
    ThemeProvider, Typography
} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";


const Login: FC = () => {
    const {setToken} = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState<ILoginData>({username: '', password: '', setToken: setToken, navigate: navigate});
    const dispatch = useAppDispatch()

    const theme = createTheme()

    const loginUser = async (user: ILoginData, e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await dispatch(login(user)).then(res => {
            localStorage.setItem('userId', res.payload.id)
            setToken(res.payload.token)
            navigate('/', { replace: true })
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Авторизация
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={(e: FormEvent<HTMLFormElement>) => loginUser(user, e)}>
                        <TextField
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUser({...user, username: e.target.value})}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            autoFocus
                        />
                        <TextField
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUser({...user, password: e.target.value})}
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item>
                                <NavLink to={'/register'} >
                                    {"Нет аккаунта? Зарегистрируйтесь"}
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;