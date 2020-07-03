import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from "rxjs";
import { Router } from "@angular/router";
// import * as CryptoJS from 'crypto-js';
// import AES from 'crypto-js/aes';
// var AES = require("crypto-js/aes");

const KEY = '3z]L}R;rx(ah$#-JQv';

export interface User {
  user: string;
  password: string;
}

export interface Token {
  user: User;
  expires: number;
}

const USERS: User[] = [
  {user: 'miri', password: '123456'}
];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authentication = new BehaviorSubject(true);
  public authenticated$ = this._authentication.asObservable();

  constructor(private router: Router) {
    // setTimeout(() => {
    //   const encryot = this.encrypt({user: {user: 'miri', password: '123456'}, expires: new Date().getUTCDate()})
    //   console.warn(encryot);
    //   const decryot = this.decrypt(encryot)
    //   console.warn(decryot);
    // }, 1000);
    // setTimeout(() => this.login({user: 'miri', password: '123456'}), 3000);
    // setTimeout(() => this.logout(), 6000);
  }

  // encrypt(token: Token) : string{
  //   return CryptoJS.AES.encrypt(JSON.stringify(token), KEY).toString();
  // }
  //
  // decrypt(value: string) : any {
  //   return CryptoJS.AES.decrypt(value, KEY).toString(CryptoJS.enc.Utf8);
  // }

  // private decryptData(data) {
  //
  //   try {
  //     const bytes = AES.decrypt(data, KEY);
  //     if (bytes.toString()) {
  //       return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //     }
  //     return data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  public login(user: User) {
    const found = USERS.find(item => item.user === user.user);

    // Validate user
    if (!found) {
      throw new Error('Usuario no encontrado');
    } else if (found.password !== user.password) {
      throw new Error('La contraseña no es correcta');
    }

    // Log in
    this._authentication.next(true);
    this.router.navigate(['/']);
  }

  public logout() {
    this._authentication.next(false);
    this.router.navigate(['/login']);
  }
}
