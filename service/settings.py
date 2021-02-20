import os

# COA
COA_PASSWORD = os.environ.get("COA_PASSWORD", "")
COA_SEARCH_ENDPOINT = os.environ.get("COA_SEARCH_ENDPOINT", "")
COA_USERNAME = os.environ.get("COA_USERNAME", "")

# CHES
CHES_AUTH_URL = os.environ.get("CHES_AUTH_URL", "")
CHES_EMAIL_URL = os.environ.get("CHES_EMAIL_URL", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "")
SENDER_NAME = os.environ.get("SENDER_NAME", "")
EMAIL_SERVICE_CLIENT_ID = os.environ.get("EMAIL_SERVICE_CLIENT_ID", "")
EMAIL_SERVICE_CLIENT_SECRET = os.environ.get("EMAIL_SERVICE_CLIENT_SECRET", "")

# Efiling
EFILING_APP_NAME = os.environ.get("EFILING_APP_NAME", "Court Of Appeal")
EFILING_COURT_LEVEL = os.environ.get("EFILING_COURT_LEVEL", "A")
EFILING_COURT_CLASS = os.environ.get("EFILING_COURT_CLASS", "O")  # https://bcgov.github.io/jag-file-submission/#/data?id=court-classification
EFILING_COURT_DIVISION = os.environ.get("EFILING_COURT_DIVISION", "I")
EFILING_HUB_API_BASE_URL = os.environ.get("EFILING_HUB_API_BASE_URL", "")
EFILING_HUB_KEYCLOAK_BASE_URL = os.environ.get("EFILING_HUB_KEYCLOAK_BASE_URL", "")
EFILING_HUB_KEYCLOAK_CLIENT_ID = os.environ.get("EFILING_HUB_KEYCLOAK_CLIENT_ID", "")
EFILING_HUB_KEYCLOAK_REALM = os.environ.get("EFILING_HUB_KEYCLOAK_REALM", "")
EFILING_HUB_KEYCLOAK_SECRET = os.environ.get("EFILING_HUB_KEYCLOAK_SECRET", "")
