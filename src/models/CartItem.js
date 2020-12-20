
class CartItem {
    constructor(name,price,coverPrice,discount,authorName,amount,bookId,imageSrc) {
        this.name = name;
        this.price = price;
        this.coverPrice = coverPrice;
        this.discount = discount;
        this.authorName = authorName; 
        this.amount = amount;
        this.bookId = bookId;
        this.imageSrc = imageSrc;
        
    }
}

export default CartItem

