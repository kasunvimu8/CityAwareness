#include <aes.h>
#include <aes128_dec.h>
#include <aes128_enc.h>
#include <aes192_dec.h>
#include <aes192_enc.h>
#include <aes256_dec.h>
#include <aes256_enc.h>
#include <AESLib.h>
#include <aes_dec.h>
#include <aes_enc.h>
#include <aes_invsbox.h>
#include <aes_keyschedule.h>
#include <aes_sbox.h>
#include <aes_types.h>
#include <bcal-basic.h>
#include <bcal-cbc.h>
#include <bcal-cmac.h>
#include <bcal-ofb.h>
#include <bcal_aes128.h>
#include <bcal_aes192.h>
#include <bcal_aes256.h>
#include <blockcipher_descriptor.h>
#include <gf256mul.h>
#include <keysize_descriptor.h>
#include <memxor.h>
#include <AESLib.h>
  
#include <SoftwareSerial.h>
   
//SIM808 TX is connected to Arduino D8
#define SIM808_TX_PIN 7
 
//SIM808 RX is connected to Arduino D7
#define SIM808_RX_PIN 6
 
//Create software serial object to communicate with SIM808
SoftwareSerial serialSIM808(SIM808_TX_PIN,SIM808_RX_PIN);
 
 char id[16];
 char outstr1 [16];
 char outstr2 [16];
 char outstr3 [16];
 int numId = 1;
 uint8_t key[] = {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};
 
void gsm_disConnect_gprs(){
  serialSIM808.write("AT+CGATT=0\r\n"); // Attach to GPRS
  delay(2000);
  Serial.println("GPRS off");
}
  
void gsm_connect_gprs(){
  serialSIM808.write("AT+CGATT=1\r\n"); // Attach to GPRS
  delay(2000);
  serialSIM808.write("AT+SAPBR=1,1\r\n"); // Open a GPRS context
  delay(2000);
  Serial.println("GPRS on");
  Serial.println(" ");
}

//https://airmore.herokuapp.com/insertdetails/{"authcode":"hkf457","details":{"node_id":"000001","time":"yyyy:mm:dd:hh:mm","qualities":{"CO":"xx","CH":"xx","SO2":"00","Noi":"xx"}}}
// Function that sends temperature and humidity to my server.
void gsm_send_data(char * id,char * value1,char *value2,char*value3)
{
    Serial.println("Sending data.");    
   // serialSIM808.write("AT+HTTPINIT\r\n");  // Initialize HTTP
    delay(1000);
    serialSIM808.write("AT+HTTPPARA=\"URL\",\"https://airmore.herokuapp.com/insertdetails/{\"authcode\":\"hkf457\",\"details\":{\"node_id\":");
  //  Serial.print("AT+HTTPPARA=\"URL\",\"https://airmore.herokuapp.com/insertdetails/{\"authcode\":\"hkf457\",\"details\":{\"node_id\":");
    delay(50);
    serialSIM808.write(id);   // Add id to the url
  //  Serial.print(id);
    delay(50);
    serialSIM808.write("\",\"time\":\"yyyy:mm:dd:hh:mm\",\"qualities\":{\"CO\":\" "); 
    //Serial.print("\",\"time\":\"yyyy:mm:dd:hh:mm\",\"qualities\":{\"CO\":\" "); 
    delay(50);
    serialSIM808.write(value1);   // Add value to url
    //Serial.print(value1);
    delay(50);
    serialSIM808.write("\",\"CH\":\""); 
  //  Serial.print("\",\"CH\":\"");
    delay(50);
    serialSIM808.write(value2);   // Add value to url
    //Serial.print(value2);
    delay(50);
    serialSIM808.write("\",\"SO2\":\"00\",\"Noi\":\""); 
    //Serial.print("\",\"SO2\":\"00\",\"Noi\":\""); 
    delay(50);
    serialSIM808.write(value3);   // Add value to url
   // Serial.print(value3);
    delay(50);
    serialSIM808.write("\"\}}}\r\n");   // close url
    // Serial.print("\"\}}}\"\r\n");
    delay(2000);
    serialSIM808.write("AT+HTTPPARA=\"CID\",1\r\n");    // End the PARA
    delay(2000);
    serialSIM808.write("AT+HTTPACTION=0\r\n");
    delay(3000);    
    serialSIM808.write("AT+HTTPTERM\r\n");
    delay(3000);    
    Serial.print("data sent complete !");
}


