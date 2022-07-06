const serviceUuidA = "2ea20e27-d06d-4039-a242-d28685015a7f";
const serviceUuidB = "2ea20e28-d06d-4039-a242-d28685015a7f";
let instA_value, instB_value, instC_value;
let charactersticA, charactersticB, charactersticC;
let myBLEa, myBLEb, myBLEc;
let sax_sounds = [];
let drum_sounds = [];
let sax_c_sound,
  sax_e_sound,
  sax_g_sound,
  drums_snare_sound,
  drums_bass_sound,
  drums_cymbal_sound;

function preload() {
  sax_c_sound = loadSound(
    "https://github.com/ichangimathprayag/DIGF5010_Instruments/raw/main/Sounds/C_sax.mp3"
  );
  sax_e_sound = loadSound(
    "https://github.com/ichangimathprayag/DIGF5010_Instruments/raw/main/Sounds/E_sax.mp3"
  );
  sax_g_sound = loadSound(
    "https://github.com/ichangimathprayag/DIGF5010_Instruments/raw/main/Sounds/G_sax.mp3"
  );
  drums_snare_sound = loadSound(
    "https://github.com/ichangimathprayag/DIGF5010_Instruments/raw/main/Sounds/snare_drum.mp3"
  );
  drums_bass_sound = loadSound(
    "https://github.com/ichangimathprayag/DIGF5010_Instruments/raw/main/Sounds/bass_drum.mp3"
  );
  drums_cymbal_sound = loadSound(
    "https://github.com/ichangimathprayag/DIGF5010_Instruments/raw/main/Sounds/cymbals.mp3"
  );

  sax_sounds.push(sax_c_sound);
  sax_sounds.push(sax_e_sound);
  sax_sounds.push(sax_g_sound);

  drum_sounds.push(drums_snare_sound);
  drum_sounds.push(drums_bass_sound);
  drum_sounds.push(drums_cymbal_sound);
}

function setup() {
  // Create a p5ble class
  myBLEa = new p5ble();
  myBLEb = new p5ble();
  myBLEc = new p5ble();

  createCanvas(200, 200);
  textSize(20);
  textAlign(CENTER, CENTER);

  // Create a 'Connect' button
  const connectAButton = createButton("Connect A");
  connectAButton.mousePressed(connectToBleA);
  const connectBButton = createButton("Connect B");
  connectBButton.mousePressed(connectToBleB);
  const connectCButton = createButton("Connect C");
  connectCButton.mousePressed(connectToBleC);
}

function connectToBleA() {
  // Connect to a device by passing the service UUID
  myBLEa.connect(serviceUuidA, gotCharacteristicsA);
}

function connectToBleB() {
  // Connect to a device by passing the service UUID
  myBLEb.connect(serviceUuidB, gotCharacteristicsB);
}
function connectToBleC() {
  // Connect to a device by passing the service UUID
  myBLEb.connect(serviceUuidB, gotCharacteristicsC);
}

// A function that will be called once got characteristics
function gotCharacteristicsA(error, characteristics) {
  if (error) console.log("error: ", error);
  console.log("characteristics: ", characteristics);
  xCharactersticA = characteristics;

  // Read the value of the first characteristic
  myBLEa.read(charactersticA[0], "string", gotValueA);
}
function gotValueA(error, value) {
  if (error) console.log("error: ", error);
  console.log("value a: ", value);
  instA_value = value;
  // After getting a value, call p5ble.read() again to get the value again
  myBLEa.read(charactersticA[0], "string", gotValueA);
}

// A function that will be called once got characteristics
function gotCharacteristicsB(error, characteristics) {
  if (error) console.log("error: ", error);
  console.log("characteristics: ", characteristics);
  xCharactersticA = characteristics;

  // Read the value of the first characteristic
  myBLEa.read(charactersticB[0], "string", gotValueB);
}
function gotValueB(error, value) {
  if (error) console.log("error: ", error);
  console.log("value b: ", value);
  instB_value = value;
  // After getting a value, call p5ble.read() again to get the value again
  myBLEa.read(charactersticB[0], "string", gotValueB);
}

// A function that will be called once got characteristics
function gotCharacteristicsC(error, characteristics) {
  if (error) console.log("error: ", error);
  console.log("characteristics: ", characteristics);
  xCharactersticA = characteristics;

  // Read the value of the first characteristic
  myBLEa.read(charactersticC[0], "string", gotValueC);
}
function gotValueC(error, value) {
  if (error) console.log("error: ", error);
  console.log("value c: ", value);
  instC_value = value;
  // After getting a value, call p5ble.read() again to get the value again
  myBLEa.read(charactersticC[0], "string", gotValueC);
}

function draw() {
  background(250);

  for (var i = 0; i < instAValue.toString().length; i++) {
    if (instAValue.toString()[i] == 2) {
      if (!sax_sounds[i].isPlaying()) {
        sax_sounds[i].play();
      }
    } else {
      sax_sounds[i].stop();
    }
  }
  for (var i = 0; i < instBValue.toString().length; i++) {
    if (instBValue.toString()[i] == 2) {
      if (!sax_sounds[i].isPlaying()) {
        sax_sounds[i].play();
      }
    } else {
      sax_sounds[i].stop();
    }
  }
}
