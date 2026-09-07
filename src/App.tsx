import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layout/homeLayout";

import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";
import SaviezVous from "./components/SaviezVous";
import LunettesSolaires from "./pages/LunettesSolaires";
import LunettesOptiques from "./pages/LunettesOptiques";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route
            index
            element={
              <>
                <Hero />
                <VideoSection />
                <SaviezVous />
              </>
            }
          />
          <Route path="/solaires" element={<LunettesSolaires />} />
                  <Route path="/optiques" element={<LunettesOptiques />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
