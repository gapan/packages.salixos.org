
let spkg = {};

spkg.repoList = new RepoList(
    document.getElementById("search-ver").value,
    document.getElementById("search-arch").value);
spkg.repoManager = new RepoManager();
spkg.screen = new Screen();
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

// browser back button moves the screen to the top part
spkg.screen.noBackButton(window);
