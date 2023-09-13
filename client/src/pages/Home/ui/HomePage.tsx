import { Container, FullScreenWithBackground } from "@/shared/ui";
import { Header } from "@/widgets/Header";
import { HeroNav } from "@/widgets/HeroNav";
import { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <FullScreenWithBackground background="/hero.jpg">
      <Container className="h-full">
        <div className="flex h-full w-full flex-col">
          <div className="pt-6" />
          <Header />
          <div className="mt-auto">
            <HeroNav />
            <div className="pt-16" />
          </div>
        </div>
      </Container>
    </FullScreenWithBackground>
  );
};

export default HomePage;
