const { BrowserWindow, Notification } = require("electron");
const { getConnection } = require("./database");

async function createProduct(product) {
  try{
    const conn = await getConnection();
    product.price = parseFloat(product.price);
    const result = await conn.query('INSERT INTO product SET ?', product);
    console.log(result);

    new Notification({
      title:'Electron mysql',
      body: 'New product saved successfully'
    }).show();

    product.id = result.insertId;
    return product;

  }catch(error){
    console.log(error);
  }
  
}


async function getProducts(){
  const conn = await getConnection();
  const result = conn.query('SELECT * FROM product');
  return result;
}

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
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
};
