import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const toggleConnectApp = useSelector((state) => state.toggleConnectApp);  

  // Function to toggle connect App Option
  const connectAppFunc = () => {
    dispatch({ type: "toggleConnectApp" });
  };
  // Function to open Connect App Modal
  const connectAppModal = () => {
    dispatch({ type: "toggleConnecAppModal" });
  };
  return (
    <Fragment>
      <header
        className="h-16 border-b border-white/30 flex items-center justify-between px-6 shrink-0"
        data-purpose="main-header"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center p-0.5 shadow-[0_4px_12px_rgba(79,70,229,0.3)]">
              <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_white]"></div>
              </div>
            </div>
            <h1 className="font-bold text-xl tracking-tight text-slate-800">
              Noble
            </h1>
          </div>
          <div className="h-5 w-px bg-slate-300/40 mx-2"></div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Autonomous Work Agent
          </span>
        </div>
        <div className="flex items-center gap-7">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
              ></path>
            </svg>
          </button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-400 rounded-full border-2 border-white"></div>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => connectAppFunc()}
            class="text-slate-400 hover:text-slate-600 transition-colors relative"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6h16M4 12h16m-7 6h7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
              ></path>
            </svg>
            {toggleConnectApp && <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl py-2 px-4 shadow-2xl z-[100] border border-white/50 backdrop-blur-xl bg-white/30 text-left">
              <span onClick={()=>connectAppModal()} className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer">
                Connect App
              </span>
            </div>}
          </button>
        </div>
      </header>
    </Fragment>
  );
};

export default Navbar;
