import React, { useState } from "react";
import { Footer } from "../component/layout";
import { Section1, Section3 } from "./Section";

const Home = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <Section1 loading={loading} setLoading={setLoading}/>
      <Section3 games={true} isDashboard={false}  loading={loading} setLoading={setLoading}/>
      {/* Second Main Content */}

      {/* Footer */}
      <Footer loading={loading} setLoading={setLoading}/>
    </div>
  );
};
export default Home;
