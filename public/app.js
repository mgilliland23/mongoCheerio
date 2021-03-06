$(document).ready(function() {
  $("li.active").removeClass("active");
  $('a[href="' + location.pathname + '"]')
    .closest("li")
    .addClass("active");
});

$(".save").on("click", function(e) {
  e.preventDefault();

  var thisId = $(this).attr("data-id");
  console.log("id: ", thisId);

  $.ajax({
    method: "POST",
    url: "/articles/add",
    data: {
      id: thisId
    }
  }).then(function(data) {
    // Log the response
    console.log(data);
  });
});

$("#scrape").on("click", function(e) {
  e.preventDefault();

  $.ajax({
    method: "Get",
    url: "/scrape"
  }).then(function(data) {
    // Log the response
    location.reload();
    console.log(data);
  });
});

$(".remove").on("click", function(e) {
  e.preventDefault();

  var thisId = $(this).attr("data-id");
  console.log("id: ", thisId);

  $.ajax({
    method: "POST",
    url: "/articles/remove",
    data: {
      id: thisId
    }
  }).then(function(data) {
    // Log the response
    console.log(data);
  });

  $(this)
    .closest("li")
    .remove();
});
