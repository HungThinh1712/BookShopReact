
class CartItem {
    constructor(name,price,coverPrice,discount,authorName,amount,total,bookId,image) {
        this.name = name;
        this.price = price;
        this.coverPrice = coverPrice;
        this.discount = discount;
        this.authorName = authorName; 
        this.amount = amount;
        this.total = total;
        this.bookId = bookId;
        this.image = image;
        
    }
}

export default CartItem

