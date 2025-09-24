function calculate() {
  const metres = parseFloat(document.getElementById("metres").value) || 0;//Get the number of metres entered.  document.getElementById("metres").value grabs whatever is typed - it is always a sting. parseFloat converts string to a number.
  const rate = parseFloat(document.getElementById("product").value);
  const pumpRequired = document.getElementById("pump").checked;
  const customDeliveryToggle = document.getElementById("customDeliveryToggle").checked;
  const customDelivery = parseFloat(document.getElementById("customDelivery").value) || 0;
  const waitingToggle = document.getElementById("waitingToggle").checked;
  const waitingMinutes = parseInt(document.getElementById("waitingMinutes").value) || 0;
//.value = text typed in box.  .checked = true/false from tick boxes.   parseFloat/parseInt - turn text into numbers.  || is the 'or' operator, I used it so it doesnt return undefined and always returns a number. 0 if no input.
  let materialCost = metres * rate;

  let deliveryCost = 0;
  if (metres > 0) { //heres the change
  if (customDeliveryToggle) {
    deliveryCost = customDelivery;
  } else {
    if (pumpRequired) {
      if (metres <= 2) deliveryCost = 60;
      else if (metres <= 3) deliveryCost = 60;
      else if (metres <= 5) deliveryCost = 50;
      else if (metres <= 7) deliveryCost = 40;
      else deliveryCost = 20;
    } else {
      if (metres <= 2) deliveryCost = 90;
      else if (metres <= 3) deliveryCost = 80;
      else if (metres <= 5) deliveryCost = 60;
      else if (metres <= 7) deliveryCost = 50;
      else deliveryCost = 40;
    }
  }
}//and here

  let pumpCost = pumpRequired ? 350 : 0;

  let waitingCost = 0;
  if (waitingToggle) {
    if (metres <= 3) {
      if (waitingMinutes > 30) {
        waitingCost = 25 + Math.floor((waitingMinutes - 30) / 15) * 25;
      }
    } else {
      if (waitingMinutes > 45) {
        waitingCost = 25 + Math.floor((waitingMinutes - 45) / 15) * 25;
      }
    }
  }

  let subtotal = materialCost + deliveryCost + pumpCost + waitingCost;
  let vat = subtotal * 0.2;
  let total = subtotal + vat;

  let results = "----------------------------\n";
  results += `Material Cost: £${materialCost.toFixed(2)}\n`;
  results += `Delivery: £${deliveryCost.toFixed(2)}\n`;
  if (pumpRequired) results += `Pump: £${pumpCost.toFixed(2)}\n`;
  if (waitingToggle) results += `Waiting Time: £${waitingCost.toFixed(2)}\n`;
  results += `Subtotal: £${subtotal.toFixed(2)}\n`;
  results += `VAT: £${vat.toFixed(2)}\n`;
  results += `Total: £${total.toFixed(2)}\n`;
  results += "----------------------------";

  document.getElementById("results").textContent = results;
}
// Run once on load so the receipt shows with zeros
window.onload = function() {
  calculate();
};

// Toggle visibility
document.getElementById("customDeliveryToggle").addEventListener("change", function() {
  document.getElementById("customDelivery").style.display = this.checked ? "block" : "none";
});
document.getElementById("waitingToggle").addEventListener("change", function() {
  document.getElementById("waitingMinutes").style.display = this.checked ? "block" : "none";
});
