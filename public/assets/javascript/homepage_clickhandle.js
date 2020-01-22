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
    // `Save Article` button clicked
    $(".saveBtn").on("click", function (event) {
        // This article will be saved after clicking event
        var saveThisArticle = $(this).parents(".card").data();
        // Remove saved article card from current homepage
        $(this).parents(".card").remove();
        saveThisArticle.articleSaved = true;
        console.log(saveThisArticle);
        $.ajax({
            method: "PUT",
            url: "/jsonDB/" + saveThisArticle._id,
            data: saveThisArticle
        }).then(function (data) {
            console.log(data);
            location.reload();
        });
    });
});