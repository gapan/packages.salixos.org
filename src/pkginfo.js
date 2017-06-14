/*
salixpkg.pkginfo = (function() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://download.salixos.org/x86_64/14.2/PACKAGES.json");
    xhr.addEventListener("readystatechange", function (ev) {
        if (xhr.readyState == 4) {
            if ( (xhr.status>=200 && xhr.status<300) || xhr.status===304 ) {
                // Ορθή παραλαβή δεδομένων
                // Χρήση (π.χ.) του xhr.responseText για ανάγνωσή τους
                console.log("Got file.");
                console.log("File contents:");
                // console.log(xhr.responseText);
            } else {
                // Εμφανίστηκε σφάλμα
                // Πιθανή επεξεργασία μέσω των xhr.status και xhr.statusText
                console.log("Error getting file.");
            }
        }
    });
    xhr.send();   
})();


*/