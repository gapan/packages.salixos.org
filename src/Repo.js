
class Repo {

    constructor(url) {
        this.url = url;
        this.ready = false;
        this.getData(url);
    }

    getData(url) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.addEventListener("readystatechange", function (ev) {
            if (xhr.readyState == 4) {
                if ( (xhr.status>=200 && xhr.status<300) || xhr.status===304 ) {
                    // Ορθή παραλαβή δεδομένων
                    console.log("got data from " + url);
                    this.data = xhr.responseText;
                    this.ready = true;
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
