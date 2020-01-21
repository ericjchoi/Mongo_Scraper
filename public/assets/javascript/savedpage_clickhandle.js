$(document).ready(function () {
    // `Clear Articles` button clicked
    $(".clear").on("click", function (event) {
        $.get("/clear").then(function (data) {
            $(".article-container").empty();
            location.reload();
        });
    });

});