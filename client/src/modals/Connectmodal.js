import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { useSelector } from "react-redux";

const Connectmodal = () => {
  const googleDriveToken = useSelector((state) => state.googleDriveToken);
  const googleCalendarToken = useSelector((state) => state.googleCalendarToken);
  const slackToken = useSelector((state) => state.slackToken);
  const jiraToken = useSelector((state) => state.jiraToken);
  const githubToken = useSelector((state) => state.githubToken);
  const dispatch = useDispatch();
  const [appval, setappval] = useState("slack");

  // Function to Cancel the Connect App Modal
  const cancelConnectAppModal = () => {
    dispatch({ type: "toggleConnecAppModal" });
  };
  // Function to login and give access to Google Calendar
  const connectCalendar = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch({
        type: "googleCalendarToken",
        payload: tokenResponse.access_token,
      });
    },
    onError: (error) => console.log("Calendar Connection Failed:", error),
    scope: "https://www.googleapis.com/auth/calendar", // Specific scope for Calendar
  });
  // Function to login and give access to Google Drive
  const connectDrive = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch({
        type: "googleDriveToken",
        payload: tokenResponse.access_token,
      });
    },
    onError: (error) => console.log("Drive Connection Failed:", error),
    scope: "https://www.googleapis.com/auth/drive.readonly", // Specific scope for Drive
  });
  // Function to get and set app type
  const getApp = (e) => {
    let apptext = e.target.value;
    setappval(apptext);
  };

  // Function to set App
  const setApp = () => {
    if (appval === "google-calendar" && googleCalendarToken === null) {
      connectCalendar();
    } else if (appval === "google-drive" && googleDriveToken === null) {
      connectDrive();
    }
  };
  return (
    <Fragment>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md">
        <div className="w-full max-w-md glass-card !bg-white/80 rounded-[2rem] p-8 shadow-2xl border border-white/50 animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800">
                Connect New App
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Select an application to integrate with Noble
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1"
                  for="app-select"
                >
                  Select Service
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => getApp(e)}
                    className="w-full bg-white/50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                    id="app-select"
                  >
                    <option value="slack">Slack</option>
                    <option value="jira">Jira</option>
                    <option value="google-calendar">Google Calendar</option>
                    <option value="google-drive">Google Drive</option>
                    <option value="github">Github</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewbox="0 0 24 24"
                    >
                      <path
                        d="M19 9l-7 7-7-7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => cancelConnectAppModal()}
                className="flex-1 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={
                  googleCalendarToken !== null && appval === "google-calendar"
                    ? true
                    : googleDriveToken !== null && appval === "google-drive"
                      ? true
                      : jiraToken !== null && appval === "jira"
                        ? true
                        : slackToken !== null && appval === "slack"
                          ? true
                          : githubToken !== null && appval === "github"
                            ? true
                            : false
                }
                onClick={() => setApp()}
                className="flex-1 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Connectmodal;
