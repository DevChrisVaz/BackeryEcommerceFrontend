'use strict';

(function ($) {
    setTimeout(() => {
        $('#commentModal').modal("show");
    }, 5000);

    $("#open-second-modal").on("click", function() {
        $("#commentModal").modal("hide");
        setTimeout(() => {
            $("#secondCommentModal").modal("show");
        }, 500);
    });

    $("#open-third-modal").on("click", function() {
        $("#secondCommentModal").modal("hide");
        setTimeout(() => {
            $("#thirdCommentModal").modal("show");
        }, 500);
    });

    $("#open-fourth-modal").on("click", function() {
        $("#thirdCommentModal").modal("hide");
        setTimeout(() => {
            $("#fourthCommentModal").modal("show");
        }, 500);
    });

    $("#open-fifth-modal").on("click", function() {
        $("#fourthCommentModal").modal("hide");
        setTimeout(() => {
            $("#fifthCommentModal").modal("show");
        }, 500);
    });

    $("#open-sixth-modal").on("click", function() {
        $("#fifthCommentModal").modal("hide");
        setTimeout(() => {
            $("#sixthCommentModal").modal("show");
        }, 500);
    });

    $("#close-comment-modal").on("click", function() {
        $("#sixthCommentModal").modal("hide");
    });
})(jQuery);