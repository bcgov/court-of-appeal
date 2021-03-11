let { executeAsync } = require("app/lib/yop.postgresql");

let EFiling = function () {};

EFiling.prototype.createEFilingSubmission = async function (
  submissionId,
  transactionId,
  personId,
  formId
) {
  let select = `insert into efiling_submissions(submission_id, transaction_id, person_id, form_id) 
    values($1, $2, $3, $4) RETURNING id;`;
  return await executeAsync(select, [
    submissionId,
    transactionId,
    personId,
    formId,
  ]);
};

EFiling.prototype.updateFormToSubmitted = async function (formId, personId) {
  let select = `update forms set status = 'Submitted' where id = $1 and person_id = $2`;
  return await executeAsync(select, [formId, personId]);
};

EFiling.prototype.updateFormLastEFilingSubmission = async function (
  formId,
  personId,
  efilingSubmissionId
) {
  let select = `update forms set last_efiling_submission_id = $3 where id = $1 and person_id = $2`;
  return await executeAsync(select, [formId, personId, efilingSubmissionId]);
};

EFiling.prototype.updateEFilingSubmissionUrlAndNumber = async function (
  formId,
  personId,
  packageNumber,
  packageUrl
) {
  sql = `update efiling_submissions 
            set package_number = $3, package_url = $4, updated = current_timestamp 
            where id = (select last_efiling_submission_id from forms where id = $1 and person_id = $2) and person_id = $2`;
  rows = await executeAsync(sql, [formId, personId, packageNumber, packageUrl]);
};

EFiling.prototype.getEFilingInformation = async function (formId, personId) {
  sql = `select forms.data, efiling_submissions.package_url, efiling_submissions.package_number FROM forms, efiling_submissions
    where forms.id = $1 and forms.person_id = $2 and forms.last_efiling_submission_id = efiling_submissions.id `;
  let rows = await executeAsync(sql, [formId, personId]);
  return rows;
};

module.exports = {
  EFiling: EFiling,
};
