$(document).ready(function () {
    // Scrape button clicked
    $(".scrapeArticle").on("click", function (event) {
        $.get("/scrape").then(function (data) {
            console.log(data);
            window.location.href = "/";
        });
    });

});