
class Screen {

    scrollToId(elem) {
        // smoothing scrolling only works in firefox
        document.getElementById(elem).scrollIntoView({block: "start", behavior: "smooth"});
    }

    showSlide(slide) {
        let slides = document.getElementsByClassName("slide");
        // first hide all slides
        for (let i = 0; i < slides.length; i++)
            document.getElementById(slides[i].id).setAttribute("style", "display: none");
        // then show the one we want
        document.getElementById(slide).setAttribute("style", "display: block");
        this.scrollToId(slide);
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

    hideSpinner() {
        document.getElementById("spinner").setAttribute("style", "display: none");
        document.getElementById("content").setAttribute("style", "display: block");
    }

    showSpinner() {
        document.getElementById("spinner").setAttribute("style", "display: block");
        document.getElementById("content").setAttribute("style", "display: none");
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
                if (e.which === 8 && (elm !== 'input' && elm  !== 'textarea')) {
                    e.preventDefault();
                }
                // stopping event bubbling up the DOM tree..
                e.stopPropagation();
            };
        };
    }
}