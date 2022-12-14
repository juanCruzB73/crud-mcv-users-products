const {resolve} = require("path");
const fs = require("fs");

let model = {
    all: () => {
        let file = resolve(__dirname, "../data", "products.json");
        let data = fs.readFileSync(file);
        return JSON.parse(data);
    },
    one: (id) =>{
        let all = model.all();
        return all.find(e => e.id == id)
    },
    generate: data => {
        let all = model.all();
        let last = all.pop();
        let product = {}
        product.name = data.name
        product.price = parseInt(data.price)
        product.categoria = data.categoria
        product.id = last.id + 1;
        product.img = data.img
        return product;
    },
    write: data => {
        let file = resolve(__dirname, "../data", "products.json");
        let json = JSON.stringify(data, null, 2);
        return fs.writeFileSync(file, json)
    }
}

module.exports = model