
/*
 * This acts as an entry point for the web app, setting everything up.
 */

let spkg = {};

spkg.screen = new Screen();
spkg.repoManager = new RepoManager();
spkg.action = new Action();

/*
 * Catch the user pressing enter on the search box and act as
 * if the "Search" button was pressed instead. This way the form
 * won't reload and the screen won't scroll back up to the top.
 */
document.getElementById("search").onkeypress=function(e){
    if(e.keyCode==13){
        document.getElementById('submit').click();
        return false;
    }
    return true;
};

// add events
document.getElementById("submit").addEventListener("click", function() {
    spkg.action.pkgSearch();
});
document.getElementById("search-ver").addEventListener("change", function() {
    spkg.repoManager.setRepoFromSearchPage();
});
document.getElementById("search-arch").addEventListener("change", function() {
    spkg.repoManager.setRepoFromSearchPage();
});
document.getElementById("button-browse").addEventListener("click", function() {
    spkg.action.browseRepoList();
    spkg.screen.showSlide("slide-browse-repo");
    spkg.screen.showResultsScreen();
});
document.getElementById("button-go-to-search").addEventListener("click", function() {
    spkg.screen.showStartScreen();
});
document.getElementById("left-arrow-browse-location").addEventListener("click", function() {
    spkg.screen.showSlide("slide-browse-repo");
});
document.getElementById("left-arrow-browse-package").addEventListener("click", function() {
    spkg.screen.showSlide("slide-browse-location");
});
document.getElementById("left-arrow-browse-details").addEventListener("click", function() {
    spkg.screen.showSlide("slide-browse-package");
});
document.getElementById("left-arrow-search-details").addEventListener("click", function() {
    spkg.screen.showSlide("slide-search-results");
});
