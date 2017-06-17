class RepoManager {

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
            if (otherArchElm.options[i].innerHTML === version) {
                otherArchElm.selectedIndex = i;
                break;
            }
        }
        spkg.repoList = new RepoList(version, arch);
        spkg.action.updateRepoList(spkg.repoList);
    }
}