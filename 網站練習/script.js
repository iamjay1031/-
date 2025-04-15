let cartCount = 0;
let cart = {}; // 儲存購物車商品資料
let totalPrice = 0;

const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);

        // 更新購物車資料
        if (cart[name]) {
            cart[name].quantity++;
        } else {
            cart[name] = { price: price, quantity: 1 };
        }

        // 更新購物車數量
        cartCount++;
        cartCountElement.textContent = cartCount;

        // 更新購物車顯示區塊
        renderCart();

        // 顯示提示訊息
        alert(`已加入購物車：${name} ($${price})`);
    });
});

function renderCart() {
    cartItemsElement.innerHTML = '';
    totalPrice = 0;

    for (const name in cart) {
        const item = cart[name];
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const li = document.createElement('li');
        li.innerHTML = `
      ${name} x${item.quantity} ($${itemTotal})
      <button class="plus" data-name="${name}">➕</button>
      <button class="minus" data-name="${name}">➖</button>
    `;
        cartItemsElement.appendChild(li);
    }

    cartTotalElement.textContent = `總金額：$${totalPrice}`;
}

cartItemsElement.addEventListener('click', function (event) {
    const target = event.target;
    const name = target.dataset.name;

    if (target.classList.contains('plus')) {
        cart[name].quantity++;
        cartCount++;
    } else if (target.classList.contains('minus')) {
        cart[name].quantity--;
        cartCount--;
        if (cart[name].quantity === 0) {
            delete cart[name];
        }
    }

    cartCountElement.textContent = cartCount;
    renderCart();
});

document.getElementById('clear-cart').addEventListener('click', () => {
    if (confirm('你確定要清空購物車嗎？')) {
        cart = {};
        cartCount = 0;
        totalPrice = 0;
        cartCountElement.textContent = cartCount;
        renderCart();
    }
});
