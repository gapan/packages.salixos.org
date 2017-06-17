
class Action {

    constructor(screen, repoList) {
        this.screen = screen;
        this.repoList = repoList;
    }

    pkgSearch() {
        let terms = document.getElementById("search").value;
        let version = document.getElementById("search-ver").value;
        let arch = document.getElementById("search-arch").value;
        console.log("Searching for: " + terms);
        console.log("Version: " + version);
        console.log("Architecture: " + arch);
        this.screen.showSlide("slide-search-results");
        this.screen.scrollToId('screen-lower');
    }

    /* Executed when clicking the Browse button
    * on the main browse page */
    pkgBrowse() {
        this.screen.showSlide("slide-browse-repo");
    }

    /* Executed when selecting a repository
    * to browse */
    browseRepo() {
        console.log("hmnmm");
        for (let i = 0; i < this.repoList.length; i++) {
            console.log(this.repoList[i]);
        }
        this.screen.showSlide("slide-browse-location");
    }

    /* Executed when selecting a location
    * to browse */
    browseLocation() {
        this.screen.showSlide("slide-browse-package");
    }

    browsePkg(pkgname, pkgver, pkgrel) {
        let arch = document.getElementById("browse-arch").value;
        console.log("Browse package: " + pkgname + "-" + pkgver +
                        "-" + arch + "-" + pkgrel);
        this.screen.showSlide("slide-browse-details");
    }

    browseSearchedPkg(pkgname, pkgver, pkgrel) {
        let arch = document.getElementById("search-arch").value;
        console.log("Browse package: " + pkgname + "-" + pkgver +
                        "-" + arch + "-" + pkgrel);
        this.screen.showSlide("slide-search-details");
    }

    viewDep(dep) {
        console.log("Viewing dep: " + dep);
    }
}