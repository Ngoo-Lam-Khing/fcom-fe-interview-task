export interface Match {
  id: number;
  teamHome: string;
  teamAway: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
}

export enum ResultType {
  HOME = 'home',
  DRAW = 'draw',
  AWAY = 'away'
}