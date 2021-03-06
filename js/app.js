'use strict';

var hoursOpen = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
var storeLocations = [];
var footerTotals = [];

var cookieForm = document.getElementById('cookie-form');

var patTable = document.getElementById('patTable');

function Bakery(name, minHourlyCustomer, maxHourlyCustomer, avgCookiesPerSale) {
  this.name = name;
  this.minHourlyCustomer = minHourlyCustomer;
  this.maxHourlyCustomer = maxHourlyCustomer;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesPerHour = [];
  this.dailyCookieTotal = 0;
  storeLocations.push(this);

}

Bakery.prototype.calcCustomersPerHour = function() {
  return Math.floor( Math.random() * (this.maxHourlyCustomer - this.minHourlyCustomer) + this.minHourlyCustomer);
};

Bakery.prototype.calcCookiesPerHour = function(){
  for(let i = 0; i < 14; i++) {
    this.cookiesPerHour.push((Math.floor(this.calcCustomersPerHour() * this.avgCookiesPerSale)));
  }
};

Bakery.prototype.calcDailyCookieTotal = function(){
  this.calcCookiesPerHour();
  var x = 0;
  for(let i = 0; i < this.cookiesPerHour.length; i++)
    x = x + this.cookiesPerHour[i];
  this.dailyCookieTotal = x;
};

new Bakery('First and Pike', 23, 65, 6.3);
new Bakery('SeaTac Airport', 3, 24, 3.7);
new Bakery('Seattle Center', 11, 38, 2.3);
new Bakery('Capitol Hill', 20, 38, 2.3);
new Bakery('Alki', 2, 16, 4.6);

Bakery.prototype.render = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.name;
  trEl.appendChild(tdEl);

  for(let i = 0; i < this.cookiesPerHour.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesPerHour[i];
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = this.dailyCookieTotal;
  trEl.appendChild(tdEl);

  patTable.appendChild(trEl);
};
// creates header row
function makeHeaderRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);

  for(let i = 0; i < hoursOpen.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = hoursOpen[i];
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = 'Total';
  trEl.appendChild(thEl);

  patTable.appendChild(trEl);
}
// displays sales
function displaySales() {
  for (i = 0; i < storeLocations.length; i++) {

    if (storeLocations[i].dailyCookieTotal === 0) {
      storeLocations[i].calcDailyCookieTotal();
    }
  }

  for(var i = 0; i < storeLocations.length; i++){
    storeLocations[i].render();
    console.log(storeLocations[i]);
  }
}
// creates footer row
function createFooter() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Hourly Totals';
  trEl.appendChild(thEl);
  patTable.appendChild(trEl);

  for (var i = 0; i < hoursOpen.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = footerTotals[i];
    trEl.appendChild(tdEl);

  }

  var grandTotal = 0;
  for(var k=0; k < footerTotals.length; k++) {
    grandTotal += footerTotals[k];
  }
  var grandTotalEl = document.createElement('td');
  grandTotalEl.textContent = grandTotal;
  trEl.appendChild(grandTotalEl);
  patTable.appendChild(trEl);
  console.log(grandTotal);
}

function displayHourlySales() {
  for(var i = 0; i < hoursOpen.length; i++) {

    footerTotals[i] = 0;
    for(var j = 0; j < storeLocations.length; j++) {
      footerTotals[i] += storeLocations[j].cookiesPerHour[i];
      console.log(footerTotals);
    }
  }
}

function newBakerySubmit (event) {
  event.preventDefault();

  var newName = event.target.newLocation.value;
  var newMin = parseInt(event.target.minimumCustomers.value);
  var newMax = parseInt(event.target.maximumCustomers.value);
  var newAvg = parseFloat(event.target.avgCookiesPerCustomer.value);
  new Bakery (newName, newMin, newMax, newAvg);

  console.table(storeLocations);
  console.log('newMin', isNaN(newMin));
  console.log('newMax', isNaN(newMax));
  console.log('newAvg', newAvg);
  console.log(storeLocations[storeLocations.length-1]);

  event.target.newLocation.value = null;
  event.target.minimumCustomers.value = null;
  event.target.maximumCustomers.value = null;
  event.target.avgCookiesPerCustomer.value = null;

  patTable.innerHTML = '';
  makeHeaderRow();
  displaySales();
  displayHourlySales();
  createFooter();
  console.log(storeLocations[storeLocations.length-1]);
  console.log(storeLocations[storeLocations.length-2]);
  console.log(storeLocations[storeLocations.length-3]);

}

cookieForm.addEventListener('submit', newBakerySubmit);
makeHeaderRow();
displaySales();
displayHourlySales();
createFooter();