import {
    useCallback,
    useEffect,
    useState,
} from "react";

const usePWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstall, setShowInstall] = useState(false);

    const [isStandalone, setIsStandalone] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isInStandaloneIOS, setIsInStandaloneIOS] = useState(false);

    useEffect(() => {
        // -----------------------------
        // Detect standalone mode
        // -----------------------------
        const standalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone === true;

        setIsStandalone(standalone);

        // -----------------------------
        // Detect iOS
        // -----------------------------
        const ios =
            /iphone|ipad|ipod/i.test(
                window.navigator.userAgent
            );

        setIsIOS(ios);

        // iOS standalone mode
        setIsInStandaloneIOS(
            ios && window.navigator.standalone === true
        );

        // -----------------------------
        // Android / Chromium install
        // -----------------------------
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();

            setDeferredPrompt(event);
            setShowInstall(true);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        // -----------------------------
        // App installed
        // -----------------------------
        const handleAppInstalled = () => {
            setDeferredPrompt(null);
            setShowInstall(false);

            console.log("PWA installed");
        };

        window.addEventListener(
            "appinstalled",
            handleAppInstalled
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );

            window.removeEventListener(
                "appinstalled",
                handleAppInstalled
            );
        };
    }, []);

    // -----------------------------
    // Install app
    // -----------------------------
    const handleInstall = useCallback(async () => {
        if (!deferredPrompt) return;

        try {
            deferredPrompt.prompt();

            const { outcome } =
                await deferredPrompt.userChoice;

            console.log(
                `PWA install result: ${outcome}`
            );
        } catch (error) {
            console.error(
                "PWA install failed:",
                error
            );
        } finally {
            setDeferredPrompt(null);
            setShowInstall(false);
        }
    }, [deferredPrompt]);

    return {
        showInstall,
        isStandalone,
        isIOS,
        isInStandaloneIOS,
        handleInstall,
    };
};

export default usePWA;