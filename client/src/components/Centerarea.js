import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Centerarea = () => {
  const dispatch = useDispatch();
  const docFileName = useSelector((state) => state.docFileName);
  const imageFileName = useSelector((state) => state.imageFileName);
  const videoFileName = useSelector((state) => state.videoFileName);
  const docFileName2 = useSelector((state) => state.docFileName2);
  const imageFileName2 = useSelector((state) => state.imageFileName2);
  const videoFileName2 = useSelector((state) => state.videoFileName2);
  const [filenames, setfilenames] = useState([]);
  const [fileerr, setfileerr] = useState(false);
  const videoFile = useSelector((state) => state.videoFile);
  const imageFile = useSelector((state) => state.imageFile);
  const docFile = useSelector((state) => state.docFile);
  const docExt = useSelector((state) => state.docExt);
  const imageExt = useSelector((state) => state.imageExt);
  const videoExt = useSelector((state) => state.videoExt);
  const googleDriveToken = useSelector((state) => state.googleDriveToken);
  const googleCalendarToken = useSelector((state) => state.googleCalendarToken);

  const [textPrompt, settextPrompt] = useState(null);

  const [uierr, setuierr] = useState("");

  const aidata_insights = useSelector((state) => state.aidata_insights);
  const [items, setItems] = useState([]);
  const [working, setworking] = useState("");
  // Function to get Prompt from User
  const getPrompt = (e) => {
    const textprompt = e.target.value;
    settextPrompt(textprompt);
  };
  // Sending to Amazon AI
  const sendToNova2Lite = () => {
    if (textPrompt !== null && !fileerr) {
      const payload = {
        google_drive_access_token: googleDriveToken,
        google_calendar_access_token: googleCalendarToken,
        text_prompt: textPrompt,
        image_files: imageFile,
        document_files: docFile,
        video_files: videoFile,
        file_ext: [...docExt, ...imageExt, ...videoExt],
        file_names: [...docFileName2, ...imageFileName2, ...videoFileName2],
      };
      const postToBackend = async () => {
        setworking("Working...");
        await axios
          .post("https://noble-app.vercel.app/agent", payload, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            dispatch({ type: "aidata_insights", payload: res.data.insights });
            dispatch({ type: "aidata_steps", payload: res.data.steps });
            dispatch({ type: "docFile", payload: [] });
            dispatch({ type: "imageFile", payload: [] });
            dispatch({ type: "videoFile", payload: [] });
            dispatch({ type: "docFileName", payload: [] });
            dispatch({ type: "imageFileName", payload: [] });
            dispatch({ type: "videoFileName", payload: [] });
            dispatch({ type: "docFileName2", payload: [] });
            dispatch({ type: "imageFileName2", payload: [] });
            dispatch({ type: "videoFileName2", payload: [] });
            dispatch({ type: "videoExt", payload: [] });
            dispatch({ type: "imageExt", payload: [] });
            dispatch({ type: "docExt", payload: [] });
            setfilenames([]);
          })
          .catch((err) => {
            setuierr(err.message);
            setTimeout(() => {
              setuierr("");
            }, [2000]);
          });
        setworking("");
      };
      postToBackend();
    } else if (fileerr) {
      setuierr("Max file limit reached");
      setTimeout(() => {
        setuierr("");
      }, [1500]);
    } else {
      setuierr("Text prompt required");
      setTimeout(() => {
        setuierr("");
      }, [1500]);
    }
  };
  // Rendering AI response with 2 second delay
  useEffect(() => {
    let index = 0;
    setItems([]);
    if (aidata_insights !== null) {
      const interval = setInterval(() => {
        if (index < aidata_insights.length) {
          setItems((prev) => [...prev, aidata_insights[index - 1]]);
          ++index;
        } else {
          clearInterval(interval);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [aidata_insights]);
  useEffect(() => {
    const file_names = [...docFileName, ...imageFileName, ...videoFileName];
    if (file_names.length > 5) {
      alert("Max 5 files allowed");
      setfileerr(true);
    } else {
      setfilenames(file_names);
      setfileerr(false);
    }
  }, [docFileName, imageFileName, videoFileName]);
  return (
    <Fragment>
      <section
        className="flex-1 flex flex-col gap-4 relative"
        data-purpose="workspace-center"
      >
        {/* Analysis Card */}
        <div className="max-w-xl mx-auto w-full text-xs font-bold text-slate-400 uppercase tracking-wide">
          Noble detected: {working}
        </div>
        <div
          className="max-w-xl mx-auto w-full glass-card rounded-2xl p-4 shadow-sm border border-white/50 shrink-0 overflow-y-auto h-[15rem]"
          data-purpose="analysis-card"
        >
          <div className="space-y-2">
            <ul className="space-y-2">
              {items !== null &&
                items.length > 0 &&
                items.map((item) => {
                  return (
                    <li className="flex items-center gap-4 text-sm text-slate-700 font-semibold group">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 led-glow-emerald flex-shrink-0"></span>
                      {item !== undefined ? item : null}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        {/* Input Bar (Fixed to bottom of central area) */}

        <div
          className="mt-auto pb-2 shrink-0"
          data-purpose="chat-input-container"
        >
          <div className="max-w-3xl mx-auto w-full mb-0">
            {uierr !== "" && <div style={{ color: "red" }}>{uierr}</div>}
            {filenames.length > 0 && (
              <div style={{ color: "green" }}>
                {filenames.map((filename) => {
                  return `${filename}| `;
                })}
              </div>
            )}
            <div className="glass-card !bg-white/60 p-2 rounded-full flex items-center gap-4 shadow-2xl border-white/60 group focus-within:ring-2 ring-blue-500/20 transition-all">
              <input
                onChange={(e) => getPrompt(e)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-semibold text-slate-800 placeholder-slate-400"
                placeholder="Ask Noble to do something..."
                type="text"
              />
              <button
                onClick={() => sendToNova2Lite()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold text-[13px] shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                Execute Plan
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Centerarea;
