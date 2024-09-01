
function showCart() {
    // get cart
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (cart.length == 0) return;

    const table = document.getElementById("cart_table");
    const tbody = table.getElementsByTagName("tbody")[0];
    let cartAmount = 0;

    tbody.innerHTML = "";

    cart.forEach((item, index) => { // pass index to callback function
        const { name, quantity, price, total } = item;

        const newRow = tbody.insertRow();
        const itemCell = newRow.insertCell();
        const quantityCell = newRow.insertCell();
        const totalCell = newRow.insertCell();
        itemCell.innerHTML = `<img src="images/${name.split(" ")[0].replace(/\s+/g, '')}.png" alt="${name}"><p>${name}</p>`;
        quantityCell.innerHTML = `<span>${quantity}</span>`;
        totalCell.innerHTML = `$${total.toFixed(2)}`;

        cartAmount += quantity * price;

        const removeBtnCell = newRow.insertCell(); // add remove button cell
        const removeImg = document.createElement("img"); // create remove image
        removeImg.src = "images/crossMark.png";
        removeImg.style.cursor = "pointer"; // set cursor to look like a button
        removeImg.style.width = "20px";
        removeImg.addEventListener("click", () => removeCartItem(index)); 
        removeBtnCell.appendChild(removeImg);
        removeBtnCell.style.border = "none"; 

    });

    updateOrderTotal(cartAmount);
}

function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    // update the cart display for the deleted item only
    const table = document.getElementById("cart_table");
    const tbody = table.getElementsByTagName("tbody")[0];
    const row = tbody.rows[index];
    tbody.removeChild(row);

    // update the order total
    const cartAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    updateOrderTotal(cartAmount);
    location.reload();
}

function updateOrderTotal(cartAmount) {
    // calculate Item price, shipping price, subtotal price, GST, PST and total price
    const shippingPrice = 10;
    const subtotalPrice = cartAmount + shippingPrice;
    const gstPrice = 0.05 * subtotalPrice;
    const pstPrice = 0.07 * subtotalPrice;
    const totalPrice = subtotalPrice + gstPrice + pstPrice;

    // store the price in localStorage
    localStorage.setItem('totalPrice', totalPrice);

    // display
    const item = document.getElementById('item_price');
    item.textContent = `$${cartAmount.toFixed(2)}`;

    const shipping = document.getElementById('shipping_price');
    shipping.textContent = `$${shippingPrice}`;

    const subtotal = document.getElementById('subtotal');
    subtotal.textContent = `$${subtotalPrice.toFixed(2)}`;

    const gst = document.getElementById('gst');
    gst.textContent = `$${gstPrice.toFixed(2)}`;

    const pstElement = document.getElementById('pst');
    pstElement.textContent = `$${pstPrice.toFixed(2)}`;

    const total = document.getElementById('total_price');
    total.textContent = `$${totalPrice.toFixed(2)}`;
}