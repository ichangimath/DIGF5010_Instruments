#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

#define SERVICE_UUID        "2ea20e27-d06d-4039-a242-d28685015a7f"
#define CHARACTERISTIC_UUID "2ea20e27-d06d-4039-a242-d28685015a7f"

const int capPin0 = T0;
const int capPin3 = T3;
const int capPin4 = T4;
const int capPin5 = T5;
const int capPin6 = T6;
const int capPin7 = T7;
const int capPin8 = T8;
const int capPin9 = T9;
const int threshold = 20;

String touchVal0, touchVal3, touchVal4, touchVal5;
String touchVal6, touchVal7, touchVal8, touchVal9;

const char* datainChar = "111";


void setup() {
  Serial.begin(115200);
  BLEDevice::init("ESP32");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ
                                       );
  pCharacteristic->setValue(datainChar);
  pService->start();
  // BLEAdvertising *pAdvertising = pServer->getAdvertising();  // this still is working for backward compatibility
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  while (1)
  {
    if (touchRead(capPin3) < threshold)
      touchVal3 = "2";
    else
      touchVal3 = "1";


    if (touchRead(capPin6) < threshold)
      touchVal6 = "2";
    else
      touchVal6 = "1";

    if (touchRead(capPin9) < threshold)
      touchVal9 = "2";
    else
      touchVal9 = "1";
    String temp = touchVal3 + touchVal9 + touchVal6;
    datainChar = temp.c_str();
    pCharacteristic->setValue(datainChar);
    delay(200);
  }
}
void loop() {
}
