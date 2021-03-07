_includeFile=$(type -p overrides.inc)
# Import ocFunctions.inc for getSecret
_ocFunctions=$(type -p ocFunctions.inc)
if [ ! -z ${_includeFile} ]; then
  . ${_ocFunctions}
  . ${_includeFile}
else
  _red='\033[0;31m'; _yellow='\033[1;33m'; _nc='\033[0m'; echo -e \\n"${_red}overrides.inc could not be found on the path.${_nc}\n${_yellow}Please ensure the openshift-developer-tools are installed on and registered on your path.${_nc}\n${_yellow}https://github.com/BCDevOps/openshift-developer-tools${_nc}"; exit 1;
fi

# ================================================================================================================
# Special deployment parameters needed for injecting a user supplied settings into the deployment configuration
# ----------------------------------------------------------------------------------------------------------------

if createOperation; then
  # Ask the user to supply the sensitive parameters ...
  readParameter "COA_USERNAME - Please provide the username for authenticating with the COA web services endpoint.  The default is a blank string." COA_USERNAME "" "false"
  readParameter "COA_PASSWORD - Please provide the password for authenticating with the COA web services endpoint.  The default is a blank string." COA_PASSWORD "" "false"
  readParameter "COA_SEARCH_ENDPOINT - Please provide the url for the COA search endpoint.  The default is a blank string." COA_SEARCH_ENDPOINT "" "false"

  # Get the email settings
  readParameter "EMAIL_SERVICE_URL - Please provide the url for the CHES email api.  The default is a blank string." EMAIL_SERVICE_URL "" "false"
  readParameter "EMAIL_SERVICE_AUTH_URL - Please provide the url for the CHES authentication endpoint.  The default is a blank string." EMAIL_SERVICE_AUTH_URL "" "false"
  readParameter "EMAIL_SERVICE_CLIENT_ID - Please provide the service client id for sending access request emails.  The default is a blank string." EMAIL_SERVICE_CLIENT_ID "" "false"
  readParameter "EMAIL_SERVICE_CLIENT_SECRET - Please provide the service client secret to use with above id.  The default is a blank string." EMAIL_SERVICE_CLIENT_SECRET "" "false"
  readParameter "SENDER_EMAIL - Please provide the email address used for sending access request emails.  The default is a blank string." SENDER_EMAIL "" "false"
  readParameter "SENDER_NAME - Please provide the name to use with the above email address.  The default is a blank string." SENDER_NAME "" "false"

  # Get the eFiling settings
  readParameter "EFILING_HUB_KEYCLOAK_BASE_URL - Please provide the url for the eFiling authentication.  The default is a blank string." EFILING_HUB_KEYCLOAK_BASE_URL "" "false"
  readParameter "EFILING_HUB_KEYCLOAK_REALM - Please provide the realm for the eFiling authentication.  The default is a blank string." EFILING_HUB_KEYCLOAK_REALM "" "false"
  readParameter "EFILING_HUB_KEYCLOAK_CLIENT_ID - Please provide the service client id for submitting the application.  The default is a blank string." EFILING_HUB_KEYCLOAK_CLIENT_ID "" "false"
  readParameter "EFILING_HUB_KEYCLOAK_SECRET - Please provide the service client secret to use with above id.  The default is a blank string." EFILING_HUB_KEYCLOAK_SECRET "" "false"
  readParameter "EFILING_HUB_API_BASE_URL - Please provide base url for efiling.  The default is a blank string." EFILING_HUB_API_BASE_URL "" "false"
else
  # Secrets are removed from the configurations during update operations ...
  printStatusMsg "Update operation detected ...\nSkipping the prompts secrets ...\n"
  writeParameter "COA_USERNAME" "prompt_skipped" "false"
  writeParameter "COA_PASSWORD" "prompt_skipped" "false"
  writeParameter "COA_SEARCH_ENDPOINT" "prompt_skipped" "false"

  writeParameter "EMAIL_SERVICE_URL" "prompt_skipped" "false"
  writeParameter "EMAIL_SERVICE_AUTH_URL" "prompt_skipped" "false"
  writeParameter "EMAIL_SERVICE_CLIENT_ID" "prompt_skipped" "false"
  writeParameter "EMAIL_SERVICE_CLIENT_SECRET" "prompt_skipped" "false"
  writeParameter "SENDER_EMAIL" "prompt_skipped" "false"
  writeParameter "SENDER_NAME" "prompt_skipped" "false"

  writeParameter "EFILING_HUB_KEYCLOAK_BASE_URL" "prompt_skipped" "false"
  writeParameter "EFILING_HUB_KEYCLOAK_REALM" "prompt_skipped" "false"
  writeParameter "EFILING_HUB_KEYCLOAK_CLIENT_ID" "prompt_skipped" "false"
  writeParameter "EFILING_HUB_KEYCLOAK_SECRET" "prompt_skipped" "false"
  writeParameter "EFILING_HUB_API_BASE_URL" "prompt_skipped" "false"
fi

SPECIALDEPLOYPARMS="--param-file=${_overrideParamFile}"
echo ${SPECIALDEPLOYPARMS}