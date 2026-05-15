function verificar(){
    let senha = document.getElementById("senha").value;

    if(senha === "euteamo"){
        document.getElementById("login").style.display = "none";
        document.getElementById("livro").style.display = "block";

        document.body.classList.remove("login-state");
        document.body.classList.add("book-state");
    } else {
        alert("Senha errada");
        document.getElementById("senha").value = "";
    }
}

document.querySelectorAll(".entry").forEach(entry => {
    entry.querySelector(".text").textContent = entry.dataset.text;
});

/* PETALAS */
const canvas = document.getElementById("petalas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let petalas = [];

for(let i = 0; i < 40; i++){
    petalas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 2,
        d: Math.random() * 1.5 + 1
    });
}

function desenhar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#b3001b";

    for(let p of petalas){
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.d;
        p.x += Math.sin(p.y * 0.01);

        if(p.y > canvas.height){
            p.y = 0;
            p.x = Math.random() * canvas.width;
        }
    }

    requestAnimationFrame(desenhar);
}

desenhar();

/* SCROLL OBSERVER (ENTRY + CAPA) */
const elements = document.querySelectorAll(".entry, .capa, .pagina, .paginas-titulo");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            entry.target.classList.remove("hide");
        } else {
            entry.target.classList.add("hide");
            entry.target.classList.remove("show");
        }
    });
}, {
    threshold: 0.3
});

elements.forEach(el => observer.observe(el));