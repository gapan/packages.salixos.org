
/*
 * The Screen class is used to manage movement between different slides in the
 * screen.
 */

class Screen {

    scrollToId(elem) {
        // smoothing scrolling only works in firefox
        document.getElementById(elem).scrollIntoView({block: "start", behavior: "smooth"});
    }

    showSlide(slide, scroll=true) {
        let slides = document.getElementsByClassName("slide");
        // first hide all slides
        for (let i = 0; i < slides.length; i++)
            document.getElementById(slides[i].id).setAttribute("style", "display: none");
        // then show the one we want
        document.getElementById(slide).setAttribute("style", "display: block");
        if (scroll) this.scrollToId(slide);
    }
    
    /*
    * When scrolling to the top screen, first make sure the search box is
    * empty, focus it and finally scroll to the top.
    */
    scrollUp() {
        document.getElementById("search").value = "";
        document.getElementById("search").focus();
        this.scrollToId("screen-upper");
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

    noBackButton(win) {
        if(typeof (win) === "undefined") {
            throw new Error("window is undefined");
        }

        var _hash = "!";
        var noBackPlease = function () {

            // making sure we have the fruit available for juice (^__^)
            win.setTimeout(function () {
                win.location.href += "#";
            }, 50);
        };

        win.onhashchange = function () {
            if (win.location.hash !== _hash) {
                win.location.hash = _hash;
            }
        };

        win.onload = function () {
            noBackPlease();

            // disables backspace on page except on input fields and textarea..
            document.body.onkeydown = function (e) {
                var elm = e.target.nodeName.toLowerCase();
                if (e.which === 8 && (elm !== "input" && elm  !== "textarea")) {
                    e.preventDefault();
                }
                // stopping event bubbling up the DOM tree..
                e.stopPropagation();
            };
        };
    }
}