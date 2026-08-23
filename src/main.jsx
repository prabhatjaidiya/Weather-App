import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

if (
    import.meta.env.PROD &&
    "serviceWorker" in navigator
) {
    window.addEventListener("load", async () => {
        try {
            const registration =
                await navigator.serviceWorker.register("/sw.js");

            registration.addEventListener(
                "updatefound",
                () => {
                    const newWorker =
                        registration.installing;

                    if (!newWorker) return;

                    newWorker.addEventListener(
                        "statechange",
                        () => {
                            if (
                                newWorker.state === "installed" &&
                                navigator.serviceWorker.controller
                            ) {

                                newWorker.postMessage({
                                    type: "SKIP_WAITING",
                                });
                            }
                        }
                    );
                }
            );

            navigator.serviceWorker.addEventListener(
                "controllerchange",
                () => {
                    window.location.reload();
                },
                { once: true }
            );
        } catch (error) {
            console.error(
                "Service Worker registration failed:",
                error
            );
        }
    });
}