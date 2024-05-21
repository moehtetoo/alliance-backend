const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, description, start_date as startDate, end_date as endDate FROM projects LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const [{total}] = await db.query(`SELECT COUNT(*) as total FROM projects`)
  const data = helper.emptyOrRows(rows);
  const meta = {offset, total};

  return {
    data: {
      list: data,
      meta
    }
  }
}

async function create(project){
  const result = await db.query(
    `INSERT INTO projects 
    (name, description, start_date, end_date) 
    VALUES 
    (?, ?, ?, ?)`, 
    [
      project.name, project.description,
      project.startDate, project.endDate ? project.endDate : null,
    ]
  );

  let message = 'Error in creating project';

  if (result.affectedRows) {
    message = 'Project created successfully';
  }

  return {message};
}

async function update(id, project){
  const result = await db.query(
    `UPDATE projects 
    SET name=?, description=?, start_date=?, 
    end_date=?
    WHERE id=?`, 
    [
      project.name, project.description,
      project.startDate, project.endDate, id
    ]
  );

  let message = 'Error in updating project';

  if (result.affectedRows) {
    message = 'Project updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM projects WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting project';

  if (result.affectedRows) {
    message = 'Project deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
