function sendMail(){
    let parms = {
        name : document.getElementById("fullName").value,
        email : document.getElementById("email").value,
        phone : document.getElementById("phone").value,
        total_amount: document.getElementById("total-amount").innerHTML,
        cart_items: cart.map((item) => {
      return (`${item.name} (Rs.${item.price})`);
    }).join('\n'),
        cart_count: cart.length,
    }
    emailjs.send("service_8oxsg07","template_b4q0zdd",parms).then(() => {
        alert("Thank you For Booking the Service We will get back to you soon!")
    })
    emailjs.send("service_8oxsg07","template_fs58b7k",parms)
}  

let cart = [];
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".service-item");
    const cartTable = document.querySelector("#added-items-table tbody");
    const totalAmt = document.getElementById("total-amount");
    items.forEach((item) => {
        const name = item.getAttribute("data-name");
        const price = Number(item.getAttribute("data-price"));
        const addBtn = item.querySelector(".add-btn");
        const removeBtn = item.querySelector(".remove-btn");
        addBtn.onclick = function() {
            cart.push({ name, price });
            updateCart();
            addBtn.style.display = "none";
            removeBtn.style.display = "inline-block";
        };
        removeBtn.onclick = function() {
            let exist = cart.findIndex ((item) => item.name == name)
            if (exist !== -1) {
                cart.splice(exist, 1); 
            }
            console.log(exist);
            updateCart();
            addBtn.style.display = "inline-block";
            removeBtn.style.display = "none";
        };
    });
    function updateCart(){
        console.log(cart);
        let ui = ""
        if (cart.length === 0) {
        ui = `<tr>
                <td colspan="3" style="text-align:center">No item added</td>
              </tr>`;
        document.getElementById("total-amount").innerHTML = "0";
    } else {
        cart.forEach ((item, index ) => {ui += 
        `<tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
      </tr>`})
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById("total-amount").innerHTML = total
    }
    document.getElementById("tbody").innerHTML = ui
    }
    updateCart();
});

document.getElementById("bookingForm").addEventListener("submit", (e) =>{e.preventDefault()
    sendMail();
  const message = document.getElementById("bookingMessage");
    message.innerText = "Thank you For Booking the Service We will get back to you soon!";
    setTimeout(() => {
        message.innerText = "";
  }, 3000);
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    cart = [];
    document.getElementById("tbody").innerHTML = "";
    document.getElementById("total-amount").innerHTML = "0";
    document.querySelectorAll(".add-btn").forEach(btn => btn.style.display = "inline-block");
    document.querySelectorAll(".remove-btn").forEach(btn => btn.style.display = "none");
    updateCart();
});
