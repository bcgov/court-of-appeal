let { executeAsync } = require("app/lib/yop.postgresql");

let Audit = function () {};

Audit.prototype.writeAuditCaseSearch = async function (
  personId,
  ipAddress,
  caseNumber,
  type
) {
  let select = `insert into audit_cases(person_id, ip_address, case_number, type) 
    values($1, $2, $3, $4) RETURNING id;`;
  return await executeAsync(select, [personId, ipAddress, caseNumber, type]);
};
module.exports = {
  Audit: Audit,
};
