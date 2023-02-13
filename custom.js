document.querySelector('.basket').addEventListener('click',function() {
    document.querySelector('.modal').classList.add('modal-show');
});
document.querySelector('.fa-xmark').addEventListener('click',function() {
    document.querySelector('.modal').classList.remove('modal-show');
});

var products=[
    {
      id:1,
      name:'HUAWEI Watch FIT 16/512 Graphite Black',
      about:'Itaque iste amet excepturi quas ducimus porro, sit debitis repudiandae consequatur ad dolorum fugiat',
      price:159.99,
      photo:'https://kontakt.az/wp-content/uploads/2022/02/10751920570418_png.webp'
    }
    ,
    {
        id:2,
        name:'iPhone 11 128 GB Black',
        about:'Lorem ipsum, assumenda consequuntur itaque iste amet, sit debitis repudiandae consequatur ad dolorum fugiat',
        price:1399.99,
        photo:'https://kontakt.az/wp-content/uploads/2019/11/iphone_11_black_2.png.jpg'
      }
      ,
      {
        id:3,
        name:'Notbuk Acer Predator Triton 500 SE PT516-51S-757L (NH.QAJER.005)',
        about:'Lorem ipsum, Ex cumque vero eum autem, suscipit, assumenda consequuntur itaque iste amet excepturi quas ducimus porro, sit debitis repudiandae consequatur ad dolorum fugiat',
        price:5099.99,
        photo:'https://kontakt.az/wp-content/uploads/2022/11/New-Project-2022-11-01T130120.169_png.webp'
      }
];
var basket=[];
products.forEach(product=>{
    document.querySelector('.items').innerHTML+=`
    <div class="item">
                <img src="${product.photo}" alt="">
                <div class="header">
                   <h3>${product.name}</h3>
                   <span>${product.price}$</span>
                </div> 
                <p>${product.about}</p>
                <i class="fa-solid fa-basket-shopping" onclick="addToCart(${product.id})"></i>
            </div>
    `
})

basket.forEach(b=>{
    const p = products.find(x=>{
        return x.id==b.productId;
    });
    getCart(p,b)
    
})
function addToCart(id) {
    let index=basket.findIndex(b=>{
        return b.productId==id;
    })
    if(index == -1)
    {
        basket.push({
            productId:id,
            count:1
        });

        const p=products.find(x=>{
            return x.id===id;
        });
        getCart(p,basket[basket.length-1])
    }
    else{
        basket[index].count++;
        updateRow(index);    
    }
}
function updateRow(index) {
    let b=basket[index];
    let p=products.find(p=>{
        return p.id == b.productId;
    })

        document.querySelectorAll(' table tbody tr')[index].innerHTML= `
        <tr>
              <td>${index+1}</td>
              <td>${p.name}</td>
              <td>${p.price}$</td>
              <td>${b.count}</td>
              <td>${p.price * b.count}$</td>
              <td><i class="fa fa-trash" onclick="removeRow(${b.productId})"></i></td>
       </tr>
                                                          `    
   calc();                                               
}

function getCart(p,b){
    document.querySelector('.modal table tbody').innerHTML+=`
        <tr>
              <td>${document.querySelectorAll('table tbody tr').length+1}</td>
              <td>${p.name}</td>
              <td>${p.price}$</td>
              <td>${b.count}</td>
              <td>${p.price *b.count}$</td>
              <td><i class="fa fa-trash" onclick="removeRow(${b.productId})"></i></td>
       </tr>
                                                          `
   calc();                                               

}

function removeRow(id){
    const index = basket.findIndex(x=>{
        return x.productId == id;
    })
    console.log(index);
    basket.splice(index,1);
    document.querySelectorAll('table tbody tr')[index].remove();
    calc();
}
function calc() {
    let sumPrice=0;
    basket.forEach((b,index)=>{
        document.querySelectorAll('table tbody tr')[index].children[0].innerText= index +1;
        sumPrice+=b.count*products.find(p=>{return p.id==b.productId}).price
    })
    document.querySelector('.modal .footer span').innerText=sumPrice+'$';
    if(basket.length==0){
        document.querySelector(".modal p").style.display='block';
        document.querySelector(".modal table").style.display='none';
    }
    else{
        document.querySelector(".modal p").style.display='none';
        document.querySelector(".modal table").style.display='table';
    }
        document.querySelector('.basket span').innerText=basket.length;
}
document.querySelector('.modal button').addEventListener('click',function() {
    document.querySelector('table tbody').innerHTML='';
    basket = [];
    calc();
    

    
})