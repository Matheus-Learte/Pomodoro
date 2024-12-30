let timeDisplay = document.getElementById('time-display');
let startButton = document.getElementById('start-button');
let resetButton = document.getElementById('reset-button');

let totalTime = 30 * 60;
let remainingTime = totalTime;
let timerInterval = null;
let isRunning = false;

const bellSound = new Audio('src/js/bell.mp3.mp3');

/* O evento "DomContentLoaded" faz com que quando a pagina terminar de ser carregada que seja executado o bloco de código
que está dentro do evento.*/
document.addEventListener('DOMContentLoaded', () => {
    const pomodoroButton = document.getElementById('pomodoro-button');
    const shortPauseButton = document.getElementById('short-pause-button');
    const longPauseButton = document.getElementById('long-pause-button');

    /* Essa função tem como objetivo receber a quantidade de minutos que será o timer, tranformar em segundos para um melhor
    controle do tempo restante e chamar a função que seta o display.*/
    function setTimer(minutes) {
        totalTime = minutes * 60;
        remainingTime = totalTime;
        Display();
    }

    /* Essa serve para que quando o botão "pomodoro" for clicado o timer seja setado para 25 minutos. Ela faz isso chamando
    uma função que reseta o timer e chamando a função "setTimer()", onde é passado pelos parâmetros o valor 25.*/
    pomodoroButton.addEventListener('click', () => {
        resetTimer();
        setTimer(30);
    });
    /* Essa função daqui seta o time para 5 minutos quando o botão "short pause" é pressionado. Ela se utiliza do mesmo método
    da anterior para setar o timer.*/
    shortPauseButton.addEventListener('click', () => {
        resetTimer();
        setTimer(5);
    });
    /* Já essa seta o time para 15 minutos quando é apertado o botão "long pause". Essa também se utiliza do mesmo método das
    anteriores.*/
    longPauseButton.addEventListener('click', () => {
        resetTimer();
        setTimer(10);
    });

    /* Essa chamada da função "Display" serve apenas para deixar setado que a página sempre irá iniciar com o tempo do pomodoro, 
    que é de 25 minutos. Isso porque a varíavel "totalTime" é inicializada com o valor, em segundos, de 25 minutos quando é 
    criada.*/
    Display();
});

function Display() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    updateTitle(minutes, seconds);
}

function updateTitle(minutes, seconds) {
    document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} | Pomodoro - CodeLab`;
}

function startTimer() {
    if (!isRunning) {
        timerInterval = setInterval(() => {
            remainingTime--;
            Display();

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                isRunning = false;
                startButton.textContent = 'Start';
                bellSound.play();
            }
        }, 1000);
        startButton.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        startButton.textContent = 'Start';
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    remainingTime = totalTime;
    startButton.textContent = 'Start';
    Display();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

Display();

const fullscreenButton = document.getElementById('icone_fullscreen');

/* A função tem como objetivo fazer a tela ficar ou sair do FullScreen quando o botão que tem no site for apertado. Quando o
evento de click acontece essa função testa se a tela já está em FullScreen ou não olhando o valor de "fullscreenButton" e se 
não estiver em tela cheia ele coloca, se não ele tira.*/
fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Erro ao tentar habilitar o modo tela cheia: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
});

/* Essa função é chamada quando o botão do Instagram que fica no lado direito da página é apertado. Quando ele é pressionado chama
ela, que tem como objetivo passar como parametro para uma outra função, que tem como intuito abrir links, os dois links dos Instagram 
dos criadores da página.*/
function abrirLinksInsta() {
    var urls = [
        'https://www.instagram.com/camzz_psc/',
        'https://www.instagram.com/matheus_learte/'
    ];
    abrirAbas(urls);
}

/* Essa função é chamada quando o ícone do Linkedin que fica no lado direito da página é pressionado. Quando ele é apertado chama 
ela e seu intuito é passar como parâmetro para essa outra função que abre links o link de cada um dos Likedins dos criadores da 
página.*/
function abrirLinksLinkedin() {
    var urls = [
        'https://www.linkedin.com/in/camila-piscioneri-magalh%C3%A3es-5486732b1/',
        'https://www.linkedin.com/in/matheus-learte-9615a929b/'
    ];
    abrirAbas(urls);
}

/* Essa função, assim como as duas anteriores, é chamada quando um ícone que fica no lado direito é pressionado, e esse ícone é o do
GitHub. Ao ser acionada ela passa para a função "abrirAbas()" os links dos respectivos criadores do Pomodoro.*/
function abrirLinksGithub() {
    var urls = [
        'https://github.com/Dr-Verdin',
        'https://github.com/Matheus-Learte'
    ];
    abrirAbas(urls);
}

/* Essa é a função tem o objetivo de abrir os links que ela recebe através dos parâmetros quando é chamada.*/
function abrirAbas(urls) {
    urls.forEach(function(url) {
        window.open(url, '_blank');
    });
}
