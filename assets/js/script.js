let create = document.getElementById('createBtn');
let existProduct = JSON.parse(localStorage.getItem('existProduct'));

create.addEventListener('click', () => {
    document.getElementById('name').value = "";
    document.getElementById('img-link').value = "";
    document.getElementById('price').value = "";
    document.getElementById('ingredients').value = "";
    document.getElementById('category').value = "";
    document.getElementById('add-input').style.display = 'block';
    document.getElementById('upd-input').style.display = 'none';
    create.style.display = 'none';
})

function backBtn() {
    document.getElementById('add-input').style.display = 'none';
    document.getElementById('upd-input').style.display = 'none';
    create.style.display = 'block';
}

function printAll() {
    if (existProduct === null) {
        existProduct = [];
    }
    let data = "";
    existProduct.forEach((val, index) => {
        data += `
                <div class="col-md-6 col-lg-4">
                    <div class="card p-3 shadow d-flex justify-content-between">
                        <div class="card-img text-center">
                            <img src="${val.image}"
                                alt="" width="150px">
                        </div>
                        <div class="card-content mt-4">
                            <p class=""><span>TITLE:</span> ${val.name}</p>
                            <p><span>INGREDIENTS:</span> ${val.ingredients}</p>
                            <p><span>INSTRUCTIONS:</span> ${val.price}</p>
                            <p class="d-block"><span>CUSININE:</span> ${val.category}</p>
                            <div class="card-btn mt-2">
                                <button class="btn btn-primary py-1" onclick="edit(${val.id})">EDIT</button>
                                <button class="btn btn-danger py-1" onclick="dele(${index})">DELETE</button>
                            </div>    
                        </div>
                    </div>
                </div>
            `
    })
    document.getElementById('row').innerHTML = data;
    srchInput(existProduct);
    saveToLocalStorage();
}

printAll();

let idx = 0;
function addProduct() {
    const toBeadd = {
        id: idx++,
        name: document.getElementById('name').value,
        image: document.getElementById('img-link').value,
        ingredients: document.getElementById('ingredients').value,
        price: document.getElementById('price').value,
        category: document.getElementById('category').value,
    };

    const checkName = existProduct.findIndex((item) => {
        return item.name === toBeadd.name;
    })

    if (toBeadd.name === "" || toBeadd.ingredients == "" || toBeadd.image === "" || toBeadd.price === "" || toBeadd.category === "") {
        alert('Incomplete Information');
    } else if (checkName != -1) {
        alert('Product Already Exist');
    } else {
        existProduct.push(toBeadd);
        saveToLocalStorage();
        printAll();
        document.getElementById('add-input').style.display = 'none';
        create.style.display = 'block';
    }
}

function edit(getId) {
    const toBeEdit = existProduct.find((val) => {
        return val.id === getId;
    })
    document.querySelector('#id').value = toBeEdit.id;
    document.querySelector('#edName').value = toBeEdit.name;
    document.querySelector('#edImg-link').value = toBeEdit.image;
    document.getElementById('eingredients').value = toBeEdit.ingredients;
    document.querySelector('#edPrice').value = toBeEdit.price;
    document.querySelector('#edCategory').value = toBeEdit.category;
    document.getElementById('upd-input').style.display = 'block';
    document.getElementById('add-input').style.display = 'none';
    create.style.display = 'none';
}

function updateProduct() {
    let id = parseInt(document.querySelector('#id').value);
    let name = document.querySelector('#edName').value;
    let image = document.querySelector('#edImg-link').value;
    let ingredients = document.getElementById('eingredients').value;
    let price = document.querySelector('#edPrice').value;
    let category = document.querySelector('#edCategory').value;

    if (id == "" || name == "" || image == "" || ingredients == "" || price == "" || category == "") {
        alert("Incomplete information!..")
    } else {
        let updateObj = { id, name, image, ingredients, price, category };
        const getIndex = existProduct.findIndex((val) => {
            return val.id === updateObj.id;
        })

        existProduct[getIndex] = updateObj;
        saveToLocalStorage();
        printAll();
        document.getElementById('upd-input').style.display = 'none';
        create.style.display = 'block';
    }
}

function dele(getId) {
    existProduct.splice(getId, 1);
    saveToLocalStorage();
    printAll();
}

function srchInput(existProduct) {
    let srchData = "";
    existProduct.forEach((val) => {
        srchData += `<option value="${val.name}">${val.name}</option>`
    })
    document.getElementById('myList').innerHTML = srchData;
}

let srchBtn = document.getElementById('srcIcon');
srchBtn.addEventListener('click', () => {
    let srchValue = document.getElementById('srch-input');
    let checkProduct = existProduct.findIndex((item) => {
        return item.name === srchValue.value;
    })
    if (checkProduct == -1) {
        alert('Not Found!')
    }
    else {
        alert(`found at index ${checkProduct + 1}`)
    }
})

function saveToLocalStorage() {
    localStorage.setItem('existProduct', JSON.stringify(existProduct));
}