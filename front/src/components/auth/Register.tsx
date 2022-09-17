import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {IAuthData, register} from "../../store/reducers/MainSlice";
import {useAppDispatch} from "../../hooks/redux";
import {
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";

const Register: FC = () => {
    const [user, setUser] = useState<IAuthData>({username: '', password: ''})
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const theme = createTheme()

    const registerUser = async (user: IAuthData, e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(register(user)).then(() => {
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
                        Регистрация
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={(e: FormEvent<HTMLFormElement>) => registerUser(user, e)}>
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
                            Зарегистрироваться
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;