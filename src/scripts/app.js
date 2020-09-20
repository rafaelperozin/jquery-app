$(function() {
    "use strict";

    // DOM elements #################################################
    // To keep the code organised and easy to maintain I usually add the DOM elements on the top of the file
    // I also use descriptive names that anyone can understand.
    var DOM = {
        user: {
            name: "#user-name",
            balance: "#gold-balance"
        },
        items: {
            container: "#stock"
        },
        actions: {
            open_order_modal: "[data-action=open-order-modal]",
            buy: "[data-order-role=buy]",
            qty_increment: ".order-items__qty-btn"
        }
    }


    // On load #################################################

    service.getUser()
        .then(function (user) {
            $(DOM.user.name).text(user.login);
            $(DOM.user.balance).text(user.balance);
        })
        .then(service.list)
        .then(function(items) {
            items.forEach(function (item) {
                $(DOM.items.container).append(item.name + ': ' + item.quantity + '<br/>');
            });
        });
    
    
    // Event listeners #################################################
    
    $(DOM.actions.open_order_modal).on('click', function(element) {
        element.preventDefault();
        order.printItemsList()
            .then(function () {
                order.printTotal();
            });
    });

    // this element is added after load, so the usual $(element).on('click') will not work
    $(document).on('click', DOM.actions.qty_increment, function (element) {
        element.preventDefault();
        order.qtyHandler(element);
    });

    $(DOM.actions.buy).on('click', function(element) {
        element.preventDefault();
        // Place an order
    });



    // Errors #########################################################
    /*
    .*
    .* To make it easier to debug large applications and save time if someone just remove an element.  
    .* It's in the end because will not stop the whole JS when finding an error.
    .* The error code it's to make the search easier. The APP is the file/module name, and the number is random.
    .* 
     */
    if ($(DOM.user.name).length == 0) throw new Error('APP01: The ' + DOM.user.name + ' is missing.');
    if ($(DOM.user.balance).length == 0) throw new Error('APP02: The ' + DOM.user.balance + ' is missing.');
    if ($(DOM.items.container).length == 0) throw new Error('APP03: The ' + DOM.items.container + ' is missing.');
    if ($(DOM.actions.open_order_modal).length == 0) throw new Error('APP04: The ' + DOM.actions.open_order_modal + ' is missing.');
    if ($(DOM.actions.buy).length == 0) throw new Error('APP05: The ' + DOM.actions.buy + ' is missing.');
});