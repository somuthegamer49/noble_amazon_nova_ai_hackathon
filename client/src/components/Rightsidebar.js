import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Rightsidebar = () => {
  const aidata_steps = useSelector((state) => state.aidata_steps);
  const [items, setItems] = useState([]);

  // Rendering AI response with 2 second delay
  useEffect(() => {
    let index = 0;
    setItems([]);
    if (aidata_steps !== null) {
      const interval = setInterval(() => {
        if (index < aidata_steps.length) {
          setItems((prev)=>[...prev,aidata_steps[index-1]]);
          ++index;
        } else {
          clearInterval(interval);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [aidata_steps]);
  return (
    <Fragment>
      <aside className="w-72" data-purpose="right-sidebar">
        <div className="glass-card rounded-2xl h-[33rem] flex flex-col overflow-y-auto">
          <div className="w-full flex items-center justify-between p-5 bg-white/40 border-b border-white/30">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-400 to-red-400 shadow-sm"></div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Agent Execution
              </span>
            </div>
          </div>
          {/* Timeline Content */}
          <div className="flex-1 p-6 relative overflow-y-auto">
            {/* Timeline Line */}
            <div className="absolute left-[47px] top-12 bottom-12 w-0.5 bg-slate-200/50"></div>
            <div className="space-y-6 relative">
              {/*Items*/}
              {items !== null &&
                items.length > 0 &&
                items.map((item) => {
                  return (
                    <div className="flex items-start gap-5 group">
                      <div className="flex-shrink-0 z-10 w-7 h-7 rounded-full bg-emerald-400 flex items-center justify-center text-white ring-8 ring-white/50 shadow-sm led-glow-emerald">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3.5"
                          ></path>
                        </svg>
                      </div>
                      <div className="pt-1">
                        <p className="text-[13px] font-bold">
                          {item!==undefined?item.step:null}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export default Rightsidebar;
