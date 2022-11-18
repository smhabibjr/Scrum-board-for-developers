const { BrowserWindow, Notification } = require("electron");
const { getConnection } = require("./database");


async function create_new_task(new_task_data) {
  try{
    console.log("hi there" + JSON.stringify(new_task_data));
  const conn = await getConnection();
  const result = await conn.query(
    "INSERT INTO scrum_task SET ?",
    new_task_data
  );
  new_task_data.id = result.insertId;
  return new_task_data;
  }catch(error){
    console.log(error);
  }
}

async function get_todo_tasks(){
  const conn = await getConnection();
  const result = await conn.query(
    "SELECT * FROM scrum_task WHERE stage = 'in-todo-list' "
  );

  return result;
}

async function get_progress_tasks() {
  const conn = await getConnection();
  const result = await conn.query(
    "SELECT * FROM scrum_task WHERE stage = 'in-progress-list' "
  );

  return result;
}


async function get_review_tasks() {
  const conn = await getConnection();
  const result = await conn.query(
    "SELECT * FROM scrum_task WHERE stage = 'in-review-list' "
  );

  return result;
}

async function get_done_tasks() {
  const conn = await getConnection();
  const result = await conn.query(
    "SELECT * FROM scrum_task WHERE stage = 'in-done-list' "
  );

  return result;
}


async function update_task_stage(task_id, task_stage){
  try{
    const conn = await getConnection();
   sqlParams = [task_stage, task_id];
   var sql = "UPDATE scrum_task SET stage = ? WHERE id = ?";

  conn.query(sql,sqlParams, function (err, result) {
    if (err) throw err;
    //console.log(result.affectedRows + " record(s) updated");
  });
  }catch(err){
    console.log(err);
  }
}

async function createProduct(product) {
  try {
    const conn = await getConnection();
    product.price = parseFloat(product.price);
    const result = await conn.query("INSERT INTO product SET ?", product);
    console.log(result);

    new Notification({
      title: "Electron mysql",
      body: "New product saved successfully",
    }).show();

    product.id = result.insertId;
    return product;
  } catch (error) {
    console.log(error);
  }
}

async function getProducts() {
  const conn = await getConnection();
  const result = conn.query("SELECT * FROM product");
  return result;
}

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.loadFile("src/ui/index.html");
}

module.exports = {
  createWindow,
  createProduct,
  getProducts,
  create_new_task,
  get_todo_tasks,
  get_progress_tasks,
  get_review_tasks,
  get_done_tasks,
  update_task_stage,
};
