TOOLS = [

{
    "toolSpec": {
"name": "list_drive_files",
"description": "List files from Google Drive",
"inputSchema": {
    "json": {
"type": "object",
"properties": {
"limit": {"type": "integer"}
},
"required": ["limit"]
}
}
    }
},

{ "toolSpec": {
"name": "create_calendar_event",
"description": "Create a Google Calendar event",
"inputSchema": {
    "json": {
"type": "object",
"properties": {

"summary": {"type": "string"},
"start_time": {"type": "string"},
"end_time": {"type": "string"}

},
"required": ["summary","start_time","end_time"]
}
}
}
}
]