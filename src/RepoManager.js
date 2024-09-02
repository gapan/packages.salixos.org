// vim:et:sta:sts=4:sw=4:ts=8:tw=79:

/*
 * The RepoManager class is used to (surpise!) manage the repositories data.
 * It syncs changes made in the select elements for version and arch and
 * creates new repositories if needed.
 * Once a repository is created, it stores it in memory for future use. In
 * that way, if the user wants to switch back to it during the same
 * session, the data won't have to be downloaded twice.
 */

class RepoManager {

    constructor() {
        // read the version and arch from localStorage if it's there
        let version = localStorage.getItem("version");
        if (!version) {
            version = document.getElementById("search-ver").value;
            localStorage.setItem("version", version);
        } else {
            document.getElementById("search-ver").value = version;
        }
        let arch = localStorage.getItem("arch");
        if (!arch) {
            arch = document.getElementById("search-arch").value;
            localStorage.setItem("arch", arch);
        } else {
            document.getElementById("search-arch").value = arch;
        }
        this.repoStore = {};
        spkg.repoList = new RepoList(version, arch);
        // let's store the repo data in memory so we don't retrieve them
        // every time another repo is selected.
        this.repoStore[version + arch] = spkg.repoList;
    }

    setRepoFromSearchPage() {
        let version = document.getElementById("search-ver").value;
        let arch = document.getElementById("search-arch").value;
        localStorage.setItem("version", version);
        localStorage.setItem("arch", arch);
        this.syncRepoSelections(version, arch);
    }

    syncRepoSelections(version, arch) {
        // only create a new RepoList if it's not in memory
        if (!this.repoStore[version + arch]) {
            this.repoStore[version + arch] = new RepoList(version, arch);
        }
        spkg.repoList = this.repoStore[version + arch];
        // when we switch repos, move the lower screen to the main browse repo page
        spkg.screen.showSlide("slide-browse-repo");
    }
}
