
/*
 * The RepoList class is used to gather all the repositories that are used for
 * each version/architecture combination into a single entity.
 */

class RepoList {

    constructor(version, arch) {
        this.version = version;
        this.arch = arch;
        this.mirror = "https://download.salixos.org/";
        this.repoNames = ["Salix", "Slackware", "Slackware-Extra"];
        // only 14.2 has the Extra repo
        if (this.version >= 14.2) {
            this.repoNames.push("Extra");
        }
        this.repos = [];
        for (let i = 0; i < this.repoNames.length; i++) {
            let repoName = this.repoNames[i];
            this.repos.push(new Repo(repoName, this.getURL(repoName)));
        }
    }

    getURL(repo) {
        let url = this.mirror + this.arch + "/";
        if (repo === "Salix") {
            url += this.version;
        } else if (repo === "Slackware") {
            url += "slackware-" + this.version; 
        } else if (repo === "Slackware-Extra") {
            url += "slackware-" + this.version + "/extra";
        } else if (repo === "Extra") {
            url += "extra-" + this.version;
        }
        url += "/PACKAGES.json";
        return url;
    }

    isReady() {
        let n = 0;
        for (let i = 0; i < this.repos.length; i++) {
            let repo = this.repos[i];
            if (repo.ready) {
                n++;
            }
        }
        if (n === this.repos.length) {
            return true;
        } else {
            return false;
        }
    }

    getRepo(name) {
        for (let i = 0; i < this.repos.length; i++) {
            let repo = this.repos[i];
            if (repo.name === name) {
                return repo;
            }
        }
        return null;
    }
}
