
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
            let repo = this.repoList.repos[i];
            if (repo.name === name) {
                let keys = Object.keys(repo.data.locations);
                keys.sort();
                for (let j = 0; j < keys.length; j++) {
                    let loc = keys[j];
                    let description = repo.data.locations[loc];
                    iHTML += "<div class=\"item\" onclick=\"spkg.action.browseLocation('";
                    iHTML += loc + "','" + name + "','" + version +  "','"  + arch;
                    iHTML += "')\">";
                    iHTML += '<p class="name">';
                    iHTML += loc;
                    iHTML += "</p>";
                    iHTML += '<p class="description">';
                    iHTML += description;
                    iHTML += "</p></div>";
                }
                break;
            }
        }
        locationItems.innerHTML = iHTML;
        this.screen.showSlide("slide-browse-location");
    }

    /* Executed when selecting a location
    * to browse */
    browseLocation(loc, name, version, arch) {
        let packageItems = document.getElementById("slide-browse-package-items");
        // get a list of packages that are included in this location
        let packageList = [];
        for (let i = 0; i < this.repoList.repos.length; i++) {
            let repo = this.repoList.repos[i];
            if (repo.name === name) {
                for (let j = 0; j < repo.data.packages.length; j++) {
                    let pkg = repo.data.packages[j];
                    if (pkg.loc === loc) {
                        packageList.push(pkg);
                    }
                }
                console.log(repo.data.packages.length);
                break;
            }
        }
        // sort packageList by package name
        packageList.sort(function(a,b) {return a.name > b.name;});
        // populate the package list in the DOM
        let iHTML = "";
        for (let i = 0; i < packageList.length; i++) {
            let pkg = packageList[i];
            iHTML += '<div class="item"';
            iHTML += "onclick=\"spkg.action.browsePkg('"
            iHTML += loc + "','" + name + "','" + version +  "','"  + arch;
            iHTML += "','" + pkg.name + "','" + pkg.ver + "','" + pkg.rel;
            iHTML += "')\"><div>";
            iHTML += '<p class="name">' + pkg.name + '</p>';
            iHTML += '<p class="version">' + pkg.ver + '</p>';
            iHTML += '<p class="release">' + pkg.rel + '</p>';
            iHTML += '</div><p class="description">';
            iHTML += pkg.descs;
            iHTML += '</p></div>';
        }
        packageItems.innerHTML = iHTML;
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