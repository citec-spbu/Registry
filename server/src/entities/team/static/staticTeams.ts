import { TeamListStrapi } from "@/db/strapi/types/team";
import { Team } from "..";

export const staticTeams: Team[] = [
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

export const staticTeamsExtended: Team[] = [
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

export const staticTeamListStrapiPopulatedWithAdministrators: TeamListStrapi = {
  data: [
    {
      id: 5,
      attributes: {
        //createdAt: "2023-10-09T18:58:07.069Z",
        //updatedAt: "2023-10-13T18:15:14.735Z",
        //publishedAt: "2023-10-09T18:58:08.346Z",
        name: "5. Зотов М.В., Иванов А.Р., Иванов Н.Л., Казаков И.Л., Калугин М.Т.",
        members: {
          data: [
            {
              id: 6,
              attributes: {
                name: "6. Зотов М.В. - Backend-разработчик",
                role: "Backend-разработчик",
                user: {
                  data: {
                    id: 9,
                    attributes: {
                      name: "Зотов Максим Владимирович",
                      email: "st211305@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 7,
              attributes: {
                name: "7. Иванов А.Р. - Администратор базы данных",
                role: "Администратор базы данных",
                user: {
                  data: {
                    id: 11,
                    attributes: {
                      name: "Иванов Артём Романович",
                      email: "st682823@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 8,
              attributes: {
                name: "8. Иванов Н.Л. - Аналитик",
                role: "Аналитик",
                user: {
                  data: {
                    id: 10,
                    attributes: {
                      name: "Иванов Николай Львович",
                      email: "st691669@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 9,
              attributes: {
                name: "9. Казаков И.Л. - Сетевой инженер",
                role: "Сетевой инженер",
                user: {
                  data: {
                    id: 12,
                    attributes: {
                      name: "Казаков Илья Львович",
                      email: "st522315@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 10,
              attributes: {
                name: "10. Калугин М.Т. - Архитектор программного обеспечения",
                role: "Архитектор программного обеспечения",
                user: {
                  data: {
                    id: 13,
                    attributes: {
                      name: "Калугин Михаил Тимофеевич",
                      email: "st419144@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
          ],
        },
        administrators: {
          data: [
            {
              id: 9,
              attributes: {
                name: "Зотов Максим Владимирович",
                email: "st211305@student.spbu.ru",
                phone: "+7 (999) 999-99-99",
                services: [],
              },
            },
          ],
        },
      },
    },
    {
      id: 6,
      attributes: {
        //createdAt: "2023-10-09T18:58:53.775Z",
        //updatedAt: "2023-10-13T18:15:20.996Z",
        //publishedAt: "2023-10-09T18:58:54.328Z",
        name: "6. Князева А.Л., Колесников Г.А., Кузнецова А.А., Ларионов Н.А., Матвеев М.И.",
        members: {
          data: [
            {
              id: 11,
              attributes: {
                name: "11. Князева А.Л. - DevOps-инженер",
                role: "DevOps-инженер",
                user: {
                  data: {
                    id: 14,
                    attributes: {
                      name: "Князева Анастасия Лукинична",
                      email: "st969771@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 12,
              attributes: {
                name: "12. Колесников Г.А. - UX/UI дизайнер",
                role: "UX/UI дизайнер",
                user: {
                  data: {
                    id: 15,
                    attributes: {
                      name: "Колесников Георгий Адамович",
                      email: "st853755@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 13,
              attributes: {
                name: "13. Кузнецова А.А. - Системный аналитик",
                role: "Системный аналитик",
                user: {
                  data: {
                    id: 16,
                    attributes: {
                      name: "Кузнецова Анастасия Артёмовна",
                      email: "st981538@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 14,
              attributes: {
                name: "14. Ларионов Н.А. - Инженер по автоматизации тестирования",
                role: "Инженер по автоматизации тестирования",
                user: {
                  data: {
                    id: 18,
                    attributes: {
                      name: "Ларионов Никита Андреевич",
                      email: "st717329@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 15,
              attributes: {
                name: "15. Матвеев М.И. - Архитектор облачных решений",
                role: "Архитектор облачных решений",
                user: {
                  data: {
                    id: 19,
                    attributes: {
                      name: "Матвеев Максим Игоревич",
                      email: "st627957@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
          ],
        },
        administrators: {
          data: [
            {
              id: 14,
              attributes: {
                name: "Князева Анастасия Лукинична",
                email: "st969771@student.spbu.ru",
                phone: "+7 (999) 999-99-99",
                services: [],
              },
            },
          ],
        },
      },
    },
    {
      id: 7,
      attributes: {
        //createdAt: "2023-10-09T18:59:13.786Z",
        //updatedAt: "2023-10-13T18:15:27.382Z",
        //publishedAt: "2023-10-09T18:59:59.716Z",
        name: "7. Павлова А.Е., Полушин Г.Я., Сатурнова Т.Т., Чернов А.А., Морозов А.М.",
        members: {
          data: [
            {
              id: 16,
              attributes: {
                name: "16. Павлова А.Е. - Технический писатель",
                role: "Технический писатель",
                user: {
                  data: {
                    id: 21,
                    attributes: {
                      name: "Павлова Алиса Егоровна",
                      email: "st268225@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 17,
              attributes: {
                name: "17. Полушин Г.Я. - Scrum Master",
                role: "Scrum Master",
                user: {
                  data: {
                    id: 4,
                    attributes: {
                      name: "Полушин Геннадий Ярославович",
                      email: "st958797@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 18,
              attributes: {
                name: "18. Сатурнова Т.Т. - Fullstack-разработчик",
                role: "Fullstack-разработчик",
                user: {
                  data: {
                    id: 2,
                    attributes: {
                      name: "Сатурнова Татьяна Тимофеевна ",
                      email: "st072603@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 19,
              attributes: {
                name: "19. Чернов А.А. - Ассенизатор",
                role: "Ассенизатор",
                user: {
                  data: {
                    id: 17,
                    attributes: {
                      name: "Чернов Артём Альбертович",
                      email: "st075995@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 20,
              attributes: {
                name: "20. Морозов А.М. - Специалист по информационной безопасности",
                role: "Специалист по информационной безопасности",
                user: {
                  data: {
                    id: 20,
                    attributes: {
                      name: "Морозов Александр Максимович",
                      email: "st855527@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
          ],
        },
        administrators: {
          data: [
            {
              id: 21,
              attributes: {
                name: "Павлова Алиса Егоровна",
                email: "st268225@student.spbu.ru",
                phone: "+7 (999) 999-99-99",
                services: [],
              },
            },
          ],
        },
      },
    },
    {
      id: 4,
      attributes: {
        //createdAt: "2023-10-09T18:56:55.343Z",
        //updatedAt: "2023-10-13T19:20:29.932Z",
        //publishedAt: "2023-10-09T18:56:56.294Z",
        name: "4. Авдеева С.Д., Горшков И.Г., Гришкина С.К., Евдокимова В.А., Ермилов И.М.",
        members: {
          data: [
            {
              id: 1,
              attributes: {
                name: "1. Авдеева С.Д. - Teamlead",
                role: "Teamlead",
                user: {
                  data: {
                    id: 3,
                    attributes: {
                      name: "Авдеева София Данииловна",
                      email: "st489186@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 2,
              attributes: {
                name: "2. Горшков И.Г. - Системный администратор",
                role: "Системный администратор",
                user: {
                  data: {
                    id: 5,
                    attributes: {
                      name: "Горшков Иван Григорьевич",
                      email: "st461158@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 3,
              attributes: {
                name: "3. Гришкина С.К. - Инженер технической поддержки",
                role: "Инженер технической поддержки",
                user: {
                  data: {
                    id: 6,
                    attributes: {
                      name: "Гришина София Кирилловна",
                      email: "st965928@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 4,
              attributes: {
                name: "4. Евдокимова В.А. - Тестировщик (QA Engineer)",
                role: "Тестировщик (QA Engineer)",
                user: {
                  data: {
                    id: 7,
                    attributes: {
                      name: "Евдокимова Владислава Андреевна",
                      email: "st631633@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
            {
              id: 5,
              attributes: {
                name: "5. Ермилов И.М. - Frontend-разработчик",
                role: "Frontend-разработчик",
                user: {
                  data: {
                    id: 8,
                    attributes: {
                      name: "Ермилов Иван Макарович",
                      email: "st393827@student.spbu.ru",
                      phone: "+7 (999) 999-99-99",
                      services: [],
                    },
                  },
                },
                team: {
                  data: {
                    id: 1,
                  },
                },
              },
            },
          ],
        },
        administrators: {
          data: [
            {
              id: 3,
              attributes: {
                name: "Авдеева София Данииловна",
                email: "st489186@student.spbu.ru",
                phone: "+7 (999) 999-99-99",
                services: [],
              },
            },
          ],
        },
      },
    },
  ],
  //meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 4 } },
};
