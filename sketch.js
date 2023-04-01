//Variaveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 25;
let raio = dBolinha/2;

// Velocidade da bolinha 
let velocidadeXBolinha = 2;
let velocidadeYBolinha = 6;

//Variaveis da Raquete 
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//Placar do Jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do Jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  vericaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimenteRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha ()  {
  circle(xBolinha,yBolinha,dBolinha);
}

function movimentaBolinha()  {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function vericaColisaoBorda() {
  if ( xBolinha + raio > width || xBolinha - raio < 0 ){
      velocidadeXBolinha *= -1;
    }  
  if (yBolinha + raio > height || yBolinha - raio < 0){
     velocidadeYBolinha *= -1
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)){
   yRaquete -= 10;
 }
  if (keyIsDown(DOWN_ARROW)){
   yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento
        && yBolinha - raio < yRaquete + raqueteAltura
        && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
      
    }
}

function colisaoRaqueteBiblioteca(x,y) {
  colidiu =  collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimenteRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
  
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  stroke(255);
  fill(color(255,140,0));
  rect(130, 10, 40,20);
  rect (430,10,40,20);
  fill(255);
  text(meusPontos, 150, 26);
  text (pontosDoOponente, 450,26);
}

function marcaPonto(){
  if (xBolinha > 580){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 13){
    pontosDoOponente += 1;
    ponto.play();
  }
}

