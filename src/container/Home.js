import { Footer } from "../component/layout";
import { Section1, Section3 } from "./Section";
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <Section1 />
      <Section3 games={true} />
      {/* Second Main Content */}

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Home;
