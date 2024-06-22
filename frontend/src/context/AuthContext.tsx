import { createContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode"

interface AuthContextData {
    getToken: () => string | null;
    setToken: (newToken: string | null) => void;
}

export const AuthContext = createContext<AuthContextData>({
    getToken: () => null,
    setToken: () => ''
});

export const AuthProvider = ({ children }: any) => {

    // State to hold the authentication token
    const [token, setToken_] = useState(localStorage.getItem("token"));

    // Function to set the authentication token
    const setToken = (newToken: string | null) => {
        setToken_(newToken);
    };

    const getToken = () => {

        if (token) {
            const decodedToken = jwtDecode(token);
            if ((decodedToken.exp ?? 0) * 1000 < (new Date()).getTime()) {
                setToken(null);
                return null;
            }
        }

        return token;
    }

    useEffect(() => {
        if (token) {
            //axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("token", token);
        } else {
            //delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
        }
    }, [token]);

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            getToken,
            setToken,
        }),
        [token]
    );

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};