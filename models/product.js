class Product {
    constructor(id, ownerId, title, imageUrl, description, price, qty) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.qty = qty;
    }
}

export default Product;