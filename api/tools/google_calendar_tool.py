from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials


def create_calendar_event(token, summary, start_time, end_time):

    creds = Credentials(token=token)

    service = build("calendar","v3",credentials=creds)

    event = {

        "summary": summary,

        "start":{
            "dateTime": start_time,
            "timeZone": "UTC"
        },

        "end":{
            "dateTime": end_time,
            "timeZone": "UTC"
        }

    }

    created_event = service.events().insert(
        calendarId="primary",
        body=event
    ).execute()

    return created_event