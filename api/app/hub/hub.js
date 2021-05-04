const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
var {
  extractParties,
  buildPartyInfo,
  rawAppellants,
  rawRespondents,
  extractCaseType,
} = require("./parsing.form7");

const { buildEFilingPackage } = require("./build.efiling");

function Hub(url, timeout) {
  this.url = url;
  this.host = this.extractHost(url);
  this.port = this.extractPort(url);
  this.timeout = timeout;
}

var ciEquals = function (a, b) {
  return typeof a === "string" && typeof b === "string"
    ? a.localeCompare(b, undefined, { sensitivity: "accent" }) === 0
    : a === b;
};

Hub.prototype.extractHost = function (url) {
  var value = url.substring(url.indexOf("://") + 3);
  if (value.indexOf(":") != -1) {
    return value.substring(0, value.indexOf(":"));
  }
  if (value.indexOf("/") != -1) {
    return value.substring(0, value.indexOf("/"));
  }
  return value;
};

Hub.prototype.extractPort = function (url) {
  var value = url.substring(url.indexOf("://") + 3);
  value = value.substring(value.indexOf(":") + 1);
  var port = parseInt(value);
  return isNaN(port) ? 80 : port;
};

// Example: Name (was big boss) -> Name
Hub.prototype.cleanName = function (name) {
  return name
    ? name
        .replace(/\s*\(.*?\)\s*/g, "")
        .replace(",", "")
        .trim()
    : name;
};

Hub.prototype.searchForPartyInRespondents = function (
  respondents,
  lastName,
  firstName,
  organizationName,
  searchBy
) {
  if (searchBy === "Individual")
    return respondents.find(
      (resp) =>
        ciEquals(this.cleanName(resp.lastName), lastName) &&
        ciEquals(this.cleanName(resp.firstName), firstName)
    );
  else
    return respondents.find(
      (resp) =>
        resp.organization &&
        ciEquals(this.cleanName(resp.organization), organizationName)
    );
};

Hub.prototype.submitForm = async function (
  request,
  bceidGuid,
  data,
  pdf,
  callback
) {
  let efilingData = buildEFilingPackage(request, data, pdf);
  let transactionId = uuidv4();
  let submissionId;
  try {
    let url = `http://${this.host}:${this.port}/efiling/uploadForm2`;
    const document_submit = await axios.post(url, {
      bceidGuid,
      transactionId,
      pdf,
    });
    submissionId = document_submit.data.submissionId;
  } catch (error) {
    console.log(error.message);
  }

  //This is very unlikely to happen, as we're in control of the document generation.
  if (!submissionId) {
    console.log("No submissionId returned from document upload.");
    callback(
      { error: { code: 500, message: "Error with document upload." } },
      transactionId,
      null
    );
    return;
  }

  try {
    const url = `http://${this.host}:${this.port}/efiling/submit`;
    const efiling_submit = await axios.post(url, {
      bceidGuid,
      transactionId,
      submissionId,
      data: efilingData,
    });
    const data = efiling_submit.data;
    callback(data, transactionId, submissionId);
  } catch (error) {
    console.log(error);
    callback(
      { error: { code: 500, message: "Error with submission." } },
      transactionId,
      submissionId
    );
  }
};

Hub.prototype.searchForm7 = async function (parameters, callback) {
  try {
    const {
      file,
      lastName,
      firstName,
      organizationName,
      searchBy,
    } = parameters;

    const url = `http://${this.host}:${this.port}/form7s?caseNumber=${file}`;
    const searchForm7 = await axios.get(url);
    const responseData = searchForm7.data;

    var caseType = extractCaseType(responseData);
    if (caseType == "Criminal") {
      callback({ error: { code: 404, message: "criminal" } });
      return;
    }

    var parties = extractParties(responseData);
    if (!parties) {
      callback({ error: { code: 404 } });
      return;
    }

    let appellants = rawAppellants(parties).map(buildPartyInfo);
    let respondents = rawRespondents(parties).map(buildPartyInfo);
    if (
      !respondents ||
      respondents.length === 0 ||
      !appellants ||
      appellants.length === 0
    ) {
      console.error(`Bad file: ${file} missing appellants or respondents.`);
      callback({ error: { code: 404 } });
      return;
    }

    let searchFound = this.searchForPartyInRespondents(
      respondents,
      lastName,
      firstName,
      organizationName,
      searchBy
    );
    if (!searchFound) {
      console.info(`Respondents didn't match.`);
      callback({ error: { code: 404, message: "Respondents didn't match." } });
      return;
    }
    callback({
      appellants: appellants,
      respondents: respondents,
    });
  } catch (error) {
    if (error.response && error.response.status == 404) {
      callback({ error: { code: 404 } });
      return;
    }
    console.log(error);
    callback({ error: { code: 500, message: "Error with search." } });
  }
};

module.exports = Hub;
