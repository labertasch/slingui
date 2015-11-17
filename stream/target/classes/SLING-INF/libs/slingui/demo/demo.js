$(function() {

    /*
    if($("*[data-sling-ui]")) {
       // data-sling-ui-bind
        var url = SlingUI.URL.decompose(location.href);
        console.log("sling-ui app");
        console.log("resource path is: " + url.resourcePath);
    }


    */

    var slingUI = new SlingUI();
    var source   = $("#header-template").html();
    var template = Handlebars.compile(source);
    console.log("test");
    slingUI.request.getResource().then( function (resource) {
        $("#header").html(template(resource));
    });

    console.log( "ready!" );
});