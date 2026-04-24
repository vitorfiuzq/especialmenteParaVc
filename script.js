const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Estrelas
const estrelas = [];
for (let i = 0; i < 150; i++) {
    estrelas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.random() * 1.5,
        opacidade: Math.random(),
        velocidadeOpacidade: Math.random() * 0.01 + 0.005
    });
}

// Gradiente girando
let angulo = 0;

function desenhar() {
    // Fundo com gradiente girando
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const diagonal = Math.sqrt(cx * cx + cy * cy);

    const x1 = cx + Math.cos(angulo) * diagonal;
    const y1 = cy + Math.sin(angulo) * diagonal;
    const x2 = cx + Math.cos(angulo + Math.PI) * diagonal;
    const y2 = cy + Math.sin(angulo + Math.PI) * diagonal;

    const gradiente = ctx.createLinearGradient(x1, y1, x2, y2);
    gradiente.addColorStop(0, "#000000");
    gradiente.addColorStop(0.4, "#05050f");
    gradiente.addColorStop(0.7, "#0a0015");
    gradiente.addColorStop(1, "#000508");

    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    angulo += 0.003;

    // Estrelas piscando
    estrelas.forEach(estrela => {
        estrela.opacidade += estrela.velocidadeOpacidade;
        if (estrela.opacidade > 1 || estrela.opacidade < 0) {
            estrela.velocidadeOpacidade *= -1;
        }

        ctx.beginPath();
        ctx.arc(estrela.x, estrela.y, estrela.raio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${estrela.opacidade})`;
        ctx.fill();
    });

    requestAnimationFrame(desenhar);
}

const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
const botao = document.querySelector('.conteudo a');

const textoH1 = h1.textContent;
const textoH2 = h2.textContent;

h1.textContent = '';
h2.textContent = '';

function digitar(elemento, texto, velocidade, callback) {
    let i = 0;
    elemento.style.opacity = 1;
    const intervalo = setInterval(() => {
        elemento.textContent += texto[i];
        i++;
        if (i === texto.length) {
            clearInterval(intervalo);
            if (callback) callback();
        }
    }, velocidade);
}

setTimeout(() => {
    digitar(h1, textoH1, 100, () => {
        setTimeout(() => {
            digitar(h2, textoH2, 100, () => {
                setTimeout(() => botao.classList.add('visivel'), 500);
            });
        }, 400);
    });
}, 500);

desenhar();