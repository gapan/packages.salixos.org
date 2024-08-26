
/*
 * The Screen class is used to manage movement between different slides in the
 * screen.
 */

class Screen {

    showStartScreen() {
        document.getElementById("screen-upper").setAttribute("style", "display: flex");
        document.getElementById("screen-lower").setAttribute("style", "display: none");
    }

    showResultsScreen() {
        document.getElementById("screen-lower").setAttribute("style", "display: flex");
        document.getElementById("screen-upper").setAttribute("style", "display: none");
    }

    showSlide(slide) {
        let slides = document.getElementsByClassName("slide");
        // first hide all slides
        for (let i = 0; i < slides.length; i++)
            document.getElementById(slides[i].id).setAttribute("style", "display: none");
        // then show the one we want
        document.getElementById(slide).setAttribute("style", "display: block");
    }
    
    /*
    * When showing the search screen, first make sure the search box is
    * empty, focus it and finally scroll to the top.
    */
    clearSearchBox() {
        document.getElementById("search").value = "";
        document.getElementById("search").focus();
    }

    showSearchBoxMessage(msg) {
        document.getElementById("search").placeholder = msg;
        document.getElementById("search").style.fontWeight = "bold";
        // reset everything back to normal after 2 seconds
        setTimeout("document.getElementById('search').placeholder = 'Enter search term...';" +
                    "document.getElementById('search').style.fontWeight = 'normal';", 2000);
    }

    updateProgressBar(version, arch) {
        let currentVersion = spkg.repoList.version;
        let currentArch = spkg.repoList.arch;
        if (version === currentVersion && arch === currentArch) {
            if (spkg.repoList.isReady()) {
                this.hideProgressBar();
            } else {
                let progressbar1 = document.getElementById("searchprogress");
                let progressbar2 = document.getElementById("searchprogress");
                let totalRepos = spkg.repoList.repoNames.length;
                let readyRepos = spkg.repoList.getNumberOfReadyRepos();
                let width = Math.round(100 * readyRepos / totalRepos) + "%";
                progressbar1.style.width = width;
                progressbar2.style.width = width;
                document.querySelector("#searchprogressbox em").innerHTML = width;
                document.querySelector("#browseprogressbox em").innerHTML = width;
            }
        }
    }

    showProgressBar() {
        document.getElementById("searchprogressbox").style.display = "inline-flex";
        document.getElementById("searchbox").style.display = "none";
        document.getElementById("browseprogressbox").style.display = "block";
        document.getElementById("browsebtn").style.display = "none";
    }

    hideProgressBar() {
        document.getElementById("searchprogressbox").style.display = "none";
        document.getElementById("searchbox").style.display = "inline-flex";
        document.getElementById("browseprogressbox").style.display = "none";
        document.getElementById("browsebtn").style.display = "block";
        // when hiding the progress bar, set it back to the start
        document.querySelector("#searchprogressbox em").innerHTML = "0%";
        document.querySelector("#browseprogressbox em").innerHTML = "0%";
    }
}