void setup() {
  //Begin serial comunication with Arduino and Arduino IDE (Serial Monitor)
  Serial.begin(9600);
  while(!Serial);
   
  //Being serial communication witj Arduino and SIM808
  serialSIM808.begin(9600);
  delay(1000);
   
  Serial.println("Setup Complete!");

  serialSIM808.write("AT+CREG?\r\n");
  delay(150);
 gsm_connect_gprs();

}

void loop() {
  
  if(numId<5){
    //this is co sensor
      float sensorValue_0 = analogRead(A0);
      // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
      float voltage_0 = sensorValue_0 * (5.0 / 1023.0);
      float  RS_gas = (5.0-voltage_0)/voltage_0;
      float R0 =voltage_0/10;
      float ratio = RS_gas/R0; 
      float ppm_co = pow(10,( ((log10(ratio)-0.72)/(-0.34)) + 3.5)) ;
      //https://www.detectcarbonmonoxide.com/co-health-risks/
      /* If its above 35 ppm, that’s already toxic and you should leave right away!*/
      
    //this is ch sensor
      float sensorValue_1 = analogRead(A1);
      // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
      float voltage_1 = sensorValue_1 * (5.0 / 1023.0);
      float  RS = (5.0-voltage_1)/voltage_1; 
      float R0_ch = voltage_1/60.0; // 60 is found using interpolation
      float ratio_ch = RS_gas/R0_ch;  // ratio = RS/R0
      float BAC =pow( 0.05*ratio_ch,2) - 10.78*ratio_ch/10 + 1.0792 ; //BAC in mg/L
      float ppm_ch=BAC; //values should be 1.6 ppm 
              
    //this is sound sensor
    //http://tinkbox.ph/sites/mytinkbox.com/files/downloads/SOUND_SENSOR_MODULE.pdf
    //just sending voltage can get high or low
      float sensorValue_4 = analogRead(A4);
    // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
      float voltage_4 = sensorValue_4 * (5.0 / 1023.0);
     
    itoa(numId, id, 10);
    
    dtostrf(ppm_co,4, 2, outstr1);
   // aes128_enc_single(key, outstr1);
  
    dtostrf(ppm_ch,4, 2, outstr2);
  //  aes128_enc_single(key, outstr2);
     
    dtostrf(voltage_4,4, 2, outstr3);
  //  aes128_enc_single(key, outstr3);
        
    gsm_send_data(id+1,outstr1,outstr2,outstr3);
  /*  
    Serial.println(numId);
    
    Serial.print(ppm_co);
    Serial.print("  ppm ");
    Serial.print("   after encrpted  >>   ");
    Serial.print(outstr1);
    aes128_dec_single(key, outstr1);
    Serial.print("   after decrpted >> ");
    Serial.print(outstr1);
    Serial.println();

    Serial.print(ppm_ch);
    Serial.print("  ppm ");
    Serial.print("   after encrpted  >>   ");
    Serial.print(outstr2);
    aes128_dec_single(key, outstr2);
    Serial.print("     after decrpted  >>   ");
    Serial.print(outstr2);
    Serial.println();

    Serial.print(voltage_4);
    Serial.print("  v ");
    Serial.print("   after encrpted   >>   ");
    Serial.print(outstr3);
    aes128_dec_single(key, outstr3);
    Serial.print("      after decrpted   >>   ");
    Serial.print(outstr3);
    Serial.println();
    
    Serial.println(" ");*/
    delay(1000*5*60);
    
    numId++;
    if(numId==15) gsm_disConnect_gprs();
  }
  
}
