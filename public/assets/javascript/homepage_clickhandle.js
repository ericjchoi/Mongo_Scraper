$(document).ready(function () {
    // `Scrape New Articles` button clicked
    $(".scrapeArticle").on("click", function (event) {
        $.get("/scrape").then(function (data) {
            console.log(data);
            window.location.href = "/";
        });
    });
    // `Clear Articles` button clicked
    $(".clear").on("click", function (event) {
        $.get("/clear").then(function (data) {
            $(".article-container").empty();
            location.reload();
        });
    });

});