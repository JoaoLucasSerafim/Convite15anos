"use strict";

/* ===== CONFIGURAÇÃO (edite aqui) ===== */
const CONFIG = {
  dataEvento: { ano: 2026, mes: 11, dia: 22 },
  // URL pública do convite. Deixe "" para usar o endereço da página aberta.
  siteUrl: "https://marialuiza15.com/",
  // Preencha quando forem informados. Vazio = não aparece no site.
  horario: "12:30",
  enderecoExtenso: "Cristal Eventos, Castanhal - PA",
  telefone: "5591984353223",
  mensagemWhats: "Olá, Maria Luiza! Recebi seu convite de 15 anos e gostaria de confirmar minha presença na festa do dia 22/11/2026.",
  mapsUrl: "https://www.google.com/maps/place/1%C2%B017'31.0%22S+47%C2%B057'24.2%22W/@-1.2919455,-47.9592819,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-1.2919455!4d-47.956707?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D"
};

const $ = (id) => document.getElementById(id);
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Abrir convite */
$("abrir").addEventListener("click", () => {
  $("capa").classList.add("sai");
  const mostrar = () => {
    document.body.classList.add("aberto");
    window.scrollTo(0, 0);
    $("convite").focus({ preventScroll: true });
  };
  reduzir ? mostrar() : setTimeout(mostrar, 700);
});

/* Horário e endereço (só aparecem se preenchidos) */
[["horario", CONFIG.horario], ["endereco", CONFIG.enderecoExtenso]].forEach(([id, v]) => {
  if (v) { $(id).textContent = v; $(id).hidden = false; }
});

/* Links */
$("mapa").href = CONFIG.mapsUrl;
$("zap").href = "https://wa.me/" + CONFIG.telefone + "?text=" + encodeURIComponent(CONFIG.mensagemWhats);

/* Contagem regressiva por dias de calendário (independe de horário) */
function diasRestantes() {
  const h = new Date(), d = CONFIG.dataEvento;
  const hoje = Date.UTC(h.getFullYear(), h.getMonth(), h.getDate());
  return Math.round((Date.UTC(d.ano, d.mes - 1, d.dia) - hoje) / 864e5);
}
function atualizarContagem() {
  const n = diasRestantes();
  $("contagem").textContent =
    n > 1 ? "Faltam " + n + " dias para a festa!" :
    n === 1 ? "Falta 1 dia: a festa é amanhã!" :
    n === 0 ? "É hoje! Vamos celebrar!" :
    "Obrigada por fazer parte desse dia tão especial!";
}
atualizarContagem();
setInterval(atualizarContagem, 60000);

/* Compartilhar: Web Share API → Clipboard API → execCommand */
function aviso(t) { $("aviso").textContent = t; }
function copiarFallback(texto) {
  const ta = document.createElement("textarea");
  ta.value = texto; ta.setAttribute("readonly", "");
  ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
  document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, texto.length);
  let ok = false;
  try { ok = document.execCommand("copy"); } catch (e) {}
  ta.remove();
  return ok;
}
$("compartilhar").addEventListener("click", async () => {
  const url = CONFIG.siteUrl || location.href.split("#")[0];
  const dados = { title: "Maria Luiza – 15 anos", text: "Você está convidado(a) para os 15 anos da Maria Luiza!", url };
  if (navigator.share) {
    try { await navigator.share(dados); return; }
    catch (e) { if (e.name === "AbortError") return; }
  }
  let ok = false;
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(url); ok = true; } catch (e) {}
  }
  if (!ok) ok = copiarFallback(url);
  aviso(ok ? "Link copiado! Agora é só colar e enviar." : "Não foi possível copiar. Copie o endereço na barra do navegador.");
});

/* Entrada suave das seções */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".rv").forEach((el) => el.classList.add("vis"));
}
