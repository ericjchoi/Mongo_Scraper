$(document).ready(function () {
    // `Clear Articles` button clicked
    $(".clear").on("click", function (event) {
        $.get("/clear").then(function (data) {
            $(".article-container").empty();
            location.reload();
        });
    });
    // `Delete From Saved` button clicked
    $(".delete").on("click", function (event) {
        // This article will be deleted from saved page after clicking event
        var deleteThisArticle = $(this).parents(".card").data();
        // Remove saved article card from savedpage
        $(this).parents(".card").remove();
        console.log(deleteThisArticle);
        $.ajax({
            method: "DELETE",
            url: "/jsonDB/" + deleteThisArticle._id
        }).then(function (data) {
            console.log(data);
            window.location.href = "/savedpage";
        });
    });










});