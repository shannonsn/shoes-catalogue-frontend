//get all shoes in the database using ajax
var output = document.querySelector('.output').innerHTML;
var outputs = Handlebars.compile(output);
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
        success: function(err, result) {
            console.log(err);
        },
        else(result) {
            console.log(success);
        }
    })
})

// selling shoes to decrement the instock amount



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
