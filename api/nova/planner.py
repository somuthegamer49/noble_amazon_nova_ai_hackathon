from .client import bedrock
import os
import base64
from .nova_tool_client import nova_converse
from .tool_registry import TOOLS
from tools.google_drive_tool import  list_drive_files
from tools.google_calendar_tool import  create_calendar_event

MODEL_ID = os.getenv("AWS_MODEL_ID")

def run_agent(text_prompt, google_drive_token,google_calendar_token, images, docs, videos, file_ext,
        file_names):

    def process_file(file):
        encoded_data = file.split(',')[1]
        missing_padding = len(encoded_data) % 4
        if missing_padding:
            encoded_data += '=' * (4 - missing_padding)
        decoded_bytes = base64.b64decode(encoded_data)
        return decoded_bytes

    files = {
        "images": [process_file(img) for img in images or []],
        "documents": [process_file(doc) for doc in docs or []],
        "videos": [process_file(aud) for aud in videos or []]
    }
    prompt = f"""
You are AI autonomous agent.

Execute the User request:{text_prompt}

Return JSON:
  "{{"insights":["..."],
  "steps":[
    {{"step":"Analyze document, User request or both"}},
    {{"step":"Check access tokens if any and figure out the app"}},
    {{"step":"Execute the tasks as per user requests"}},
    {{"..."}}
  ]}}"
"""
    documents = []
    images = []
    video =[]
    if len(files["documents"]) > 0:
        for file,ext,name in zip(files["documents"],file_ext,file_names):
            documents.append({
                "document": {
                    "format": ext, 
                    "name": name, 
                    "source": {
                        "bytes": file
                    }
                }
            })
    if len(files["images"]) > 0:
        for file,ext,name in zip(files["images"],file_ext,file_names):
            images.append({
                "image": {
                    "format": ext, 
                    "source": {
                        "bytes": file
                    }
                }
            })
    if len(files["videos"]) > 0:
        for file,ext,name in zip(files["videos"],file_ext,file_names):
            video.append({
                "video": {
                    "format": ext, 
                    "source": {
                        "bytes": file
                    }
                }
            })
    documents.append({"text": prompt})
    images.append({"text": prompt})
    video.append({"text": prompt})
    contents = documents+images+video

    def normal_AI_call():
        response = bedrock.converse(
            modelId=MODEL_ID,
            messages=[{"role": "user","content": contents}],
            inferenceConfig=   {
            "maxTokens": 500,
            "temperature": 0.7
            }
        )
        res = response["output"]["message"]["content"][0]["text"]
        result = res.strip().removeprefix("```json").removesuffix("```").strip()
        return result
    
    messages = [
        {
            "role": "user",
            "content": [{"text": text_prompt}]
        }
    ]

    response = nova_converse(messages, tools=TOOLS)

    content = response["output"]["message"]["content"]

    tool_call = None

    for item in content:
        if "toolUse" in item:
            tool_call = item["toolUse"]

    tool_name = ""
    tool_input = ""
    if tool_call is not None:
        tool_name = tool_call["name"]
        tool_input = tool_call["input"]
        
    result1=None
    result2=None

    if tool_name == "list_drive_files" and google_drive_token is not None:
        result1 = list_drive_files(
            google_drive_token,
            tool_input["limit"]
        )

    if tool_name == "create_calendar_event" and google_calendar_token is not None:

        result2 = create_calendar_event(
            google_calendar_token,
            tool_input["summary"],
            tool_input["start_time"],
            tool_input["end_time"]
        )
    final_content = None
    if google_drive_token is not None or google_calendar_token is not None:
        messages.append({
            "role": "assistant",
            "content": content
        })
        result=f"{result1} {result2}"
        messages.append({
            "role": "user",
            "content": [{
                "toolResult":{
                    "toolName": tool_name,
                    "content": str(result)
                }
            }]
        })

        messages.append({
            "role": "user",
            "content": prompt
        })

        final = nova_converse(messages)
        final_content = final["output"]["message"]["content"][0]["text"]
    else:
        final_content =  normal_AI_call()

    result = final_content.strip().removeprefix("```json").removesuffix("```").strip()
    return result