import React, { useState } from "react";
import { Footer } from "../component/layout";
import { Section1, Section3 } from "./Section";
import { LoaderMain } from "../component/commonComponent";

const Home = ({ navbar }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <LoaderMain />
      ) : (
        <div className="flex flex-col min-h-screen">
          
          {/* Main Content */}
          <Section1 loading={loading} setLoading={setLoading} navbar={navbar} />
          <Section3
            games={true}
            isDashboard={false}
            loading={loading}
            setLoading={setLoading}
          />
          {/* Second Main Content */}

          {/* Footer */}
          <Footer loading={loading} setLoading={setLoading} />
        </div>
      )}
    </>
  );
};
export default Home;
