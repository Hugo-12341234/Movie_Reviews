import { Hero } from "../hero/Hero";

export const Home = ({ movies }: any) => {
  return (
    <div>
      <Hero movies={movies} />
    </div>
  );
};
