import React, {createContext, useContext} from 'react';
import useToken from "../components/hooks/useToken";

interface AuthContextType {
    token: string | null
    setToken: (UserApiKey: string) => void
}

const AuthContext = createContext<AuthContextType>(null!)

const AuthProvider = ({children} : { children: React.ReactNode })  => {
    const {token, setToken} = useToken();

    let value = {token, setToken};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;