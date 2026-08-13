import { useEffect, useState } from "react";

const usePWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstall, setShowInstall] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    const isIOS = /iphone|ipad|ipod/i.test(
        window.navigator.userAgent
    );

    const isInStandaloneIOS =
        window.navigator.standalone === true;

    useEffect(() => {
        setIsStandalone(
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone === true
        );
    }, []);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();

            setDeferredPrompt(e);
            setShowInstall(true);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handler
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handler
            );
        };
    }, []);

    useEffect(() => {
        const onInstalled = () => {
            setShowInstall(false);
            setDeferredPrompt(null);

            console.log("App installed");
        };

        window.addEventListener(
            "appinstalled",
            onInstalled
        );

        return () => {
            window.removeEventListener(
                "appinstalled",
                onInstalled
            );
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        const { outcome } =
            await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            console.log("PWA installed");
        } else {
            console.log("User dismissed install");
        }

        setDeferredPrompt(null);
        setShowInstall(false);
    };

    return {
        showInstall,
        isStandalone,
        isIOS,
        isInStandaloneIOS,
        handleInstall,
    };
};

export default usePWA;