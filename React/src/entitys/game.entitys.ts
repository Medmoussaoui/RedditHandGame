export type GameCardOptions = "rock" | "paper" | "scissors";

export type OptionState = "win" | "loss" | "draw" | "none";

export interface SelectedOption {
  option: GameCardOptions;
  // [quantity] -> how many peoples pick this option
  quantity: number;
}
