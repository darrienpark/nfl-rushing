import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../model/player';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    url: string = 'http://localhost:3000/players.json';

    constructor(private http: HttpClient){}

    getPlayerData() {
        return this.http.get<Player[]>(this.url);
    }

}