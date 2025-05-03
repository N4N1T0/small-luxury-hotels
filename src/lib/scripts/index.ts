export const navbarAnimation = (navbarId: string) => {
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById(navbarId);

  return () => {
    const currentScrollY = window.scrollY;

    if (!navbar) return;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  };
};

export const $ = (selector: string): HTMLElement | null =>
  document.querySelector(selector);
export const $$ = (selector: string): NodeListOf<HTMLElement> =>
  document.querySelectorAll(selector);

export const toggleOpacity = (
  element: HTMLElement | null,
  opacity: "100" | "0",
): void => {
  if (!element) return;
  if (opacity === "100") {
    element.classList.remove("opacity-0");
    element.classList.add("opacity-100");
    return;
  } else {
    element.classList.remove("opacity-100");
    element.classList.add("opacity-0");
    return;
  }
};

export const toggleClass = (
  element: HTMLElement | null,
  className: string,
): void => {
  if (!element) return;
  if (element.classList.contains(className)) {
    element.classList.remove(className);
    return;
  } else {
    element.classList.add(className);
    return;
  }
};
