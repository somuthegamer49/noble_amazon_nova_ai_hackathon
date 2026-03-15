import { Fragment } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Leftsidebar from "./components/Leftsidebar";
import Centerarea from "./components/Centerarea";
import Rightsidebar from "./components/Rightsidebar";
import Connectmodal from "./modals/Connectmodal";
import { useSelector } from "react-redux";

function App() {
  const toggleConnecAppModal = useSelector(
    (state) => state.toggleConnecAppModal,
  );
  return (
    <Fragment>
      <div class="nebula"></div>
      <div class="stardust"></div>
      <div class="relative z-10 w-full max-w-[1440px] bg-white/20 backdrop-blur-[32px] rounded-[3rem] shadow-[0_32px_80px_rgba(0,0,0,0.08)] flex flex-col border border-white/40 min-h-full">
        <Navbar />
        <main class="flex-1 flex overflow-hidden p-4 lg:p-6 gap-6">
          <Leftsidebar />
          <Centerarea />
          <Rightsidebar />
        </main>
      </div>
      {toggleConnecAppModal && <Connectmodal />}
    </Fragment>
  );
}

export default App;
