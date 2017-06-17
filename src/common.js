
let spkg = {};

// testing repo functionality
spkg.repoList = new RepoList(14.2, "x86_64");

spkg.screen = new Screen();
spkg.action = new Action(spkg.screen, spkg.repoList);

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
}
