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
