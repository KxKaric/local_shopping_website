
var cartItems = [];

const storedCart = localStorage.getItem('cart');
if (storedCart) {
    cartItems = JSON.parse(storedCart);
}

function addToCart(itemName, itemQuantity, itemPrice) {
    let itemTotal = itemQuantity * itemPrice;
    let cartIndex = -1;

    // check if item is already in cart
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name === itemName) {
            cartIndex = i;
            break;
        }
    }

    // if item is already in cart, update quantity
    if (cartIndex !== -1) {
        cartItems[cartIndex].quantity += itemQuantity;
        cartItems[cartIndex].total += itemTotal;
    } else {
        // if item is not in cart, add it
        cartItems.push({
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
            total: itemTotal
        });
    }

    // store the cart into localstorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

