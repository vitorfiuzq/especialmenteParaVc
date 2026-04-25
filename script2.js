const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

let angulo = 0;

function desenhar() {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const diagonal = Math.sqrt(cx * cx + cy * cy);

    const x1 = cx + Math.cos(angulo) * diagonal;
    const y1 = cy + Math.sin(angulo) * diagonal;
    const x2 = cx + Math.cos(angulo + Math.PI) * diagonal;
    const y2 = cy + Math.sin(angulo + Math.PI) * diagonal;

    const gradiente = ctx.createLinearGradient(x1, y1, x2, y2);
    gradiente.addColorStop(0, "#000000");
    gradiente.addColorStop(0.4, "#0d0005");
    gradiente.addColorStop(0.7, "#1a0010");
    gradiente.addColorStop(1, "#0a0008");

    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    angulo += 0.003;

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

desenhar();

const titulo = document.querySelector('.titulo h1');
const subtitulo = document.querySelector('.subtitulo');

setTimeout(() => titulo.classList.add('visivel'), 500);
setTimeout(() => subtitulo.classList.add('visivel'), 1200);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        } else {
            entry.target.classList.remove('visivel');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.card, .carta').forEach(el => {
    observer.observe(el);
});

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalNome = document.getElementById('modalNome');
const modalFrase = document.getElementById('modalFrase');
const modalFechar = document.getElementById('modalFechar');
const conteudo = document.querySelector('.modal-conteudo');

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const rect = card.getBoundingClientRect();

        conteudo.style.top = rect.top + 'px';
        conteudo.style.left = rect.left + 'px';
        conteudo.style.width = rect.width + 'px';
        conteudo.style.height = rect.height + 'px';
        conteudo.style.transform = 'none';

        modalImg.src = card.dataset.img;
        modalNome.textContent = card.dataset.nome;
        modalFrase.textContent = card.dataset.frase;

        card.classList.add('selecionado');
        modal.classList.add('aberto');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                conteudo.style.top = '50%';
                conteudo.style.left = '50%';
                conteudo.style.width = '600px';
                conteudo.style.height = rect.height + 'px';
                conteudo.style.transform = 'translate(-50%, -50%)';
            });
        });
    });
});

modalFechar.addEventListener('click', fechar);
modal.addEventListener('click', (e) => {
    if (e.target === modal) fechar();
});

function fechar() {
    modal.classList.remove('aberto');
    document.querySelectorAll('.card.selecionado').forEach(c => c.classList.remove('selecionado'));
    setTimeout(() => {
        conteudo.style.top = '';
        conteudo.style.left = '';
        conteudo.style.width = '';
        conteudo.style.height = '';
        conteudo.style.transform = '';
    }, 500);
}