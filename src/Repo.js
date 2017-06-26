
/*
 * The Repo class represents a single repository and the data it contains.
 * The data is retrieved from the respective url in JSON format and stored in
 * the this.data object. The data itself includes a package object, which is a
 * a list of objects of software packages and their details, and also a
 * locations object, which includes information about package locations used
 * in this repository.
 */

class Repo {

    constructor(name, url, version, arch) {
        this.name = name;
        this.url = url;
        this.version = version;
        this.arch = arch;
        this.ready = false;
        this.description = this.getDescription();
        this.data = null;
        this.getData();
    }

    getData() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        let that = this;
        xhr.addEventListener("readystatechange", function (ev) {
            if (xhr.readyState == 4) {
                if ( (xhr.status>=200 && xhr.status<300) || xhr.status===304 ) {
                    // Data received succesfully
                    console.log("Got data from " + that.url);
                    that.data = JSON.parse(xhr.responseText);
                    that.ready = true;
                    spkg.screen.updateProgressBar(that.version, that.arch);
                } else {
                    // Oops. There was an error getting the data.
                    console.log("Error getting data from " + that.url);
                    document.getElementById("search").placeholder =
                        "Error retrieving data. Try reloading the page. :(";
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
        };
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
