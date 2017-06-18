
/*
 * The RepoManager class is used to (surpise!) manage the repositories data.
 * It syncs changes made in the select elements for version and arch and
 * creates new repositories if needed.
 * Once a repository is created, it stores it in memory for future use. In
 * that way, if case the user wants to switch back to it during the same
 * session, the data won't have to be downloaded twice.
 */

class RepoManager {

    constructor() {
        let version = document.getElementById("search-ver").value;
        let arch = document.getElementById("search-arch").value;
        this.repoStore = {};
        spkg.repoList = new RepoList(version, arch);
        // let's store the repo data in memory so we don't retrieve them
        // every time another repo is selected.
        this.repoStore[version + arch] = spkg.repoList;
    }

    setRepoFromSearchPage() {
        let version = document.getElementById("search-ver").value;
        let arch = document.getElementById("search-arch").value;
        let otherVersion = document.getElementById("browse-ver");
        let otherArch = document.getElementById("browse-arch");
        this.syncRepoSelections(version, arch, otherVersion, otherArch);
    }

    setRepoFromBrowsePage() {
        let version = document.getElementById("browse-ver").value;
        let arch = document.getElementById("browse-arch").value;
        let otherVersion = document.getElementById("search-ver");
        let otherArch = document.getElementById("search-arch");
        this.syncRepoSelections(version, arch, otherVersion, otherArch);
    }

    syncRepoSelections(version, arch, otherVersionElm, otherArchElm) {
        for (let i = 0; i < otherVersionElm.options.length; i++) {
            if (otherVersionElm.options[i].innerHTML === version) {
                otherVersionElm.selectedIndex = i;
                break;
            }
        }
        for (let i = 0; i < otherArchElm.options.length; i++) {
            if (otherArchElm.options[i].innerHTML === arch) {
                otherArchElm.selectedIndex = i;
                break;
            }
        }
        // only create a new RepoList if it's not in memory
        if (!this.repoStore[version + arch]) {
            this.repoStore[version + arch] = new RepoList(version, arch);
        }
        spkg.repoList = this.repoStore[version + arch];
    }
}