import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App.tsx";
import {Auth0Provider} from "@auth0/auth0-react";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store.ts";
import {PersistGate} from "redux-persist/integration/react";

// import Login from "./components/auth/LoginButton.tsx";
// Check if the environment variable is defined before using it
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
if (domain == null) {
    throw new Error("VITE_AUTH0_DOMAIN is not defined")
}

// Alternatively, use optional chaining and nullish coalescing if your TypeScript version supports it
const clientId: string = import.meta.env.VITE_AUTH0_CLIENT_ID;
if (clientId == null) {
    throw new Error("VITE_AUTH0_DOMAIN is not defined")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
    >
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <App/>
            </PersistGate>
        </Provider>
    </Auth0Provider>
)
