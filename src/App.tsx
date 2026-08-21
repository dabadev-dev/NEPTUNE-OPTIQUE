import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layout/homeLayout";
import Hero from "./components/Hero";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Hero />} />
          {/* <Route index element={<VideoSection />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
