import { useEffect } from "react";

export default function useSpoiler() {
  const spoilerClose = document.querySelector(".spoiler-close");

  const addSpoilerCloseClickListener = () => {
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
      spoilerClose?.removeEventListener("click", addSpoilerCloseClickListener);
    };
  }, []);

  return null;
}
