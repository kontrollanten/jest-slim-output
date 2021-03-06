#!/usr/bin/env node

const colors = require('colors');
const logSymbols = require('log-symbols');

const sortFailedLast = (a, b) => {
  switch(true) {
    case a.status < b.status:
      return 1;
    case a.status > b.status:
      return -1;
    default:
      return 0;
  }
};

const filterFailedOnly = obj => obj.status === 'failed';

const stdin = process.openStdin();

stdin.on('data', chunk => {
  let report;
  try {
    report = JSON.parse(chunk.toString('utf8'));
  } catch (error) {
    console.log(chunk.toString('utf8'));
  }

  if (!report) return;
  
  const failures = report.testResults
    .filter(filterFailedOnly)
    .reduce((total, test) => ([...total, ...test.assertionResults]), [])
    .filter(filterFailedOnly);

  if (failures.length) {
    failures
      .forEach(assertion => {
        console.log(logSymbols.error, assertion.fullName.underline.red);
        assertion.failureMessages
          .map(mess => mess.split('\n').slice(0, 2).join('\n'))
          .forEach(mess => console.error(mess.red));
      });
  } else {
    console.log(logSymbols.success, 'Hurra! Everything\'s fine. Sleep tight.'.green);
  }
});
