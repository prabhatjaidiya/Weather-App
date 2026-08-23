import { useCallback, useRef, useState } from "react";

const useElementWidth = () => {
    const [width, setWidth] = useState(0);
    const observerRef = useRef(null);

    const ref = useCallback((element) => {
        // Cleanup previous observer
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        if (!element) return;

        const updateWidth = () => {
            const nextWidth = Math.floor(
                element.getBoundingClientRect().width
            );

            if (nextWidth > 0) {
                setWidth((prevWidth) =>
                    prevWidth === nextWidth
                        ? prevWidth
                        : nextWidth
                );
            }
        };

        // Initial measurement
        updateWidth();

        // Measure again after layout
        const frame = requestAnimationFrame(() => {
            updateWidth();
        });

        const observer = new ResizeObserver(() => {
            updateWidth();
        });

        observer.observe(element);

        observerRef.current = observer;

        // Cleanup frame when the element is removed
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();

            if (observerRef.current === observer) {
                observerRef.current = null;
            }
        };
    }, []);

    return [ref, width];
};

export default useElementWidth;