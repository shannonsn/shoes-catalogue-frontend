//get all shoes in the database using ajax
var output = document.querySelector('.output').innerHTML;
var outputs = Handlebars.compile(output);

$.ajax({
    type: "GET",
    url: "https://shoes-catalogue.herokuapp.com/api/shoes"
}).then(function(result) {
    console.log(result);
    document.querySelector(".display").innerHTML = outputs({
        shoes: result
    })
});
$('.showStock').on("click", function() {

    $.ajax({
        type: "GET",
        url: "https://shoes-catalogue.herokuapp.com/api/shoes"
    }).then(function(result) {
        console.log(result);
        document.querySelector(".display").innerHTML = outputs({
            shoes: result
        })
    });

});


//ajax add a shoe to the database
$('.submit').on('click', function() {

    var shoes = {
        brand: document.querySelector('#brand').value,
        size: document.querySelector('#size').value,
        color: document.querySelector('#color').value,
        price: document.querySelector('#price').value,
        in_stock: document.querySelector('#quantity').value
    }
    $.ajax({
        type: "POST",
        url: "https://shoes-catalogue.herokuapp.com/api/shoes",
        data: shoes,
        success: function(forceGet) {
            location.reload(forceGet);
        },
    })
    brand.value = " ";
    size.value = " ";
    color.value = " ";
    price.value = " ";
    quantity.value = " ";
    alert("your stock has been added")
})


// selling shoes to decrement the instock amount
$('.display').on('click', function(event) {
    var soldShoe = event.target.value;
    $.ajax({
        type: "POST",
        url: "https://shoes-catalogue.herokuapp.com/api/shoes/sold/" + soldShoe,
        success: function(result, forceGet) {
            // var initDocument = $.extend(true, {}, document);
            // var initDoc = $.extend({}, document);
            alert("you are now the owner of a new awesome shoe")
            location.reload(forceGet);
        }
    })
})

// filters through all the information in the database
$('#myInput').on('keyup', function() {

    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        tdS = tr[i].getElementsByTagName("td")[2];
        if (td || tdS) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || tdS.innerHTML.indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
});
