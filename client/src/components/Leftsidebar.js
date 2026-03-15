import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { all } from "axios";

const Leftsidebar = () => {
  const googleDriveToken = useSelector((state) => state.googleDriveToken);
  const googleCalendarToken = useSelector((state) => state.googleCalendarToken);
  // const slackToken = useSelector((state) => state.slackToken);
  // const jiraToken = useSelector((state) => state.jiraToken);
  const fileInputRef = useRef(null);
  const imgInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [toggleDisconnectGoogleDrive, settoggleDisconnectGoogleDrive] =
    useState(false);
  const [toggleDisconnectGoogleCalendar, settoggleDisconnectGoogleCalendar] =
    useState(false);
  const dispatch = useDispatch();

  // Toggle Disconnect Option of Drive
  const toggleConnectDrive = () => {
    settoggleDisconnectGoogleDrive(!toggleDisconnectGoogleDrive);
  };
  // Toggle Disconnect Option of Calendar
  const toggleConnectCalendar = () => {
    settoggleDisconnectGoogleCalendar(!toggleDisconnectGoogleCalendar);
  };
  // Function to revoke Google Token
  const revokeAccess = (accessToken) => {
    if (!accessToken) return;
    axios
      .post(`https://oauth2.googleapis.com${accessToken}`, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => console.log("Access revoked"))
      .catch((err) => console.error("Revocation failed", err));
  };
  // Function to remove Google Calendar
  const disconnectCalendar = () => {
    revokeAccess(googleCalendarToken);
    dispatch({ type: "googleCalendarToken", payload: null });
    alert("Google Calendar Removed");
  };
  // Function to remove Google Drive
  const disconnectGoogleDrive = () => {
    revokeAccess(googleDriveToken);
    dispatch({ type: "googleDriveToken", payload: null });
    alert("Google Drive Removed");
  };
  // Function to get Document from user
  const getDoc = () => {
    fileInputRef.current.click();
  };
  // Function to get Image from user
  const getImg = () => {
    imgInputRef.current.click();
  };
  // Function to get Image from user
  const getAud = () => {
    videoInputRef.current.click();
  };
  // Extract filen name and remove extension
  const getFilenameWithoutExtension = (filename) => {
    let parts = filename.split(".");
    if (parts.length > 1) {
      parts.pop();
    }
    return parts.join(".");
  };
  // Check the name of files
  const checkNameValidity = (str) => {
    let check_str = [];
    str.forEach((st) => {
      check_str.push(getFilenameWithoutExtension(st));
    });
    check_str = check_str.join(" ");
    let spaceCount = 0;
    for (let i = 0; i < check_str.length; i++) {
      const char = str[i];
      if (char === " ") {
        spaceCount++;
        if (spaceCount > 1) {
          return true;
        }
      } else {
        spaceCount = 0;
      }
    }
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (!regex.test(check_str)) {
      return true;
    }
    return false;
  };
  // Check File extentions validity
  const checkExtentions = (ext) => {
    const allowed_exts = new Set([
      "png",
      "webp",
      "pdf",
      "docx",
      "csv",
      "xls",
      "xlsx",
      "html",
      "jpeg",
      "txt",
      "doc",
      "mp4",
      "mov",
      "mpeg",
    ]);

    const exists = ext.some((item) => allowed_exts.has(item));
    return !exists;
  };
  // Function to get the selected files
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const names = Array.from(files).map((file) => file.name);
      const names2 = Array.from(files).map((file) =>
        getFilenameWithoutExtension(file.name),
      );
      const extensions = Array.from(files).map((file) =>
        file.name.split(".").pop(),
      );
      const promises = Array.from(files).map((file) => fileToBase64(file));
      if (checkNameValidity(names)) {
        alert(
          "File name can only have alphanumeric and one consecutive whitespace characters",
        );
      } else if (checkExtentions(extensions)) {
        alert("File format not supported");
      } else {
        try {
          const base64Strings = await Promise.all(promises);
          dispatch({ type: "docFile", payload: base64Strings });
          dispatch({ type: "docFileName", payload: names });
          dispatch({ type: "docFileName2", payload: names2 });
          dispatch({ type: "docExt", payload: extensions });
        } catch (error) {
          alert(error);
        }
      }
    }
  };
  // Function to get the selected images
  const handleImgChange = async (e) => {
    const images = e.target.files;
    if (images && images.length > 0) {
      const names = Array.from(images).map((file) => file.name);
      const names2 = Array.from(images).map((file) =>
        getFilenameWithoutExtension(file.name),
      );
      const extensions = Array.from(images).map((file) =>
        file.name.split(".").pop(),
      );
      const promises = Array.from(images).map((file) => fileToBase64(file));
      if (checkNameValidity(names)) {
        alert(
          "File name can only have alphanumeric and one consecutive whitespace characters",
        );
      } else if (checkExtentions(extensions)) {
        alert("File format not supported");
      } else {
        try {
          const base64Strings = await Promise.all(promises);
          dispatch({ type: "imageFile", payload: base64Strings });
          dispatch({ type: "imageFileName", payload: names });
          dispatch({ type: "imageFileName2", payload: names2 });
          dispatch({ type: "imageExt", payload: extensions });
        } catch (error) {
          alert(error);
        }
      }
    }
  };
  // Function to get the selected video files
  const handlevideoChange = async (e) => {
    const video = e.target.files;
    const maxFileSize = 25 * 1024 * 1024;
    const sizeIssue = Array.from(video).some((vid) => vid.size > maxFileSize);
    if (sizeIssue) {
      alert("Video file cannot be above 25MB");
    }
    if (video && video.length > 0 && !sizeIssue) {
      const names = Array.from(video).map((file) => file.name);
      const names2 = Array.from(video).map((file) =>
        getFilenameWithoutExtension(file.name),
      );
      const extensions = Array.from(video).map((file) =>
        file.name.split(".").pop(),
      );
      const promises = Array.from(video).map((file) => fileToBase64(file));
      if (checkNameValidity(names)) {
        alert(
          "File name can only have alphanumeric and one consecutive whitespace characters",
        );
      } else if (checkExtentions(extensions)) {
        alert("File format not supported");
      } else {
        try {
          const base64Strings = await Promise.all(promises);
          dispatch({ type: "videoFile", payload: base64Strings });
          dispatch({ type: "videoFileName", payload: names });
          dispatch({ type: "videoFileName2", payload: names2 });
          dispatch({ type: "videoExt", payload: extensions });
        } catch (error) {
          alert(error);
        }
      }
    }
  };
  // Convert files to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  };
  const clearFiles = () => {
    dispatch({ type: "docFile", payload: [] });
    dispatch({ type: "imageFile", payload: [] });
    dispatch({ type: "videoFile", payload: [] });
    dispatch({ type: "docFileName", payload: [] });
    dispatch({ type: "imageFileName", payload: [] });
    dispatch({ type: "videoFileName", payload: [] });
    dispatch({ type: "docFileName2", payload: [] });
    dispatch({ type: "imageFileName2", payload: [] });
    dispatch({ type: "videoFileName2", payload: [] });
    dispatch({ type: "aidata_steps", payload: [] });
    dispatch({ type: "aidata_insights", payload: [] });
    dispatch({ type: "videoExt", payload: [] });
    dispatch({ type: "imageExt", payload: [] });
    dispatch({ type: "docExt", payload: [] });
  };
  return (
    <Fragment>
      {/* Project Dashboard */}
      <aside className="w-64 flex flex-col gap-6" data-purpose="left-sidebar">
        <section className="glass-card rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
              App Dashboard
            </h2>
          </div>
          <div className="space-y-1">
            {/*{slackToken!==null && <div className="flex items-center justify-between mb-3">
              <button className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white/50 transition-all text-[13px] font-semibold text-slate-700 group relative">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-white shadow-sm group-hover:shadow-md transition-all">
                  <img
                    alt="Slack"
                    className="w-4 h-4"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJLnGKg3p6jzCB_90cNwTGBz3psLxiBvTqZCdd9_S0_iBqL7VH2IUP4yXs25mzv6dj47HjAmbjnK7JbZOX6hyoaf-TYL3BMPV1tvIe-9cU1R3c78kWYnoHVkf0YcX_0HATxONqilCN5Mgc-RO5zHqz7QnbhEdf-PFm25rE99tP73rZrru-8axSVK-OxV3kX7MUIG_trGyrzXnzD9EG91UyqKV695wbFB2lZitWnAAkX0GXzT1nSmjvHCxgYtZaLaK0c4kIQX0b5KrN"
                  />
                </span>
                Slack
              </button>
              <button className="relative text-slate-300 hover:text-slate-500">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
                <div className="absolute left-4 top-6 -translate-y-1/2 glass-card rounded-lg py-1.5 px-3 shadow-xl z-20 border border-white/50 backdrop-blur-xl bg-white/30 text-left">
                  <span className="text-[10px] font-bold text-slate-700 hover:text-red-600 transition-colors cursor-pointer">
                    Disconnect
                  </span>
                </div>
              </button>
            </div>}*/}
            {/*{jiraToken!==null && <div className="flex items-center justify-between mb-3">
            <button className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white/50 transition-all text-[13px] font-semibold text-slate-700 group">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-blue-600 shadow-sm group-hover:shadow-md transition-all">
                <img
                  alt="Jira"
                  className="w-4 h-4"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkZiTwIpnSqdPTYCo8qnBSp7X2Wpbsb_H2RBAz3RfgFWKYgrIJcZCEnPFs4XtDv97WIhqRoGb8BVNL8-oxg5ia5Al_SDeDDloPDbqaM92rtRX_eDYj17KJXYZ_KvUDGEfV5S8rKh_ujf6sI13z-AmbpUkauE9-XNJJU_wpns3xYRD5Y3uql_McIEKywBvH6R6ZCb_JxprkPPUZ4yoHVJ8TqIJuVeG6UPEmVWAn2Qlb8qize7eGuOMPYz6d9MQ9d8M4tZBMYnrQzHOc"
                />
              </span>
              Jira
            </button>
            <button className="relative text-slate-300 hover:text-slate-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
              <div className="absolute left-4 top-6 -translate-y-1/2 glass-card rounded-lg py-1.5 px-3 shadow-xl z-20 border border-white/50 backdrop-blur-xl bg-white/30 text-left">
                <span className="text-[10px] font-bold text-slate-700 hover:text-red-600 transition-colors cursor-pointer">
                  Disconnect
                </span>
              </div>
            </button>
            </div>}*/}
            {googleCalendarToken !== null && (
              <div className="flex items-center justify-between mb-3">
                <button className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white/50 transition-all text-[13px] font-semibold text-slate-700 group">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-white shadow-sm group-hover:shadow-md transition-all">
                    <img
                      alt="Calendar"
                      className="w-4 h-4"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjH-N1t5TNxp6GmS27Z1uLaHvex1P3eAkmzDuJO-VwOLvU9rjeIA26mZN31hCGHpdX0o-tQBdQokgZD_Fr5P6i8-nxM2fnTPe5ykj9jElDBKgEIpc_y6AlGi3fNfIMFsCjDPqNCpEFUVR6gXuedvTZSQFs4WWIixWguagE1hIjJSnoMke0oeLfFGZ83w37_6CxIYoTF18EsOM5xe-9Ipss5refjEc6twu3fqjidzrFcPRFVOH7h-7k0ieosVRD183w_p3xmiaB8dmd"
                    />
                  </span>
                  Google Calendar
                </button>
                <button
                  onClick={() => toggleConnectCalendar()}
                  className="relative text-slate-300 hover:text-slate-500"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                  {toggleDisconnectGoogleCalendar && (
                    <div className="absolute left-4 top-6 -translate-y-1/2 glass-card rounded-lg py-1.5 px-3 shadow-xl z-20 border border-white/50 backdrop-blur-xl bg-white/30 text-left">
                      <span
                        onClick={() => disconnectCalendar()}
                        className="text-[10px] font-bold text-slate-700 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        Disconnect
                      </span>
                    </div>
                  )}
                </button>
              </div>
            )}
            {/*{githubToken !== null && (
              <div className="flex items-center justify-between mb-3">
                <button className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white/50 transition-all text-[13px] font-semibold text-slate-700 group">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-900 shadow-sm group-hover:shadow-md transition-all">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                    </svg>
                  </span>
                  GitHub
                </button>
                <button className="relative text-slate-300 hover:text-slate-500">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                  <div className="absolute left-4 top-6 -translate-y-1/2 glass-card rounded-lg py-1.5 px-3 shadow-xl z-20 border border-white/50 backdrop-blur-xl bg-white/30 text-left">
                    <span className="text-[10px] font-bold text-slate-700 hover:text-red-600 transition-colors cursor-pointer">
                      Disconnect
                    </span>
                  </div>
                </button>
              </div>
            )}*/}
            {googleDriveToken !== null && (
              <div className="flex items-center justify-between mb-3">
                <button className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white/50 transition-all text-[13px] font-semibold text-slate-700 group">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-white shadow-sm group-hover:shadow-md transition-all">
                    <img
                      alt="Google Drive"
                      className="w-4 h-4"
                      src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg"
                    />
                  </span>
                  Google Drive
                </button>
                <button
                  onClick={() => toggleConnectDrive()}
                  className="relative text-slate-300 hover:text-slate-500"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                  {toggleDisconnectGoogleDrive && (
                    <div className="absolute left-4 top-6 -translate-y-1/2 glass-card rounded-lg py-1.5 px-3 shadow-xl z-20 border border-white/50 backdrop-blur-xl bg-white/30 text-left">
                      <span
                        onClick={() => disconnectGoogleDrive()}
                        className="text-[10px] font-bold text-slate-700 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        Disconnect
                      </span>
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>
        {/* Upload Files */}
        <section className="glass-card rounded-2xl p-5 flex-1 flex flex-col gap-2 overflow-hidden">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-2">
            Upload Files
          </h2>
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.docx,.csv,.xls,.xlsx,.html,.txt,.doc"
            onChange={(e) => handleFileChange(e)}
            style={{ display: "none" }}
            multiple
          />
          <button
            onClick={() => getDoc()}
            className="flex items-center gap-3 w-full p-3.5 rounded-xl bg-white/40 hover:bg-white/70 border border-white/40 text-xs font-bold text-slate-600 shadow-sm transition-all"
          >
            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                stroke-width="1.8"
              ></path>
            </svg>
            Upload Document
          </button>
          <input
            type="file"
            ref={imgInputRef}
            accept="image/*"
            onChange={(e) => handleImgChange(e)}
            style={{ display: "none" }}
            multiple
          />
          <button
            onClick={() => getImg()}
            className="flex items-center gap-3 w-full p-3.5 rounded-xl bg-white/40 hover:bg-white/70 border border-white/40 text-xs font-bold text-slate-600 shadow-sm transition-all"
          >
            <svg
              className="w-4 h-4 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                stroke-width="1.8"
              ></path>
            </svg>
            Upload Image
          </button>
          <input
            type="file"
            ref={videoInputRef}
            accept="video/*"
            onChange={(e) => handlevideoChange(e)}
            style={{ display: "none" }}
            multiple
          />
          <button
            onClick={() => getAud()}
            className="flex items-center gap-3 w-full p-3.5 rounded-xl bg-white/40 hover:bg-white/70 border border-white/40 text-xs font-bold text-slate-600 shadow-sm transition-all"
          >
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              ></path>
            </svg>
            Upload Video
          </button>
          <div className="mt-auto pt-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Use Past Context
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked=""
                  className="sr-only peer"
                  type="checkbox"
                  value=""
                />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <button
              onClick={() => clearFiles()}
              className="w-full p-2.5 text-xs font-bold text-slate-500 bg-slate-200/40 rounded-xl hover:bg-slate-200/60 transition-colors"
            >
              Clear Session
            </button>
          </div>
        </section>
      </aside>
    </Fragment>
  );
};

export default Leftsidebar;
