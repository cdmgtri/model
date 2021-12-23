
/**
 * Show the "Top of page" button at the bottom of the page if the user has scrolled down
 */
$(function () {
  $("#scrollTop").hide();
  $(window).on("scroll", function() {
    $("#scrollTop").toggle(window.scrollY > 0);
  });
});

/**
 * Add an event handler to all elements with a "copy" class to copy text to the clipboard on click.
 */
$(function () {
  // Add a new copy button to each code block
  $(".copy").each( function() {

    let selected = $(this);

    selected.on("click", function() {
      // Copy text to clipboard
      navigator.clipboard.writeText(selected.text());

      // Provide temporary visual cue that the text has been copied
      selected.css("cursor", "grabbing");

      // Restore original style after a short amount of time
      setTimeout( function() {
        selected.css("cursor", "grab");
        // @ts-ignore
        selected.popover("hide");
      }, 300)
    })
  });
});

/**
 * Enable popovers
 */
$(function () {
  // @ts-ignore
  $('[data-toggle="popover"]').popover()
})
