//Modo oscuro
const root = document.documentElement;
const modeBtn = document.getElementById("mode");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  root.classList.add("dark");
  if (modeBtn) modeBtn.setAttribute("aria-pressed", "true");
}

if (modeBtn) {
  modeBtn.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    modeBtn.setAttribute("aria-pressed", String(isDark));
  });
}

const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const mensaje = form.mensaje.value.trim();
    const status = document.getElementById("formStatus");
    status.textContent = "";

    const errors = [];
    if (nombre.length < 2) errors.push("Nombre muy corto.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))
      errors.push("Correo inválido.");
    if (mensaje.length < 5) errors.push("Mensaje muy corto.");

    if (errors.length) {
      status.textContent = errors.join(" ");
      status.style.color = "crimson";
      return;
    }

    const subject = encodeURIComponent("Consulta desde el portafolio");
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo: ${correo}\n\n${mensaje}`
    );
    const destSel = document.getElementById("destinatario");
    const map = { caroo: "caroo@ejemplo.com", dallane: "dallane@ejemplo.com" };
    const to = map[destSel?.value] || "contacto@example.com";
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    status.textContent = "Abriendo cliente de correo…";
    status.style.color = "inherit";
    form.reset();
  });
}

// --------- Extra hover effects (accesibles) ----------
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () =>
    card.setAttribute("aria-live", "polite")
  );
});
