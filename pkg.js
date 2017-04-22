var pkgSearch = function() {
    terms = document.getElementById("search").value;
    version = document.getElementById("search-ver").value;
    arch = document.getElementById("search-arch").value;
    console.log("Searching for: " + terms);
    console.log("Version: " + version);
    console.log("Architecture: " + arch);
    showSlide("slide-search-results");
    scrollToId('screen-lower');
}

/* Executed when clicking the Browse button
 * on the main browse page */
var pkgBrowse = function() {
    showSlide("slide-browse-repo");
}

/* Executed when selecting a repository
 * to browse */
var browseRepo = function() {
    showSlide("slide-browse-location");
}

/* Executed when selecting a location
 * to browse */
var browseLocation = function() {
    showSlide("slide-browse-package");
}

var browsePkg = function(pkgname, pkgver, pkgrel) {
    arch = document.getElementById("browse-arch").value;
    console.log("Browse package: " + pkgname + "-" + pkgver +
                    "-" + arch + "-" + pkgrel);
    showSlide("slide-browse-details");
}

var browseSearchedPkg = function(pkgname, pkgver, pkgrel) {
    arch = document.getElementById("search-arch").value;
    console.log("Browse package: " + pkgname + "-" + pkgver +
                    "-" + arch + "-" + pkgrel);
    showSlide("slide-search-details");
}

var viewDep = function(dep) {
    console.log("Viewing dep: " + dep);
}

var showSlide = function(slide) {
    var slides = document.getElementsByClassName("slide");
    // first hide all slides
    for (var i = 0; i < slides.length; i++)
        document.getElementById(slides[i].id).setAttribute("style", "display: none");
    // then show the one we want
    document.getElementById(slide).setAttribute("style", "display: block");
    scrollToId(slide);
}

var scrollToId = function(elem) {
    // smoothing scrolling only works in firefox
    document.getElementById(elem).scrollIntoView({block: "start", behavior: "smooth"});
}

/*
 * When scrolling to the top screen, first make sure the search box is
 * empty, focus it and finally scroll to the top.
 */
var scrollUp = function() {
    document.getElementById("search").value = "";
    document.getElementById("search").focus();
    scrollToId("screen-upper");
}

/*
 * Catch the user pressing enter on the search box and act as
 * if the "Search" button was pressed instead. This way the form
 * won't reload and the screen won't scroll back up to the top.
 */
document.getElementById("search").onkeypress=function(e){
    if(e.keyCode==13){
        document.getElementById('submit').click();
        return false;
    }
    return true;
}
