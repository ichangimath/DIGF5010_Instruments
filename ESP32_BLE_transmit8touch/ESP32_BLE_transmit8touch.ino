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

String datainString;
int datainInt;

void setup() {
  Serial.begin(115200);
  BLEDevice::init("ESP32");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ
                                       );
  pCharacteristic->setValue(datainInt);
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
    if (touchRead(capPin0) < threshold)
      touchVal0 = "2";
    else
      touchVal0 = "1";
    if (touchRead(capPin3) < threshold)
      touchVal3 = "2";
    else
      touchVal3 = "1";
    if (touchRead(capPin4) < threshold)
      touchVal4 = "2";
    else
      touchVal4 = "1";
    if (touchRead(capPin5) < threshold)
      touchVal5 = "2";
    else
      touchVal5 = "1";
    if (touchRead(capPin6) < threshold)
      touchVal6 = "2";
    else
      touchVal6 = "1";
    if (touchRead(capPin7) < threshold)
      touchVal7 = "2";
    else
      touchVal7 = "1";
    if (touchRead(capPin8) < threshold)
      touchVal8 = "2";
    else
      touchVal8 = "1";
    if (touchRead(capPin9) < threshold)
      touchVal9 = "2";
    else
      touchVal9 = "1";
    datainString = touchVal0 + touchVal3 + touchVal4 + touchVal5 + touchVal6 + touchVal7 + touchVal8 + touchVal9;
    datainInt = datainString.toInt();
    pCharacteristic->setValue(datainInt);
    delay(200);
  }
}
void loop() {
}
