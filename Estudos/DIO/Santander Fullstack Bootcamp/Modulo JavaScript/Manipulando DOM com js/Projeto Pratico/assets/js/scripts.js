const btnToggleTheme = document.getElementById("mode-selector");
const bodyToggleTheme = document.getElementById("body");
const footerToggleTheme = document.getElementById("footer");
const tittle = document.getElementById("page-title");

btnToggleTheme.addEventListener("click", () => {
  tittle.innerText === "Dark Mode ON"
    ? tittle.replaceChildren("Light Mode ON")
    : tittle.replaceChildren("Dark Mode ON");
  bodyToggleTheme.classList.toggle("dark-mode");
  btnToggleTheme.classList.toggle("dark-mode");
  footerToggleTheme.classList.toggle("dark-mode");
});
