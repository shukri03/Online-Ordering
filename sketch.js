let orderState = 0;
let stateStartTime = 0;
const stateDuration = 8000;
let buyButton;
let orderConfirmedData = 0;
let preparingData = { garmentWorkers: 0, waterUsage: 0, co2: 0 };
let deliveringData = { environmentalCost: 0, humanCost: 0 };
let lastDataUpdate = 0;
const updateInterval = 2000;
let currentDataInterval;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(18);
  textFont('Helvetica');
  buyButton = createButton("Buy Now");
  buyButton.style('font-size', '20px');
  buyButton.style('padding', '10px 20px');
  buyButton.style('background-color', '#3498db');
  buyButton.style('color', 'white');
  buyButton.style('border', 'none');
  buyButton.style('border-radius', '5px');
  buyButton.position(width / 2 - 50, height / 2 + 60);
  buyButton.mousePressed(startOrder);
}

function startOrder() {
  orderState = 1;
  stateStartTime = millis();
  buyButton.hide();
  lastDataUpdate = millis();
  updateData();
}

function updateData() {
  if (orderState === 1) {
    orderConfirmedData = nf(random(50, 100), 1, 2);
  } else if (orderState === 2) {
    preparingData.garmentWorkers = floor(random(1000000, 2000000));
    preparingData.waterUsage = floor(random(3000000, 5000000));
    preparingData.co2 = floor(random(4000, 6000));
  } else if (orderState === 3) {
    deliveringData.environmentalCost = nf(random(10, 50), 1, 2);
    deliveringData.humanCost = floor(random(1, 10));
  }
}

function draw() {
  background(245);
  fill(52, 73, 94);
  noStroke();
  rect(0, 0, width, 50);
  fill(255);
  textSize(20);
  text("Online Ordering Process Simulation", width / 2, 25);
  fill(0);
  textSize(18);
  if (orderState > 0 && millis() - stateStartTime > stateDuration) {
    orderState++;
    stateStartTime = millis();
    lastDataUpdate = millis();
    updateData();
  }
  if (orderState > 0 && millis() - lastDataUpdate > updateInterval) {
    updateData();
    lastDataUpdate = millis();
  }
  if (orderState === 0) {
    text("Welcome!\nClick 'Buy Now' to start your order.", width / 2, height / 2);
  } else if (orderState === 1) {
    text("Order Confirmed!\nProfit Increase: $" + orderConfirmedData + "M", width / 2, height / 2);
  } else if (orderState === 2) {
    text("Preparing Your Order...", width / 2, height / 2 - 70);
    text("Garment Workers: " + preparingData.garmentWorkers, width / 2, height / 2 - 30);
    text("Water Usage: " + preparingData.waterUsage + " L", width / 2, height / 2 + 10);
    text("CO2 Emissions: " + preparingData.co2 + " tons", width / 2, height / 2 + 50);
  } else if (orderState === 3) {
    text("Delivering Your Order...", width / 2, height / 2 - 50);
    text("Environmental Cost: $" + deliveringData.environmentalCost, width / 2, height / 2);
    text("Human Cost: " + deliveringData.humanCost, width / 2, height / 2 + 40);
  } else if (orderState === 4) {
    text("Order Completed.\nReflect on the hidden costs of consumption.", width / 2, height / 2);
    buyButton.show();
    buyButton.html("Buy Again");
    buyButton.position(width / 2 - 50, height / 2 + 60);
    buyButton.mousePressed(resetProcess);
  } else {
    text("Thank you!", width / 2, height / 2);
  }
}

function resetProcess() {
  orderState = 0;
  stateStartTime = 0;
  lastDataUpdate = 0;
  clearInterval(currentDataInterval);
  currentDataInterval = null;
  buyButton.html("Buy Now");
  buyButton.position(width / 2 - 50, height / 2 + 60);
}
