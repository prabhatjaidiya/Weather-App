import { useEffect, useRef, useState } from "react";

const useElementWidth = () => {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const updateWidth = () => {
            const nextWidth = Math.floor(
                element.getBoundingClientRect().width
            );

            setWidth((prevWidth) =>
                prevWidth === nextWidth
                    ? prevWidth
                    : nextWidth
            );
        };

        updateWidth();

        const observer = new ResizeObserver(() => {
            updateWidth();
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return [ref, width];
};

export default useElementWidth;