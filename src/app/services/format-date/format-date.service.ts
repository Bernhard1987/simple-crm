import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDateService {

  constructor() { }

  formatDateDDMMYYYYHHMM(timestamp: number) {
    let date = new Date(timestamp);

    let year = date.getFullYear();
    let month = `0${date.getMonth() + 1}`.slice(-2);
    let day = `0${date.getDate()}`.slice(-2);
    let hour = `0${date.getHours()}`.slice(-2);
    let minute = `0${date.getMinutes()}`.slice(-2);
    // let second = date.getSeconds();

    let formattedDate = `${day}.${month}.${year} ${hour}:${minute}`;

    return formattedDate;
  }
}
