
export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/"
export BAMBORA_MERCHANT_ID=300206630
export BAMBORA_API_PASSCODE=42496aB60fb14Df98a087b2bAD262113
export BAMBORA_TOKENIZATION_URL=https4://www.beanstream.com/scripts/tokenization/tokens
export BAMBORA_PAYMENT_URL=https4://api.na.bambora.com/v1/payments
export COA_USER=efilehub_dev
export COA_PASSWORD=Welcome13!
export COA_SEARCH_ENDPOINT=https4://wsgw.dev.jag.gov.bc.ca/efilehub/courts/CSOSearch
export COA_NAMESPACE=http://services.ws.appeal.courts.gov.bc.ca
export COA_SEARCH_SOAP_ACTION=http://services.ws.appeal.courts.gov.bc.ca/SearchByCaseNumber
export COA_VIEW_CASE_PARTY_SOAP_ACTION=http://services.ws.appeal.courts.gov.bc.ca/ViewCaseParty
export COA_VIEW_CASE_BASICS_SOAP_ACTION=http://services.ws.appeal.courts.gov.bc.ca/ViewCaseBasics
export PGUSER=postgres
export PGHOST=localhost
export PGDATABASE=efiling
export EFILING_TEST_DB='efiling_test'
export HUB_TIMEOUT=10000
export NODE_ENV=development
export OPENSHIFT_NODEJS_PORT=8081
export HUB_URL=http://integration-hub-jag-efiling-dev.pathfinder.gov.bc.ca/hub
export PGPASSWORD=susan.perkins
export PGUSER=susan.perkins
export REACT_APP_API_URL=http://localhost:3333/court-of-appeal

# node start.with.fake.credentials.js
# node tests/support/fake.siteminder.js