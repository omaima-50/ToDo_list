import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./Store/store";
import { Provider } from "react-redux";
import { persistor } from "./Store/store";  // Fix: corrected to 'persistor' from 'persistore'
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>  {/* Fix: corrected here too */}
        <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>
);
