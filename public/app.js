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
    .parent()
    .remove();
});
