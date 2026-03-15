const initialState = {
  toggleConnectApp:false,
  toggleConnecAppModal:false,
  toggleProjDashOption:false,
  googleDriveToken:null,
  googleCalendarToken:null,
  slackToken:0,
  jiraToken:0,
  githubToken:0,
  videoFile:[],
  imageFile:[],
  docFile:[],
  uierror:"",
  aidata_steps:[],
  aidata_insights:[],
  docFileName:[],
  imageFileName:[],
  videoFileName:[],
  docFileName2:[],
  imageFileName2:[],
  videoFileName2:[],
  videoExt:[],
  imageExt:[],
  docExt:[],
  file_names:[]
};

function stateReducer(state = initialState, action) {
  switch (action.type) {
    case "toggleConnectApp":
      state.toggleConnectApp = !state.toggleConnectApp;
      return { ...state };
    case "toggleConnecAppModal":
      state.toggleConnecAppModal = !state.toggleConnecAppModal;
      return { ...state };
    case "toggleProjDashOption":
      state.toggleProjDashOption = !state.toggleProjDashOption;
      return { ...state };
    case "googleDriveToken":
      state.googleDriveToken = action.payload;
      return { ...state };
    case "googleCalendarToken":
      state.googleCalendarToken = action.payload;
      return { ...state };
    case "slackToken":
      state.slackToken = action.payload;
      return { ...state };
    case "jiraToken":
      state.jiraToken = action.payload;
      return { ...state };
    case "githubToken":
      state.githubToken = action.payload;
      return { ...state };
    case "videoFile":
      state.videoFile = action.payload;
      return { ...state };
    case "imageFile":
      state.imageFile = action.payload;
      return { ...state };
    case "docFile":
      state.docFile = action.payload;
      return { ...state };
    case "uierror":
      state.uierror = action.payload;
      return { ...state };
    case "aidata_insights":
      state.aidata_insights = action.payload;
      return { ...state };
    case "aidata_steps":
      state.aidata_steps = action.payload;
      return { ...state };
    case "docFileName":
      state.docFileName = action.payload;
      return { ...state };
    case "imageFileName":
      state.imageFileName = action.payload;
      return { ...state };
    case "videoFileName":
      state.videoFileName = action.payload;
      return { ...state };
    case "docFileName2":
      state.docFileName2 = action.payload;
      return { ...state };
    case "imageFileName2":
      state.imageFileName2 = action.payload;
      return { ...state };
    case "videoFileName2":
      state.videoFileName2 = action.payload;
      return { ...state };
    case "videoExt":
      state.videoExt = action.payload;
      return { ...state };
    case "imageExt":
      state.imageExt = action.payload;
      return { ...state };
    case "docExt":
      state.docExt = action.payload;
      return { ...state };
    case "file_names":
      state.file_names = action.payload;
      return { ...state };
    default:
      return state;
  }
}

export default stateReducer;