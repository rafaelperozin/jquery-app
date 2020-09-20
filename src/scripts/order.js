var order = (function () {
    "use strict";

    var DOM = {
        user: {
            balance: "#gold-balance"
        },
        items: {
            list: "[data-items-role=list]",
            item: "[data-role=item]",
            qty: "[data-qty=input]",
            price: "[data-role=item-price]"
        },
        order: {
            total: "[data-order-role=total-value]",
            footer: ".modal-footer",
            balance_warning: "[data-warning=balance]"
        },
        actions: {
            qty_button: ".order-items__qty-btn",
            buy: "[data-order-role=buy]"
        }
    };

    // I usually put all the warnings and errors messages in a separated JSON because it's easier to manage in the future.
    var balanceWarningElement = '<p data-warning="balance">Sorry, do you not have enough gold. <br><a href="#link-to-buy-gold">Buy more</a> or manage the items quantity.</p>';

    
    function generateList() {
        
        var itemList = [];

        return service.list()
            .then(function (items) {
                items.forEach(function (data) {
                    var newItem = new item(data);
                    itemList.push(newItem.newBlock);
                });
                return Promise.all(itemList);
            });
    }


    function printList() {

        $(DOM.items.list).empty();

        return generateList()
            .then(function (res) {
                res.forEach(function (item) {
                    $(DOM.items.list).append(item);
                });
            });
    }


    function itemsQtyHandler(element) {
        var clickedButton = $(element.target)[0].closest(DOM.actions.qty_button);
        var inputQty = $(clickedButton).siblings(DOM.items.qty)[0];
        var action = $(clickedButton).attr('data-qty');
        
        var inputValue = 0;
        var newQty = 0;
        var currentInputValue = $(inputQty)[0].value;
        var maxQty = parseInt($(inputQty)[0].attributes.max.nodeValue);
        if (currentInputValue != '') inputValue = parseInt(currentInputValue);

        // Will add max=stock
        if (action === 'add' && inputValue < maxQty) newQty = inputValue + 1;
        if (action === 'add' && inputValue >= maxQty) {
            newQty = maxQty;
            console.log('Must show a warning informing: You can add max ' + maxQty + ' items due to the stock availability')
        }
        // Will reduce min=0
        if (action === 'reduce' && inputValue > 0) newQty = inputValue - 1;
        
        $(inputQty)[0].value = newQty;

        calculateOrderTotal();
    }


    function printOrderTotal(value) {
        $(DOM.order.total).text(value);
    }


    function verifyBalance(orderValue) {
        var userBalance = parseInt($(DOM.user.balance).text());
        $(DOM.actions.buy).prop('disabled', false);
        $(DOM.order.balance_warning).remove();

        if (userBalance < orderValue) {
            $(DOM.actions.buy).prop('disabled', true);
            $(DOM.order.footer).prepend(balanceWarningElement);
        }
    }

    
    function calculateOrderTotal() {
        
        var total = 0;

        $(DOM.items.item).each(function (i, item) {

            var qty = 0;
            var price = 0;

            if ($(item).find(DOM.items.qty)[0].value != '') qty = parseInt($(item).find(DOM.items.qty)[0].value);
            if ($(item).find(DOM.items.price)[0].value != '') price = parseInt($(item).find(DOM.items.price).text());

            total += qty * price;
        });

        printOrderTotal(total);

        verifyBalance(total);
    }


    return {
        printItemsList: function() {
            return printList();
        },
        printTotal: function() {
            return calculateOrderTotal();
        },
        qtyHandler: function (element) {
            return itemsQtyHandler(element);
        }
    };

})();