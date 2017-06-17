
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
    browseRepoList() {
        let repoListElm = document.getElementById("repo-list");
        let version = document.getElementById("browse-ver").value;
        let arch = document.getElementById("browse-arch").value;
        // populate the repository list
        let iHTML = "";
        for (let i = 0; i < this.repoList.repos.length; i++) {
            let repo = this.repoList.repos[i];
            iHTML += "<div class=\"item\" onclick=\"spkg.action.browseRepo('"
            iHTML += repo.name + "','" + version + "','" + arch;
            iHTML += "')\">";
            iHTML += "<p class=\"name\">" + repo.name + "</p>";
            iHTML += "<p class=\"description\">";
            iHTML += repo.description;
            iHTML += "</p></div>";
        }
        repoListElm.innerHTML = iHTML;
        this.screen.showSlide("slide-browse-repo");
    }

    /* Executed when selecting a repository
    * to browse */
    browseRepo(name, version, arch) {
        let locationItems = document.getElementById("slide-browse-location-items");
        // populate the location list
        let iHTML = "";
        for (let i = 0; i < this.repoList.repos.length; i++) {
            console.log(this.repoList.repos[i]);
        }
        locationItems.innerHTML = iHTML;
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