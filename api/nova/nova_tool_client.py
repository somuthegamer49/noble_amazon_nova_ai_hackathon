from .client import bedrock
import os
MODEL_ID = os.getenv("AWS_MODEL_ID")

def nova_converse(messages, tools=None):

    payload = {
        "modelId": MODEL_ID,
        "messages": messages
    }

    if tools:
        payload["toolConfig"] = {"tools": tools}

    response = bedrock.converse(**payload)

    return response