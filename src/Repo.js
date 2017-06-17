
class Repo {

    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.ready = false;
        this.description = this.getDescription();
        this.data = null;
        this.getData(url);
    }

    getData(url) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        let that = this;
        xhr.addEventListener("readystatechange", function (ev) {
            if (xhr.readyState == 4) {
                if ( (xhr.status>=200 && xhr.status<300) || xhr.status===304 ) {
                    // Ορθή παραλαβή δεδομένων
                    console.log("Got data from " + url);
                    that.data = JSON.parse(xhr.responseText);
                    that.ready = true;
                } else {
                    // Εμφανίστηκε σφάλμα
                    // Πιθανή επεξεργασία μέσω των xhr.status και xhr.statusText
                    console.log("Error getting data from " + url);
                }
            }
        });
        xhr.send();   
    }

    getDescription() {
        let descriptions = {
            "Slackware" : "Official Slackware repository (with dependency information)",
            "Salix" : "Official Salix package repository",
            "Slackware-Extra" : "Extra Slackware package repository",
            "Extra" : "Extra Salix package repository"
        }
        return descriptions[this.name];
    }

    getPkg(name) {
        for (let i = 0; i < this.data.packages.length; i++) {
            let pkg = this.data.packages[i];
            if (pkg.name === name) {
                return pkg;
            }
        }
        return null;
    }
}
