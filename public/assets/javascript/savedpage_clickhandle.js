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
    // `Article Notes` button clicked --> Under construction !!
    $(".notes").on("click", function (event) {
        // checking clicked article's _id
        var currentArticle = $(this).parents(".card").data();
        console.log(currentArticle._id);

        // This Note feature is under construction !!
        alert("NOTE feature is under construction. Article's _id verified." + "\n" +
            "-----------------------------------------------------------" +
            "\n" + "Notes For Article: " + currentArticle._id + "\n\n" +
            "No notes for this article yet." + "\n\n" + "New Note" + "\n\n" +
            "[SAVE NOTE]");
    });
});