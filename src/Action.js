
class Action {

    constructor(screen, repoList) {
        this.screen = screen;
        this.repoList = repoList;
    }

    pkgSearch() {
        let searchResults = document.getElementById("slide-search-results-items");
        let terms = document.getElementById("search").value.toLowerCase().split(' ');
        let version = document.getElementById("search-ver").value;
        let arch = document.getElementById("search-arch").value;
        console.log("Searching for: " + terms);
        console.log("Version: " + version);
        console.log("Architecture: " + arch);
        // get a list of packages that match the search terms
        let packageList = [];
        for (let i = 0; i < this.repoList.repos.length; i++) {
            let repo = this.repoList.repos[i];
            for (let j = 0; j < repo.data.packages.length; j++) {
                let pkg = repo.data.packages[j];
                for (let term of terms) {
                    if(pkg.name.toLowerCase().indexOf(term) >= 0 ||
                        pkg.descs.toLowerCase().indexOf(term) >= 0 ||
                        pkg.descl.toLowerCase().indexOf(term) >= 0) {
                            pkg.reponame = repo.name;
                            packageList.push(pkg);
                    }
                }
            }
        }
        // sort packageList by package name
        packageList.sort(function(a,b) {return a.name > b.name;});
        // populate the search list in the DOM
        let iHTML = "";
        for (let i = 0; i < packageList.length; i++) {
            let pkg = packageList[i];
            iHTML += '<div class="item"';
            iHTML += "onclick=\"spkg.action.browseSearchedPkg('"
            iHTML += pkg.loc + "','" + pkg.reponame + "','" + version +  "','"  + arch;
            iHTML += "','" + pkg.name + "','" + pkg.ver + "','" + pkg.rel;
            iHTML += "')\"><div>";
            iHTML += '<p class="name">' + pkg.name + '</p>';
            iHTML += '<p class="version">' + pkg.ver + '</p>';
            iHTML += '<p class="release">' + pkg.rel + '</p>';
            iHTML += '</div><p class="description">';
            iHTML += pkg.descs;
            iHTML += '</p></div>';
        }
        searchResults.innerHTML = iHTML;
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

    browsePkg(loc, reponame, version, arch, pkgname, pkgver, pkgrel) {
        let pkgDetails = document.getElementById("slide-browse-details-item");
        // populate the package details in the DOM
        pkgDetails.innerHTML = this.getPkgInnerHTML(loc, reponame, version,
                                arch, pkgname, pkgver, pkgrel);
        this.screen.showSlide("slide-browse-details");
    }


    browseSearchedPkg(loc, reponame, version, arch, pkgname, pkgver, pkgrel) {
        let pkgDetails = document.getElementById("slide-search-details-item");
        // populate the package details in the DOM
        pkgDetails.innerHTML = this.getPkgInnerHTML(loc, reponame, version,
                                arch, pkgname, pkgver, pkgrel);
        this.screen.showSlide("slide-search-details");
    }

    getPkgInnerHTML(loc, reponame, version, arch, pkgname, pkgver, pkgrel) {
        let iHTML = "";
        for (let i = 0; i < this.repoList.repos.length; i++) {
            let repo = this.repoList.repos[i];
            if (repo.name === reponame) {
                for (let j = 0; j < repo.data.packages.length; j++) {
                    let pkg = repo.data.packages[j];
                    if (pkg.name === pkgname && pkg.ver === pkgver && pkg.rel === pkgrel) {
                        iHTML += '<div class="info"><h1>Name:</h1><p>';
                        iHTML += pkg.name + '</p></div>';
                        iHTML += '<div class="info"><h1>Version:</h1><p>';
                        iHTML += pkg.ver + '</p></div>';
                        iHTML += '<div class="info"><h1>Release:</h1><p>';
                        iHTML += pkg.rel + '</p></div>';
                        iHTML += '<div class="info"><h1>Repository:</h1><p>';
                        iHTML += reponame + " " + version + " (" + arch + ")</p></div>";
                        iHTML += '<div class="info"><h1>Location:</h1><p>';
                        iHTML += pkg.loc + '</p></div>';
                        iHTML += '<div class="info"><h1>Package Size:</h1><p>';
                        iHTML += pkg.sizec + '</p></div>';
                        iHTML += '<div class="info"><h1>Installed Size:</h1><p>';
                        iHTML += pkg.sizeu + '</p></div>';
                        iHTML += '<div class="info"><h1>Description:</h1>';
                        iHTML += '<div class="text"><p>';
                        iHTML += pkg.descs + '</p><p>';
                        iHTML += pkg.descl + '</p></div></div>';
                        // show deps only if there are any
                        if (pkg.deps) {
                            iHTML += '<div class="info"><h1>Dependencies:</h1><p>';
                            for (let k = 0; k < pkg.deps.length; k++) {
                                let dep = pkg.deps[k];
                                if (dep instanceof Array) {
                                    iHTML += '[ ';
                                    for (let l = 0; l < dep.length; l++) {
                                        iHTML += '<a href="javascript:void(0)"'
                                        iHTML += 'onclick="spkg.action.viewDep(this.innerHTML)">';
                                        iHTML += dep[l] + '</a> ';
                                    }
                                    iHTML += '] ';
                                } else {
                                    iHTML += '<a href="javascript:void(0)"';
                                    iHTML += 'onclick="spkg.action.viewDep(this.innerHTML)">';
                                    iHTML += dep + '</a> ';
                                }
                            }
                            iHTML += "</p></div>";
                        }
                        if (pkg.sug) {
                            iHTML += '<div class="info"><h1>Suggests:</h1><p>';
                            for (let k = 0; k < pkg.sug.length; k++) {
                                let sug = pkg.sug[k];
                                iHTML += '<a href="javascript:void(0)"';
                                iHTML += 'onclick="spkg.action.viewDep(this.innerHTML)">';
                                iHTML += sug + '</a> ';
                            }
                            iHTML += "</p></div>";
                        }
                        if (pkg.con) {
                            iHTML += '<div class="info"><h1>Conflicts:</h1><p>';
                            for (let k = 0; k < pkg.con.length; k++) {
                                let con = pkg.con[k];
                                iHTML += '<a href="javascript:void(0)"';
                                iHTML += 'onclick="spkg.action.viewDep(this.innerHTML)">';
                                iHTML += con + '</a> ';
                            }
                            iHTML += "</p></div>";
                        }
                        break;
                    }
                }
                break;
            }
        }
        return iHTML;
    }

    viewDep(dep) {
        console.log("Viewing dep: " + dep);
    }
}