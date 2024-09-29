$(function () {
    function cleanup_formstack_css_classes() {
        /*
         * Attempting to cleanup Formstack styling post-load
         */

        $('form.fsForm').each(function () {
            var $this = $(this),
                fsparent = $this.parent();

            if (!fsparent.hasClass('fsBody')) {
                $this.insertBefore(fsparent);
                fsparent.remove();
            }
        });

        $('.fsBody table tr td, .fsBody table tr th').each((i, el) => {
            $(el)
                .toggleClass('column', false)
                .toggleClass('row', false);
        });
    }

    var loops = 0, limit = 50, timelimit = 75
    timer = setTimeout(function attempt_form_stack() {
        /*
         * Wait until the fsBody is loaded, or ~4 seconds have passed to not waste valuable event loop time
         */

        if ($('.fsBody').length > 0) {
            cleanup_formstack_css_classes();
        } else if (loops < limit) {
            timer = setTimeout(attempt_form_stack, timelimit);
        }
        loops = loops + 1;
    }, timelimit);
});

document.addEventListener("DOMContentLoaded", function () {
    const pageFooter = document.querySelector("footer.symplexi");
    const stickyFooter = document.querySelector(".page-footer__outside");

    if (pageFooter && stickyFooter) {
        const rect = stickyFooter.getBoundingClientRect();
        pageFooter.style.marginBottom = (rect.height + 72) + "px";
    }
})

document.addEventListener("DOMContentLoaded", function (e) {
    var siteFooterContent = document.querySelector("#site-footer");
    siteFooterContent.innerHTML = siteFooterContent.innerHTML.replace("{{year}}", moment().format("YYYY"));
});