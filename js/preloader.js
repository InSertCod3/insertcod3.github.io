function fadeloader() {
    $("#preloader").fadeOut("slow");
    $(".wrapper").removeClass("loading").delay(100);
}
$(window).on("load", function () {
    window.setTimeout("fadeloader();", 500)
});