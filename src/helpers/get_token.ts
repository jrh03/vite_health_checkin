import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

// Custom hook to get an access token
export const useGetAccessToken = (scope: string) => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const getAccessToken = async () => {
            const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: audience,
                        scope: scope
                    }
                });
                setAccessToken(token);
            } catch (e) {
                console.log('Silent authentication failed, attempting authentication with popup:', e);
                try {
                    const token = await getAccessTokenWithPopup({
                        authorizationParams: {
                            audience: audience,
                            scope: scope
                        }
                    });
                    if (token) {
                        setAccessToken(token);
                    }
                } catch (popupError) {
                    console.error('Error obtaining the access token with popup:', popupError);
                }
            }
        };

        getAccessToken();
    }, []); // Dependencies

    return accessToken;
};
