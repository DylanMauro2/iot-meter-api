export const buildInsertQuery = (table, data) => {
  const keys = Object.keys(data).filter(key => data[key] !== undefined);
  const values = keys.map(key => `'${data[key]}'`);
  
  const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.join(', ')})`;
  return query;
};