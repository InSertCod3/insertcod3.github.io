function fadeloader() {
    $("#preloader").fadeOut("slow");
    $(".wrapper").removeClass("loading").delay(1100);
}
$(window).on("load", function () {
    window.setTimeout("fadeloader();", 1100)
});