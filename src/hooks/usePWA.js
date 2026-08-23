import {
    useCallback,
    useEffect,
    useState,
} from "react";

const usePWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstall, setShowInstall] = useState(false);

    const [isStandalone, setIsStandalone] = useState(() =>
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
    );

    const [isIOS] = useState(() =>
        /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    );

    const [isInStandaloneIOS] = useState(() =>
        /iphone|ipad|ipod/i.test(window.navigator.userAgent) &&
        window.navigator.standalone === true
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(display-mode: standalone)"
        );

        const handleDisplayModeChange = (event) => {
            setIsStandalone(
                event.matches ||
                window.navigator.standalone === true
            );
        };

        mediaQuery.addEventListener(
            "change",
            handleDisplayModeChange
        );

        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();

            setDeferredPrompt(event);
            setShowInstall(true);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        const handleAppInstalled = () => {
            setDeferredPrompt(null);
            setShowInstall(false);
            setIsStandalone(true);
        };

        window.addEventListener(
            "appinstalled",
            handleAppInstalled
        );

        return () => {
            mediaQuery.removeEventListener(
                "change",
                handleDisplayModeChange
            );

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

    const handleInstall = useCallback(async () => {
        if (!deferredPrompt) return;

        try {
            deferredPrompt.prompt();

            await deferredPrompt.userChoice;
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