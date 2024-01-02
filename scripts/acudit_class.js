"use strict";
class Acudit {
    constructor(joke, score, date) {
        this._joke = joke;
        this._score = score;
        this._date = date;
    }
    // Métodos de consulta (getters)
    getJoke() {
        return this._joke;
    }
    getScore() {
        return this._score;
    }
    getDate() {
        return this._date;
    }
    // Métodos de modificación (setters)
    setJoke(joke) {
        this._joke = joke;
    }
    setScore(score) {
        this._score = score;
    }
    setDate(date) {
        this._date = date;
    }
    toString() {
        let mostrar = "";
        mostrar = `Acudit: ${this._joke}<br>`;
        mostrar += `Punts: ${this._score}<br>`;
        mostrar += `Data: ${this._date}<br>`;
        return mostrar;
    }
    toJS() {
        let mostrar = "";
        mostrar = `Acudit: ${this._joke}\n`;
        mostrar += `Punts: ${this._score}\n`;
        mostrar += `Data: ${this._date}\n`;
        return mostrar;
    }
}
