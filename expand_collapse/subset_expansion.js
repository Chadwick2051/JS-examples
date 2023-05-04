$(document).ready(() => {
    $("#jdom a").click(function(){
        event.preventDefault()
        const a = event.currentTarget;
        $(a).text('Show less');
        $(a).prev().toggleClass("hide")

        if ($(a).prev().hasClass('hide')) {
            $(a).text('Show more');
        }
    })
})