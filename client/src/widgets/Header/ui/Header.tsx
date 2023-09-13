import { UserNav } from "@/features/UserNav";
import Image from "next/image";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Image
          src="https://spbu.ru/themes/spbgu/markup/dist/img/logo-big.svg"
          alt=""
          height="72"
          width="250"
          priority
        />
      </div>
      <div className="flex text-white">
        <ul className="mr-10 flex items-center">
          <li className="mr-4">Список проектов</li>
          <li>Заказчикам</li>
        </ul>
        <UserNav />
      </div>
    </div>
  );
};

export default Header;
