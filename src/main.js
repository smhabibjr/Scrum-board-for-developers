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
  console.log("new task has been created : " + JSON.stringify(result));

  new_task_data.id = result.insertId;

  return new_task_data;
  }catch(error){
    console.log(error);
  }

  /*
    const result = conn.query('INSERT INTO scrum_task SET ?', );
    console.log("new task has been created : " + result); */
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
};
