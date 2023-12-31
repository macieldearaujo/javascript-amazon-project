export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: `e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
    quantity: 2,
  }, {
    productId: `15b6fc6f-327a-4ec4-896f-486349e85a3d`,
    quantity: 1
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  })

  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity
    })
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((product) => {
    if (product.productId !== productId) {
      newCart.push(product);
    }
  })
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity(name) {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })

  if (cartQuantity >= 99) {
    cartQuantity = '+99';
  }

  document.querySelector(name).innerHTML = cartQuantity;

  console.log(cart);
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }

    if(newQuantity > 0) {
    matchingItem.quantity = newQuantity;
    } else {
      removeFromCart(productId)
    }

    saveToStorage();
  });
}