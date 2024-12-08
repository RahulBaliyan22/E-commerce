let like_btn = document.querySelectorAll(".liked");
async function buttonClicked(product_id, btn) {
  try {
    const resp = await axios.post(`http://localhost:8080/products/${product_id}/like`);
   
    if (btn.children[0].classList.contains('fa-regular')) {
      btn.children[0].classList.remove('fa-regular');
      btn.children[0].classList.add('fa-solid');
    } else {
      btn.children[0].classList.remove('fa-solid');
      btn.children[0].classList.add('fa-regular');
    }
  } catch (e) {
    window.location.replace = '/login';
  }
}
for (let btn of like_btn) {
  btn.addEventListener('click', function() {
    let product_id = btn.getAttribute('product_id');
    buttonClicked(product_id, btn);
  });
}

