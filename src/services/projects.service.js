const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, description, start_date, end_date FROM projects LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const [{total}] = await db.query(`SELECT FOUND_ROWS() as total`)
  const data = helper.emptyOrRows(rows);
  const meta = {page, total};

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
    (name, description, start_date, end_date, tech_stack) 
    VALUES 
    (?, ?, ?, ?, ?)`, 
    [
      project.name, project.description,
      project.start_date, project.end_date,
      project.tech_stack
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
    end_date=?, tech_stack=? 
    WHERE id=?`, 
    [
      project.name, project.description,
      project.start_date, project.end_date,
      project.tech_stack, id
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
    `DELETE FROM project WHERE id=?`, 
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
