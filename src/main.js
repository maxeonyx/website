$ = document.querySelector.bind(document);

let print_el = $(".action.print");
print_el.addEventListener('click', function () {
   print(); 
});
