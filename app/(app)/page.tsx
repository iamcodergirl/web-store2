import Hero from "./section/Hero";
import Products from "./section/Products";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
    </>
  );
}
