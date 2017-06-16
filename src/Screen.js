
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

}