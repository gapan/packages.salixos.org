var pkgSearch = function() {
    terms = document.getElementById("search").value;
    version = document.getElementById("ver").value;
    arch = document.getElementById("arch").value;
    console.log("Searching for: " + terms);
    console.log("Version: " + version);
    console.log("Architecture: " + arch);
}

/* Executed when clicking the Browse button
 * on the main browse page */
var pkgBrowse = function() {
    let fout = document.getElementById("slide-browse-main");
    let fin = document.getElementById("slide-browse-repo");
    fout.setAttribute("style", "display: none");
    fin.setAttribute("style", "display: block");
}

var browseRepo = function() {
    console.log("Browse repo");
}

var browseLocation = function() {
    console.log("Browse location");
}

var browsePkg = function(pkgname, pkgver, pkgrel) {
    arch = document.getElementById("search-arch").value;
    console.log("Browse package: " + pkgname + "-" + pkgver +
                    "-" + arch + "-" + pkgrel);
}

var viewDep = function(dep) {
    console.log("Viewing dep: " + dep);
}