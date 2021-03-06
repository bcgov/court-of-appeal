_includeFile=$(type -p overrides.inc)
# Import ocFunctions.inc for getSecret
_ocFunctions=$(type -p ocFunctions.inc)
if [ ! -z ${_includeFile} ]; then
  . ${_ocFunctions}
  . ${_includeFile}
else
  _red='\033[0;31m'; _yellow='\033[1;33m'; _nc='\033[0m'; echo -e \\n"${_red}overrides.inc could not be found on the path.${_nc}\n${_yellow}Please ensure the openshift-developer-tools are installed on and registered on your path.${_nc}\n${_yellow}https://github.com/BCDevOps/openshift-developer-tools${_nc}"; exit 1;
fi

OUTPUT_FORMAT=json

# Generate nginx.conf.template Config Map
# Injected by genDepls.sh
# - NGINX_CONF_TEMPLATE_CONFIG_MAP_NAME
CONFIG_MAP_NAME=${NGINX_CONF_TEMPLATE_CONFIG_MAP_NAME}
SOURCE_FILE=$( dirname "$0" )/../../../docker/nginx-runtime/nginx.conf.template
OUTPUT_FILE=${CONFIG_MAP_NAME}-configmap_DeploymentConfig.json
printStatusMsg "Generating ConfigMap; ${CONFIG_MAP_NAME} ..."
generateConfigMap "${CONFIG_MAP_NAME}" "${SOURCE_FILE}" "${OUTPUT_FORMAT}" "${OUTPUT_FILE}"

if createOperation; then
  # Randomly generate a set of credentials without asking ...
  printStatusMsg "Creating a set of random user credentials ..."
  writeParameter "HTTP_BASIC_USERNAME" $(generateUsername) "false"
  writeParameter "HTTP_BASIC_PASSWORD" $(generatePassword) "false"

  readParameter "ALLOW_LIST - Please enter the list of trusted IP addresses that should be allowed to access the application's route (as a space delimited list of IP addresses):" "ALLOW_LIST" "" "false"
else
  # Secrets are removed from the configurations during update operations ...
  printStatusMsg "Update operation detected ...\nSkipping the generation of random user credentials ...\n"
  writeParameter "HTTP_BASIC_USERNAME" "generation_skipped" "false"
  writeParameter "HTTP_BASIC_PASSWORD" "generation_skipped" "false"

  # Get ALLOW_LIST from secret
  printStatusMsg "Getting allow list from secret ...\n"
  writeParameter "ALLOW_LIST" "$(getSecret "${NAME}" "allow-list")" "false"
fi

SPECIALDEPLOYPARMS="--param-file=${_overrideParamFile}"
echo ${SPECIALDEPLOYPARMS}