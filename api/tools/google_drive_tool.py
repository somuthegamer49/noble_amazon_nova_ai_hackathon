from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials


def list_drive_files(access_token, limit):

    creds = Credentials(token=access_token)

    service = build("drive","v3",credentials=creds)

    results = service.files().list(
        pageSize=limit,
        fields="files(id,name)"
    ).execute()

    return results["files"]