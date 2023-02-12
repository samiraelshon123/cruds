let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
///////////////////////////////////////////////////

// get total
function get_total(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

////////////////////////////////////////////////////

//create product
let createPro=document.getElementById("createPro");
let dataPro;
if(localStorage.products != null){
    dataPro = (JSON.parse(localStorage.getItem('products')));
}else{
    dataPro = [];
}
console.log(dataPro);
createPro.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != '' && category.value != '' && count.value <100){
        if(mood == 'create'){
            if(newPro.count > 1){
                for(i = 0 ; i < newPro.count ; i++){
                    dataPro.push(newPro);
                }
        
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[tmp] = newPro;
            mood = 'create';
            createPro.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }
    localStorage.setItem('products', JSON.stringify(dataPro));
  
    showData();
   
}

///////////////////////////////////////////////////

// clear inputs
function clearData(){
    title.value = '',
    price.value = '',
    taxes.value = '',
    ads.value = '',
    discount.value = '',
    total.innerHTML = '',
    count.value = '',
    category.value = ''
}

// read 

function showData(){
    get_total();
    let table = '';
    for(let i = 0 ; i <dataPro.length ; i++){
       
        table += ` <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
    }
   
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    
    if(dataPro.length > 0){
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All ${dataPro.length}</>`;
    }else{
        btnDelete.innerHTML = '';
    }
}
showData();

// delete data

function deleteData(i){
    dataPro.splice(i, 1);
    localStorage.products = JSON.stringify(dataPro);
    showData();    
}

// delete all

function deleteAll(){
    dataPro.splice(0);
    localStorage.clear();
    showData();  
}

//update

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    get_total();
    count.style.display = 'none';
    createPro.innerHTML = 'Update';
    category.value = dataPro[i].category;
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

//search

let searchMode = 'title';
function getSearchMode(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMode = 'title';
        
    }else{
        searchMode = 'category';
       
    }
    search.placeholder = 'Search By '+searchMode;
    search.focus();
    search.value = '';
    showData();
}
function searchData(value){
    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++){
        if(searchMode == 'title'){
        
                if(dataPro[i].title.includes(value.toLowerCase())){
                    table += ` <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>`;
                }
            
        }else{
            
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += ` <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}