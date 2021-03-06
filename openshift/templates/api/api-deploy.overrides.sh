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
  readParameter "HUB_URL - Please provide the url for the filing hub.  The default is a blank string." HUB_URL "" "false"
  parseHostnameParameter "HUB_URL" "HUB_HOST"

  readParameter "KEYCLOAK_AUTH_URL - Please provide the url for the KeyCloak authentication endpoint.  The default is a blank string." KEYCLOAK_AUTH_URL "" "false"
  readParameter "KEYCLOAK_REALM - Please provide the KeyCloak authentication realm.  The default is a blank string." KEYCLOAK_REALM "" "false"
  readParameter "KEYCLOAK_CLIENT_ID - Please provide the KeyCloak Client ID.  The default is a blank string." KEYCLOAK_CLIENT_ID "" "false"
  readParameter "KEYCLOAK_SECRET - Please provide the KeyCloak Client Secret.  The default is a blank string." KEYCLOAK_SECRET "" "false"

  readParameter "COOKIE_SECRET - Please provide the Cookie Secret for the environemnt.  The default is a blank string." COOKIE_SECRET "" "false"
else
  # Secrets are removed from the configurations during update operations ...
  printStatusMsg "Update operation detected ...\nSkipping the prompts for secrets ... \n"

  writeParameter "HUB_URL" "prompt_skipped" "false"

  writeParameter "KEYCLOAK_AUTH_URL" "prompt_skipped" "false"
  writeParameter "KEYCLOAK_REALM" "prompt_skipped" "false"
  writeParameter "KEYCLOAK_CLIENT_ID" "prompt_skipped" "false"
  writeParameter "KEYCLOAK_SECRET" "prompt_skipped" "false"

  writeParameter "COOKIE_SECRET" "prompt_skipped" "false"

  # Get HUB_HOST from secret
  printStatusMsg "Getting HUB_HOST for the ExternalNetwork definition from secret ...\n"
  writeParameter "HUB_HOST" $(getSecret "${NAME}" "hub-host") "false"
fi

SPECIALDEPLOYPARMS="--param-file=${_overrideParamFile}"
echo ${SPECIALDEPLOYPARMS}