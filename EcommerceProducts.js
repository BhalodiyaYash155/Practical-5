const express = require("express");

const app = express();
const PORT = 3000;

const products = [
    { id: 1, name: "Laptop", category: "electronics", price: 50000 },
    { id: 2, name: "Smartphone", category: "electronics", price: 30000 },
    { id: 3, name: "Shoes", category: "fashion", price: 2000 },
    { id: 4, name: "Face Wash", category: "bodycare", price: 150 },
    { id: 5, name: "Watch", category: "fashion", price: 5000 }
];

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.get("/products", (req, res) => {
    const category = req.query.category; // Get category from query string

    if (category) {
        const filteredProducts = products.filter(p => p.category.toLowerCase().trim() === category.toLowerCase().trim());
        
        if (filteredProducts.length > 0) {
            res.json(filteredProducts); // Send filtered products
        } else {
            res.status(404).json({ message: "No products found in this category" }); // If category doesn't exist
        }
    } else {
        res.json(products); // If no category is provided, return all products
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
