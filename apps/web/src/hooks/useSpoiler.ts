import { useEffect } from "react";

export default function useSpoiler() {
  const addSpoilerCloseClickListener = () => {
    const spoilerClose = document.querySelector(".spoiler-close");

    spoilerClose?.addEventListener("click", (event) => {
      const targetElement = event.target;

      if (targetElement instanceof Element) {
        targetElement.classList.remove("spoiler-close");
        targetElement.classList.add("spoiler-open");
      }
    });
  };

  useEffect(() => {
    addSpoilerCloseClickListener();

    return () => {
      const spoilerClose = document.querySelector(".spoiler-close");
      spoilerClose?.removeEventListener("click", addSpoilerCloseClickListener);
    };
  }, []);

  return null;
}
