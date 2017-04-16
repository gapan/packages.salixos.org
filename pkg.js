var pkgSearch = function() {
    terms = document.getElementById("search").value;
    version = document.getElementById("search-ver").value;
    arch = document.getElementById("search-arch").value;
    console.log("Searching for: " + terms);
    console.log("Version: " + version);
    console.log("Architecture: " + arch);

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
    arch = document.getElementById("search-arch").value;
    console.log("Browse package: " + pkgname + "-" + pkgver +
                    "-" + arch + "-" + pkgrel);
    showSlide("slide-details");
}

var viewDep = function(dep) {
    console.log("Viewing dep: " + dep);
}

var showSlide = function(slide) {
    let slides = document.getElementsByClassName("slide");
    // first hide all slides
    for (let i = 0; i < slides.length; i++)
        document.getElementById(slides[i].id).setAttribute("style", "display: none");
    // then show the one we want
    document.getElementById(slide).setAttribute("style", "display: block");
}
