'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

function rentalPrice()
{
  for(let i = 0; i< rentals.length;i++)
  {
    let datePickup = Date.parse(rentals[i]["pickupDate"]);
    let dateReturn = Date.parse(rentals[i]["returnDate"]);
    let time = ((dateReturn - datePickup)/(1000*24*60*60));
    rentals[i]["price"] = (time+1)*cars.find(x=>x.id ===rentals[i].carId).pricePerDay + (rentals[i]["distance"])*cars.find(x=>x.id ===rentals[i].carId).pricePerKm;
  }
}

function decreasePricing()
{
  for(let i = 0; i< rentals.length;i++)
  {
  let datePickup = Date.parse(rentals[i]["pickupDate"]);
  let dateReturn = Date.parse(rentals[i]["returnDate"]);
  let time = (((dateReturn - datePickup)/(1000*24*60*60)))+1;
  if(time>1 && time<4)
    {
      rentals[i]["price"] = rentals[i]["price"] * 0.90;
    }
  if(time>4 && time<10)
    {
      rentals[i]["price"] = rentals[i]["price"] * 0.70;
    }
  if(time>10)
      {
        rentals[i]["price"] = rentals[i]["price"] * 0.50;
      }
  }
}

function comission()
{
  for(let i = 0; i< rentals.length;i++)
  {
    let datePickup = Date.parse(rentals[i]["pickupDate"]);
    let dateReturn = Date.parse(rentals[i]["returnDate"]);
    let time = ((dateReturn - datePickup)/(1000*24*60*60))+1;
    let comission  = rentals[i]["price"] * 0.3;
    rentals[i]["insurance"] = comission/2;
    comission = comission/2;
    rentals[i]["treasury"] = time*1;
    comission = comission - rentals[i]["treasury"];
    rentals[i]["virtuo"] = comission;

  }
}

function deductibleOption()
{

  for(let i = 0; i<rentals.length;i++)
  {
    if(rentals[i]["options"]["deductibleReduction"]){
      let datePickup = Date.parse(rentals[i]["pickupDate"]);
      let dateReturn = Date.parse(rentals[i]["returnDate"]);
      let time = ((dateReturn - datePickup)/(1000*24*60*60))+1;
      rentals[i]["price"] = rentals[i]["price"] + time*4;
    }
  }
}

function computeAll()
{

alert(rentals[0]["id"]["payment"]["who"]);
  for(let i = 0; i<rentals.length;i++)
  {
      for(let j= 0 ; j<(actors.find(x=>x.rentalId ===rentals[i].id).payment.length);j++)
      {

          if(  rentals[i]["id"]["payment"]["who"] === "driver")
          {
            rentals[i]["id"]["payment"]["who"]["amount"] = rentals[i]["price"];
          }
          if(  rentals[i]["id"]["payment"]["who"] === "partner")
          {
            rentals[i]["id"]["payment"]["who"]["amount"] = rentals[i]["price"]*0.70;
          }
          if(  rentals[i]["id"]["payment"]["who"] === "insurance")
          {
            rentals[i]["id"]["payment"]["who"]["amount"] = rentals[i]["insurance"];
          }
          if(  rentals[i]["id"]["payment"]["who"] === "treasury")
          {
            rentals[i]["id"]["payment"]["who"]["amount"] = rentals[i]["treasury"];
          }
          if(  rentals[i]["id"]["payment"]["who"] === "virtuo")
          {
            rentals[i]["id"]["payment"]["who"]["amount"] = rentals[i]["virtuo"];
          }
      }

  }
}

rentalPrice();
decreasePricing();
comission();
deductibleOption();
computeAll();
console.log(cars);
console.log(rentals);
console.log(actors);
