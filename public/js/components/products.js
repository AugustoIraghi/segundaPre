

fetch('/api/products', {
    method: 'GET',
})
    .then((res) => res.json())
    .then((data) => {
        const products = data.products;
        products.forEach((product) => {
            const addCart = document.getElementById(`addCart${product._id}`);
            addCart.addEventListener('click', () => {
                fetch(`/api/carts/${cartId}/products/${product._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity: 1 }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.message == 'Product added successfully') {
                            alert('Product added successfully');
                        }
                    });
            }
            );
        });
    });