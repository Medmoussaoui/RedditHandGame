import { GameCardOptions } from "../entitys/game.entitys";

const choices: GameCardOptions[] = ["rock", "paper", "scissors"];

export function randomGameGard(): GameCardOptions {
  return choices[Math.floor(Math.random() * choices.length)];
}
