var item = class Item {

    constructor(data) {
        this.id = data.id
        this.name = data.name;
        this.price = data.price;
        this.qty = data.quantity;
    }
    
    get newBlock() {
        return this.generateNewItem();
    }

    getImageSrc(id) {
        return '../assets/images/small/item-' + id + '.jpg'; 
    }

    async generateNewItem() {

        var that = this;
        var newBlock;

        await $.get('../templates/item.html', function (block) {
            newBlock = block.replace('%img-src%', that.getImageSrc(that.id));
            newBlock = newBlock.replace('%img-alt%', that.name);
            newBlock = newBlock.replace('%item-name%', that.name);
            newBlock = newBlock.replace('%max-qty%', that.qty);
            newBlock = newBlock.replace('%item-price%', that.price);
        });

        return newBlock;
    }
}