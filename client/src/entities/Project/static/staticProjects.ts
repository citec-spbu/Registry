import { IProject } from "../types/types";

export const staticProjects: IProject[] = [
  {
    id: 1,
    name: "Биология растений в эпоху глобальных изменений климата",
    description:
      "Необходимо провести анализ адаптации растений к экстремальным условиям, возникающим в результате глобальных изменений климата. Важно оценить воздействие глобальных изменений климата на биоразнообразие растительного мира. Задачей является выявление потенциальных угроз экосистемам и сельскому хозяйству, обусловленных изменениями климата.",
    dateStart: new Date("2023-09-09"),
    dateEnd: new Date("2023-12-01"),
    enrollmentStart: new Date("2023-08-20"),
    enrollmentEnd: new Date("2023-09-01"),
    supervisor: "Иванов П. М.",
    curator: "Калашникова П. М.",
    client: 'ООО "Рога и Копыто"',
    tags: [8],
    teams: [4],
    teamLimit: 2,
    requestCount: 1,
    developerRequirements: [
      "Опыт работы с лабораторным оборудованием и инструментами, связанными с биологией растений",
      "Глубокое понимание биологии растений и их реакции на изменения климата",
      "Способность оценивать влияние глобальных изменений климата на экосистемы и биоразнообразие",
    ],
  },
  {
    id: 2,
    name: "Изучение социально-экономических проблем современного испанского общества",
    description:
      "Проект направлен на исследование ключевых аспектов, влияющих на современную испанскую социально-экономическую динамику. Требуется провести анализ ряда факторов, включая безработицу, социальное неравенство, систему образования и здравоохранения, а также влияние глобальных экономических трендов на испанскую экономику.",
    dateStart: new Date("2023-09-07"),
    dateEnd: new Date("2023-10-12"),
    enrollmentStart: new Date("2023-09-01"),
    enrollmentEnd: new Date("2023-09-07"),
    supervisor: "Новиков В. С.",
    curator: "Лебедев А. М.",
    client: 'ООО "Альфа и Омега"',
    tags: [1, 5, 6],
    requestCount: 0,
    teams: [4, 6],
    teamLimit: 2,
    developerRequirements: [
      "Опыт применения методов социологических и экономических исследований",
      "Способность представлять сложные социально-экономические концепции понятным образом",
    ],
  },
  {
    id: 3,
    name: "ГМО: история, достижения, социальные и экологические риски",
    description:
      "Проект посвящен всестороннему изучению генетически модифицированных организмов (ГМО). Следует провести анализ исторического развития технологии ГМО, исследование достижений в области генной инженерии и оценку социальные и экологических рисков, связанных с применением ГМО в сельском хозяйстве и продовольственной промышленности. Цель проекта - обеспечить обширное понимание проблематики ГМО с учетом научных, социальных и экологических аспектов и предоставить информацию для принятия обоснованных решений и разработки регулирующей политики.",
    dateStart: new Date("2023-02-01"),
    dateEnd: new Date("2023-06-01"),
    enrollmentStart: new Date("2023-01-20"),
    enrollmentEnd: new Date("2023-02-01"),
    supervisor: "Кириллов И. С.",
    curator: "Кузнецов Д. К.",
    client: 'ЗАО "Солнечные Лучи"',
    tags: [4, 8],
    requestCount: 1,
    teams: [5],
    teamLimit: 1,
    developerRequirements: [
      "Стремление к постоянному обучению и повышению квалификации в области ГМО и биотехнологии",
      "Способность представлять сложные научные концепции в доступной форме для различных аудиторий",
      "Опыт работы или исследовательский опыт в области генетически модифицированных организмов (ГМО).",
    ],
  },
  {
    id: 4,
    name: "Современные проблемы эпидемиологии, микробиологии и гигиены",
    description:
      "Проект представляет собой исследование актуальных вопросов в области общественного здоровья и медицины. Задача - анализ современных эпидемиологических тенденций, изучение микробиологических аспектов патогенов и распространения болезней, а также исследование вопросов гигиенических практик и их влияния на общественное здоровье. Цель проекта - обеспечить научное понимание современных вызовов и рисков, связанных с биологическими агентами и общественными здоровьем, и способствовать разработке стратегий для их управления и предотвращения.",
    dateStart: new Date("2023-09-09"),
    dateEnd: new Date("2023-12-10"),
    enrollmentStart: new Date("2023-09-01"),
    enrollmentEnd: new Date("2023-09-07"),
    supervisor: "Беляев Ф. П.",
    curator: "Меркулова М. Р.",
    client: "ИП Макаров Н.Г.",
    requestCount: 3,
    tags: [1, 5],
    teams: [],
    teamLimit: 1,
    developerRequirements: [
      "Глубокое понимание современных проблем и вызовов в области эпидемиологии, микробиологии и гигиены",
      "Умение интерпретировать результаты и формулировать рекомендации на основе полученных данных",
      "Опыт работы с техническим оборудованием и программным обеспечением, связанным с микробиологией и эпидемиологией",
    ],
  },
];
