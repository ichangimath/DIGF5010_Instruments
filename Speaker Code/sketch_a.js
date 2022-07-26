
const serviceUuidA = "2ea20e27-d06d-4039-a242-d28685015a7f";
const serviceUuidB = "2ea20e28-d06d-4039-a242-d28685015a5d";
const serviceUuidC = "2ea20e28-d06d-4039-a242-d286850152ff";

let instA_value = "111", instB_value = "1", instC_value="11111111";

let prev_instA_value = "111", prev_instB_value = "1", prev_instC_value="11111111";
let charactersticA, charactersticB, charactersticC;
let myBLEa, myBLEb, myBLEc;
let sax_c_sound,sax_e_sound,sax_g_sound;
let drums_snare_sound,drums_cymbal_sound,drums_bass_sound;
let guitar_sound_1,guitar_sound_2,guitar_sound_3,guitar_sound_4,guitar_sound_5,guitar_sound_6,guitar_sound_7,guitar_sound_8;

let sax_sounds = [], drum_sounds = [], guitar_sounds = [];

function preload(){
  
  sax_c_sound = loadSound('music/C_sax.mp3');
  sax_e_sound = loadSound('music/E_sax.mp3');
  sax_g_sound = loadSound('music/G_sax.mp3');
  drums_snare_sound = loadSound("music/snare_drum.mp3");
  drums_bass_sound = loadSound("music/bass_drum.mp3");
  drums_cymbal_sound = loadSound("music/cymbals.mp3");
  guitar_sound_1 = loadSound("music/g1.wav");
  guitar_sound_2 = loadSound("music/g2.wav");
  guitar_sound_3 = loadSound("music/g3.wav");
  guitar_sound_4 = loadSound("music/g4.wav");
  guitar_sound_5 = loadSound("music/g5.wav");
  guitar_sound_6 = loadSound("music/g6.wav");
  guitar_sound_7 = loadSound("music/g7.wav");
  guitar_sound_8 = loadSound("music/g8.wav");

  sax_sounds.push(sax_c_sound);
  sax_sounds.push(sax_e_sound);
  sax_sounds.push(sax_g_sound);
  drum_sounds.push(drums_bass_sound);
  drum_sounds.push(drums_snare_sound);
  drum_sounds.push(drums_cymbal_sound);
  guitar_sounds.push(guitar_sound_1);
  guitar_sounds.push(guitar_sound_2);
  guitar_sounds.push(guitar_sound_3);
  guitar_sounds.push(guitar_sound_4);
  guitar_sounds.push(guitar_sound_5);
  guitar_sounds.push(guitar_sound_6);
  guitar_sounds.push(guitar_sound_7);
  guitar_sounds.push(guitar_sound_8);
}

function setup() {
  myBLEa = new p5ble();
  myBLEb = new p5ble();
  myBLEc = new p5ble();

  createCanvas(200, 200);
  textSize(20);
  textAlign(CENTER, CENTER);

  const connectAButton = createButton('Connect A')
  connectAButton.mousePressed(connectToBleA);
  const connectBButton = createButton('Connect B')
  connectBButton.mousePressed(connectToBleB);
  const connectCButton = createButton('Connect C')
  connectCButton.mousePressed(connectToBleC);
}

function connectToBleA() {
  myBLEa.connect(serviceUuidA, gotCharacteristicsA);
}
function gotCharacteristicsA(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);
  charactersticA = characteristics;
  myBLEa.read(charactersticA[0],'string', gotValueA);
}
function gotValueA(error, value) {
  if (error) console.log('error: ', error);
  console.log('value a: ', value);
  instA_value = value;
  
  for (var i =0; i<instA_value.toString().length;i++){
    if((instA_value.toString()).charAt(i)=='2'){
      if(!sax_sounds[i].isPlaying()){sax_sounds[i].play();}
    }
    else{
      sax_sounds[i].stop();
    }
  }
 
  myBLEa.read(charactersticA[0],'string',gotValueA);
}

function connectToBleB() {
  myBLEb.connect(serviceUuidB, gotCharacteristicsB);  
}
function gotCharacteristicsB(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);
  charactersticB = characteristics;
  myBLEb.read(charactersticB[0],'string', gotValueB);
}
function gotValueB(error, value) {
  if (error) console.log('error: ', error);
  console.log('value b: ', value);
  instB_value = value;
  
  for (var i =0; i<instB_value.toString().length;i++){
    if((instB_value.toString()).charAt(i)=='2'){
      if((prev_instB_value.toString()).charAt(i)=='1'){
        drum_sounds[i].stop(); drum_sounds[i].play();
      }
      else{
        //if(!drum_sounds[i].isPlaying()){drum_sounds[i].play();}
      }
    }
    else{
      //drum_sounds[i].stop();
    }
  }

  prev_instB_value = instB_value;

  myBLEb.read(charactersticB[0],'string',gotValueB);
}

function connectToBleC() {
  myBLEc.connect(serviceUuidC, gotCharacteristicsC);
}
function gotCharacteristicsC(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);
  charactersticC = characteristics;
  myBLEc.read(charactersticC[0],'string', gotValueC);
}
function gotValueC(error, value) {
  if (error) console.log('error: ', error);
  console.log('value c: ', value);
  instC_value = value;

  
  for (var i =0; i<instC_value.toString().length;i++){
    if((instC_value.toString()).charAt(i)=='2'){
      if(!guitar_sounds[i].isPlaying()){guitar_sounds[i].play();}
    }
    else{
      guitar_sounds[i].stop();
    }
  }

  myBLEc.read(charactersticC[0],'string',gotValueC);
}

function draw() {
  background(250);
}