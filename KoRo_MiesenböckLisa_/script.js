/********************************************************************************************
 * TITLE: DETAIL-LIST OF A PRODUCT
 * CREATOR: Lisa Miesenböck
 * DATE: 22.03.2021
 * DESCRIPTION: this is a prototype of an detail list for different products
 * By clicking on one product, a modal will be opened. The modal includes
 * different steps of the product (amount of steps depends on the category of the products).
 *
 * USED: Bootstrap and jQuery
 *******************************************************************************************/
$(document).ready(function() {


    //notice the id of the picture
    let id;
    //notice the description if the picture
    let description;

    /* When User clicks on one pic, an modal will be opened.
     * this modal contains the different steps of the product.
     * when reload the modal - the modal stays open
     */
    $(".col").on("click", function () {
        let modal = document.querySelector("#openModal");
        let span = document.querySelector(".close");

        //add the open modal to the sessionstorage
        sessionStorage.setItem("modal", "open");

        //notice the right headliner for the product
        let elem = $(this).find("p");
        console.log(elem);
        description = $(elem).html();

        //open the modal
        openModal(modal, span);

        //append the correct image to the modal
        id = $(this).attr("id");

        //put the modal to the sessionstorage - when reload the modal stays open
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("description", description);

        //set the image and the description to the modal
        modalImageDescription(id, description);
        
    });




    /*
     * when reloading, the modal stay open
     * Moreover, it prints out the correct headline and the
     * image of the product
     */
    let storage = sessionStorage.getItem("modal");
    if (storage) {
        if (storage === "open") {
            let modal = document.querySelector("#openModal");
            let span = document.querySelector(".close");
            openModal(modal, span);
            modalImageDescription(sessionStorage.getItem("id"), sessionStorage.getItem("description"));
        }
    }



});

/* this function add the correct
 * image and description to the modal */
function modalImageDescription(id, description) {

    //append headline
    $(".headerLine").html(description);

    //append the correct image to the modal
    let img = `<img src="assets/img_${id}.jpg" class="img-fluid Nachttisch" alt="Nachttisch">`;
    $(".col-4").append(img);


    //shows the steps of the product category
    if(description === "Schreibtisch"){
        $(".WohnzimmerAccordion").hide();
        $(".NachttischAccordion").hide();
    }

    else if (description==="Wohnzimmertisch")
        $(".WohnzimmerAccordion").show();

    else{
        $(".WohnzimmerAccordion").show();
        $(".NachttischAccordion").show();
    }

}

/* opens the modal
 * when closing the modal -- sessionstorage is cleared
 */
function openModal(modal, span){
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        $(".col-4").empty();
        sessionStorage.clear();
    };

}