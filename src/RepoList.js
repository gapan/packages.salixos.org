
class RepoList {

    constructor(version, arch) {
        this.version = version;
        this.arch = arch;
        this.mirror = "http://download.salixos.org/";
        this.repoNames = ["salix", "slackware", "slackware-extra"];
        // only 14.2 has the Extra repo
        if (this.version >= 14.2) {
            this.repoNames.push("extra");
        }
        this.repos = [];
        console.log("in RepoList constructor");
        for (let i = 0; i < this.repoNames.length; i++) {
            let repoName = this.repoNames[i];
            this.repos.push(new Repo(this.getURL(repoName)));
        }
    }

    getURL(repo) {
        let url = this.mirror + this.arch + "/";
        if (repo === "salix") {
            url += this.version;
        } else if (repo === "slackware") {
            url += "slackware-" + this.version; 
        } else if (repo === "slackware-extra") {
            url += "slackware-" + this.version + "/extra";
        } else if (repo === "extra") {
            url += "extra-" + this.version;
        }
        url += "/PACKAGES.json";
        return url;
    }

    getReady() {
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
}