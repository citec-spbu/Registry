import { ITeam, ITeamExtended } from "../types/types";

export const staticTeams: ITeam[] = [
  {
    id: 4,
    name: "4. Авдеева С.Д., Горшков И.Г., Гришкина С.К., Евдокимова В.А., Ермилов И.М.",
    members: [1, 2, 3, 4, 5],
  },
  {
    id: 5,
    name: "5. Зотов М.В., Иванов А.Р., Иванов Н.Л., Казаков И.Л., Калугин М.Т.",
    members: [6, 7, 8, 9, 10],
  },
  {
    id: 6,
    name: "6. Князева А.Л., Колесников Г.А., Кузнецова А.А., Ларионов Н.А., Матвеев М.И.",
    members: [11, 12, 13, 14, 15],
  },
  {
    id: 7,
    name: "7. Павлова А.Е., Полушин Г.Я., Сатурнова Т.Т., Чернов А.А., Морозов А.М.",
    members: [16, 17, 18, 19, 20],
  },
];

export const staticTeamsExtended: ITeamExtended[] = [
  {
    id: 4,
    name: "4. Авдеева С.Д., Горшков И.Г., Гришкина С.К., Евдокимова В.А., Ермилов И.М.",
    members: [1, 2, 3, 4, 5],
    project: "1",
  },
  {
    id: 5,
    name: "5. Зотов М.В., Иванов А.Р., Иванов Н.Л., Казаков И.Л., Калугин М.Т.",
    members: [1, 2, 3, 21],
    requests: [29, 30],
  },
  {
    id: 6,
    name: "6. Князева А.Л., Колесников Г.А., Кузнецова А.А., Ларионов Н.А., Матвеев М.И.",
    members: [1, 2, 3, 4],
    project: "3",
    requests: [29],
  },
];
