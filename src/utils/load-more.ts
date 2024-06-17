/* eslint-disable */

const RECORDS_PER_FETCH = 10;

export const fetchResults = (data: any, startingId = 0) => {
  let obj = [];

  for (let i = startingId; i < startingId + RECORDS_PER_FETCH; i++) {
    if (data[i] === undefined) break;

    obj.push(data[i]);
  }
  return obj;
};
