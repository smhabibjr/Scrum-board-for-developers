const { remote, Notification } = require("electron");
const main = remote.require("./main");

$(document).ready(function () {
  $("#sidebar").toggleClass("active");
  $("#sidebarCollapse").on("click", function () {
    $("#collapsible-icon").toggleClass("fa-bars fa-times");
    $("#sidebar").toggleClass("active");
  });


  


  // grab the modal box
  var modal = document.querySelector("#modalbox-with-form");
  var btn_open_modal_box = document.querySelector("#add-new-task");
  var btn_modalbox_close = document.querySelector("#btn-modalbox-close");

  $(".drag-and-sortable").sortable({
    connectWith: ".drag-and-sortable",
    cursor: "grabbing",
    stop: function (event, ui) {
      const task_id = $(ui.item).find("#task_id").val();
      const task_stage = $(ui.item).closest(".drag-and-sortable").attr("id");
      const find_stage = $(ui.item).find("#stage").val(task_stage);
      main.update_task_stage(task_id, task_stage);
      update_list_children();
    },
  });

  //drag_and_drop();
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

  $("#btn-add-new-iteam").click(async function () {
    var new_task_data = {
      task_category: $("#task-category").val(),
      task_name: $("#task-name").val(),
      assigned_date: new Date().toLocaleDateString("de-DE"),
      submit_date: $("#date").val(),
      employee: $("#task-user").val(),
      stage: $("#stage").val(),
    };

    var { task_category, task_name, assigned_date, submit_date, employee } =
      new_task_data;

    var due_days = getNumberOfDays(
      current_date(),
      dateFormat(submit_date, "MM/dd/yyyy")
    );

    if (form_validation()) {
      var add_new_task = $(".clone-new-task")
        .clone()
        .removeClass("clone-new-task d-none");
      add_new_task.find("#task-category-name").text(task_category);
      add_new_task.find(".single-task-name").text(task_name);
      add_new_task
        .find(".task-assigned-date")
        .text("Assigned : " + assigned_date);
      add_new_task
        .find(".task-submit-date")
        .text("Submit : " + dateFormat(submit_date, "dd.MM.yyyy"));
      add_new_task.find("#task-user-name").text(employee);
      add_new_task.find(".task-due-date").text("Due " + due_days + " days");

      new_task_data["submit_date"] = dateFormat(submit_date, "dd.MM.yyyy");
      new_task_data["due_days"] = due_days;

      const result = await main.create_new_task(new_task_data);
      if (result.id) {
        add_new_task.find("#task_id").val(result.id);
        $("#in-todo-list").append(add_new_task);
      } else {
        alert("Someting went wrong!");
      }
      modal.style.display = "none";
    } else {
    }
  });

  function render_todo_task(get_todo_list) {
    if (get_todo_list.length > 0) {
      get_todo_list.forEach((task) => {
        var add_new_task = $(".clone-new-task")
          .clone()
          .removeClass("clone-new-task d-none");
        add_new_task.find("#task-category-name").text(task.task_category);
        add_new_task.find(".single-task-name").text(task.task_name);
        add_new_task
          .find(".task-assigned-date")
          .text("Assigned : " + task.assigned_date);
        add_new_task
          .find(".task-submit-date")
          .text("Submit : " + task.submit_date);
        add_new_task.find("#task-user-name").text(task.employee);
        add_new_task
          .find(".task-due-date")
          .text("Due " + task.due_days + " days");
        add_new_task.find("#stage").val(task.stage);
        add_new_task.find("#task_id").val(task.id);
        $("#in-todo-list").append(add_new_task);
      });
    }
  }

  function render_progress_task(get_progress_list) {
    if (get_progress_list.length > 0) {
      get_progress_list.forEach((task) => {
        var add_new_task = $(".clone-new-task")
          .clone()
          .removeClass("clone-new-task d-none");
        add_new_task.find("#task-category-name").text(task.task_category);
        add_new_task.find(".single-task-name").text(task.task_name);
        add_new_task
          .find(".task-assigned-date")
          .text("Assigned : " + task.assigned_date);
        add_new_task
          .find(".task-submit-date")
          .text("Submit : " + task.submit_date);
        add_new_task.find("#task-user-name").text(task.employee);
        add_new_task
          .find(".task-due-date")
          .text("Due " + task.due_days + " days");
        add_new_task.find("#stage").val(task.stage);
        add_new_task.find("#task_id").val(task.id);
        $("#in-progress-list").append(add_new_task);
      });
    }
  }

  function render_review_task(get_preview_list) {
    if (get_preview_list.length > 0) {
      get_preview_list.forEach((task) => {
        var add_new_task = $(".clone-new-task")
          .clone()
          .removeClass("clone-new-task d-none");
        add_new_task.find("#task-category-name").text(task.task_category);
        add_new_task.find(".single-task-name").text(task.task_name);
        add_new_task
          .find(".task-assigned-date")
          .text("Assigned : " + task.assigned_date);
        add_new_task
          .find(".task-submit-date")
          .text("Submit : " + task.submit_date);
        add_new_task.find("#task-user-name").text(task.employee);
        add_new_task
          .find(".task-due-date")
          .text("Due " + task.due_days + " days");
        add_new_task.find("#stage").val(task.stage);
        add_new_task.find("#task_id").val(task.id);
        $("#in-review-list").append(add_new_task);
      });
    }
  }

  function render_done_task(get_done_list) {
    if (get_done_list.length > 0) {
      get_done_list.forEach((task) => {
        var add_new_task = $(".clone-new-task")
          .clone()
          .removeClass("clone-new-task d-none");
        add_new_task.find("#task-category-name").text(task.task_category);
        add_new_task.find(".single-task-name").text(task.task_name);
        add_new_task
          .find(".task-assigned-date")
          .text("Assigned : " + task.assigned_date);
        add_new_task
          .find(".task-submit-date")
          .text("Submit : " + task.submit_date);
        add_new_task.find("#task-user-name").text(task.employee);
        add_new_task
          .find(".task-due-date")
          .text("Due " + task.due_days + " days");
        add_new_task.find("#stage").val(task.stage);
        add_new_task.find("#task_id").val(task.id);
        $("#in-done-list").append(add_new_task);
      });
    }
  }

  async function init() {
    const get_todo_list = await main.get_todo_tasks();
    const get_progress_list = await main.get_progress_tasks();
    const get_review_list = await main.get_review_tasks();
    const get_done_list = await main.get_done_tasks();
    render_todo_task(get_todo_list);
    render_progress_task(get_progress_list);
    render_review_task(get_review_list);
    render_done_task(get_done_list);

    update_list_children();

    

  }
  init();
});


function update_list_children() {
  $(".drag-and-sortable").each(function () {
    const children_ = $(this).children(".single-task").length;
    $(this).closest(".card").find(".has-children").text(children_);
  });
}

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
