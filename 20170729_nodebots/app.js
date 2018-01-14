'use strict';

// const dweetClient = require("node-dweetio");
// const dweetio = new dweetClient();
// const THINGS_NAME = 'n0bisuke';
const { Board, Sensor } = require('johnny-five');
const board = new Board();
const MilkCocoa = require('milkcocoa');
const milkcocoa = new MilkCocoa('woodiesuswxb.mlkcca.com');
const ds = milkcocoa.dataStore('messages');

let sound = 0;

board.on('ready', () => {
    const sensor = new Sensor(`A0`);
    sensor.on('change', (value) => sound = value);
});

setInterval(() => ds.send({sound: sound}), 500);