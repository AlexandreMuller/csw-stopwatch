var segundoDecorrido = 0;
var intervaloTempo = 10;
var timerID;
var minuto = 0;
var hora = 0;
var marcacao = 0;

function pausarCronometro(){
    //bloquear o botao de pausar
    var pauseButton = document.getElementById("pause");
    pauseButton.disabled = true;

    //desbloquear o botao de iniciar
    var playButton = document.getElementById("play");
    playButton.disabled = false;

    //desbloquear o botao de zerar
    var resetButton = document.getElementById("reset");
    resetButton.disabled = false;

    //mudar nome do botao de 'iniciar' para 'continuar'
    document.getElementById("play-text").innerText = "Continuar";

    clearInterval(timerID);
}

function iniciarCronometro(){
    //bloquear o botao de iniciar
    var playButton = document.getElementById("play");
    playButton.disabled = true;

    //desbloquear o botao de pausar
    var pauseButton = document.getElementById("pause");
    pauseButton.disabled = false;

    //bloquear o botao de zerar
    var resetButton = document.getElementById("reset");
    resetButton.disabled = true;

    //desbloquear o botao de marcacao
    var markButton = document.getElementById("mark-button");
    markButton.disabled = false;

    //iniciar o cronometro
    timerID = setInterval(contar, intervaloTempo);
}

function contar(){
    //segundos
    segundoDecorrido += intervaloTempo;
    var seg = document.getElementById("segundos");
    seg.innerHTML = (segundoDecorrido/1000).toFixed(2) + " s";

    //minutos
    if(segundoDecorrido == 60000){
        minuto += 1;
        var min = document.getElementById("minutos");
        min.innerHTML = minuto + " m ";

        //zerar os segundos
        segundoDecorrido = 0;
    }

    //horas
    if(minuto == 60){
        hora += 1;
        var hor = document.getElementById("horas");
        hor.innerHTML = hora + " h ";

        //zerar os minutos
        minuto = 0;
        var min = document.getElementById("minutos");
        min.innerHTML = " 0 m ";
    }
}

function zerarCronometro(){
    //bloquear o botao de zerar
    var resetButton = document.getElementById("reset");
    resetButton.disabled = true;

    //bloquear o botao de marcacao
    var markButton = document.getElementById("mark-button");
    markButton.disabled = true;

    //zerar os segundos
    segundoDecorrido = 0;
    var resetButton = document.getElementById("segundos").innerHTML = "0.00 s";

    //zerar os minutos
    var resetButton = document.getElementById("minutos").innerHTML = "";
    minuto = 0;

    //zerar a hora
    var resetButton = document.getElementById("horas").innerHTML = "";
    hora = 0;
    
    //mudar nome do botao de 'continuar' para 'iniciar'
    document.getElementById("play-text").innerText = "Iniciar";
}

//marcar o tempo atual do cronometro
function marcarCronometro(){
    if(hora >= 1){  //horas
        var markButton = document.getElementById("mark");
        markButton.innerHTML += '<div id="marking-style"><span>Tempo marcado: ' + hora +' h, ' + minuto + " min e " + (segundoDecorrido/1000).toFixed(2) + ' seg </span><span onclick="apagarMarcacao(this.parentElement);" class="w2-button w3-small">X</span></div>';
        //acrescentar uma marcacao
        marcacao += 1;
    }
    else if(minuto >= 1 && minuto <= 59){   //minutos
        var markButton = document.getElementById("mark");
        markButton.innerHTML += '<div id="marking-style"><span>Tempo marcado: ' + minuto + ' min e ' + (segundoDecorrido/1000).toFixed(2) + ' seg </span><span onclick="apagarMarcacao(this.parentElement);" class="w2-button w3-small">X</span></div>';
        //acrescentar uma marcacao
        marcacao += 1;
    }
    else{   //segundos
        var markButton = document.getElementById("mark");
        markButton.innerHTML += '<div id="marking-style"><span>Tempo marcado: ' + (segundoDecorrido/1000).toFixed(2) + ' seg</span><span onclick="apagarMarcacao(this.parentElement);" id="teste" class="w2-button w3-small">X</span></div>';
        //acrescentar uma marcacao
        marcacao += 1;
    }

    //verificar se as marcacoes for maior ou igual a um
    if(marcacao >= 1){
        document.getElementById("clean").disabled = false;
    }
}

//limpar todas as marcacoes que estao na janela
function limparMarcacao(){
    //apagar marcacoes
    var cleanButton = document.getElementById("mark");
    cleanButton.innerHTML = "";

    //desabilitar o botao de limpar
    var cleanButton = document.getElementById("clean");
    cleanButton.disabled = true;
    marcacao = 0; //zerar as marcacoes

    //fechar janela de alerta
    document.getElementById("alerta").style.display="none";

    //verificar se a marcacao for igual a zero
    if(marcacao == 0){
        document.getElementById("clean").disabled = true;
    }
}

//apagar as marcacoes individualmente
function apagarMarcacao(el){
    var apagar = el;
    apagar.remove();

    //descontar uma marcacao
    marcacao -= 1;

    //verificar se a marcacao for igual a zero
    if(marcacao == 0){
        document.getElementById("clean").disabled = true;
    }
}