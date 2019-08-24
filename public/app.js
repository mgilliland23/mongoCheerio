$(document).ready(function() {
  $("li.active").removeClass("active");
  $('a[href="' + location.pathname + '"]')
    .closest("li")
    .addClass("active");
});

$(".save").on("click", function(e) {
  e.preventDefault();

  var thisId = $(this).attr("id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      id: thisId
    }
  }).then(function(data) {
    // Log the response
    console.log(data);
  });
});
