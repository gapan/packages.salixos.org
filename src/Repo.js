
class Repo {

    constructor(version, arch) {
        this.version = version;
        this.arch = arch;
        this.mirror = "http://download.salixos.org/";
        this.data = null;
        this.getInfo();
    }

    getData() {
        let url = this.mirror + this.arch + "/" + this.version + "/PACKAGES.json"; 
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.addEventListener("readystatechange", function (ev) {
            if (xhr.readyState == 4) {
                if ( (xhr.status>=200 && xhr.status<300) || xhr.status===304 ) {
                    // Ορθή παραλαβή δεδομένων
                    console.log("got data from " + url);
                    this.data = xhr.responseText;
                } else {
                    // Εμφανίστηκε σφάλμα
                    // Πιθανή επεξεργασία μέσω των xhr.status και xhr.statusText
                    console.log("Error getting file.");
                }
            }
        });
        xhr.send();   
    }
}
