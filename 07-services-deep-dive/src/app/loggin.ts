import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Loggin {
  log(messsage: string) {
    const timeStamp = new Date().toLocaleTimeString();
    console.log(`[${timeStamp}]: ${messsage}`);
  }
}
