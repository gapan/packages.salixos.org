var pkgSearch = function() {
    terms = document.getElementById("search").value;
    version = document.getElementById("ver").value;
    arch = document.getElementById("arch").value;
    console.log("Searching for: " + terms);
    console.log("Version: " + version);
    console.log("Architecture: " + arch);
}

var pkgBrowse = function() {
    console.log("Browsing");
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