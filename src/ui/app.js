const { remote } = require("electron");
const main = remote.require("./main");

  // grab the modal box
  var modal = document.querySelector("#modalbox-with-form");
  var btn_open_modal_box = document.querySelector("#add-new-task");
  var btn_modalbox_close = document.querySelector("#btn-modalbox-close");
  var dropping = false;

  function drag_and_drop() {
    console.log("draganddrop called");
    const items = document.querySelectorAll(".task-item");
    const columns = document.querySelectorAll(".item-column");
    items.forEach((item) => {
      $(item).off();
      $(item).on("dragstart", dragStart);
    });

    columns.forEach((column) => {
      $(column).off();
      $(column).on("dragover", drag_over);
      $(column).on("drop", drop_item);
    });

    function drag_over(e) {
      e.preventDefault();
    }

    let dropItem = null;
    function dragStart() {
      console.log("drag started");
      dropItem = this;
    }

    function drop_item(e) {
      console.log("item droped");
      this.append(dropItem);
    }
  }

  drag_and_drop();
  btn_open_modal_box.onclick = function () {
    modal.style.display = "block";
  };

  btn_modalbox_close.onclick = function () {
    modal.style.display = "none";
  };

  remove_red_border();
  function remove_red_border() {
    $(".input-fields").on("keyup change", function (e) {
      $(this).removeClass("validation");
      $(this).css("border", "solid 1px green");
    });
  }

  $("#btn-add-new-iteam").click(function () {
    var form_data = {
      new_category: $("#category").val(),
      new_task: $("#task").val(),
      new_date: $("#date").val(),
    };

    var { new_category, new_task, new_date } = form_data;

    var due_days = getNumberOfDays(
      current_date(),
      dateFormat(new_date, "MM/dd/yyyy")
    );

    if (form_validation()) {
      var add_new_task = $(".clone-new-task")
        .clone()
        .removeClass("clone-new-task d-none")
        .addClass("new-task-iteam");
      add_new_task.find(".task-category-name").text(new_category);
      add_new_task.find(".single-task-name").text(new_task);
      add_new_task.find(".task-submit-date").text("submit : " + new_date);
      add_new_task.find(".task-due-date").text("Due " + due_days + " days");
      $("#todo-task-list").append(add_new_task);
      modal.style.display = "none";
      drag_and_drop();
    } else {
    }
  });

  function form_validation() {
    var val = 0;
    $(".modalbox-with-form")
      .find(".validation")
      .each(function (element, index) {
        if ($(this).prop("required")) {
          if ($(this).val() === "") {
            $(this).css("border", "solid 1px red");
            val++;
          }
        }
      });

    if (val === 0) {
      return true;
    } else {
      return false;
    }
  }




  function current_date() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  //a simple date formatting function
  function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
  }

  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }










/*
const productForm = document.getElementById("productForm");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productsList = document.getElementById("products");
const btnEdit = document.getElementById("btn-edit");




let products = [];


productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newProduct = {
    name: productName.value,
    price: productPrice.value,
    description: productDescription.value,
  };

  const result = await main.createProduct(newProduct);
  console.log(result);
});



function renderProduct(products) {
  productsList.innerHTML = "";
  products.forEach((product) => {
    productsList.innerHTML += `
      <div class="card card-body my-2 animate__animated animate__fadeInLeft">
          <h4 id= "product-id">Product Id : ${product.id}</h4>
          <h4>${product.name}</h4>
          <p>${product.name}</p>
          <p>${product.name}</p>

           <p>
            <button id="btn-delete" class="btn btn-danger"> Delete </button> 
              <button id="btn-edit" class= "btn-edit btn btn-secondary"> Edit </button>
          </p>
          
          
      </div>
    `;
  });
}


function updateProductFunction() {
  console.log("edit button clicked");
}

const getProducts = async () => {
  products = await main.getProducts();
  renderProduct(products);
  console.log("all product store here: " + JSON.stringify(products));
};

async function init() {
  await getProducts();
}

init();
*/