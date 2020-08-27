const rankTest = require('ava');
const {voyageRisk,rating,voyageProfitFactor,captainHistoryRisk,hasChina} =require('../src/rank');

rankTest('calculate the voyage risk of voyage.length<4 and the destination isn\'t china or east-indies',t=>{
  const voyage = {
    zone: 'west-indies',
    length: 2,
  };
  const result=voyageRisk(voyage);
  t.is(result,1);
})

rankTest('calculate the voyage risk of voyage.length>4 and voyage.length<8 and the destination isn\'t china or east-indies',t=>{
  const voyage = {
    zone: 'west-indies',
    length: 6,
  };
  const result=voyageRisk(voyage);
  t.is(result,3);
})

rankTest('calculate the voyage risk of voyage.length>8 and the destination isn\'t china or east-indies',t=>{
  const voyage = {
    zone: 'west-indies',
    length: 10,
  };
  const result=voyageRisk(voyage);
  t.is(result,5);
})

rankTest('calculate the voyage risk of voyage.length<4 and the destination is china or east-indies',t=>{
  const voyage = {
    zone: 'east-indies',
    length: 2,
  };
  const result=voyageRisk(voyage);
  t.is(result,5);
})

rankTest('calculate the voyage risk of voyage.length>4 and voyage.length<8 and the destination is china or east-indies',t=>{
  const voyage = {
    zone: 'china',
    length: 6,
  };
  const result=voyageRisk(voyage);
  t.is(result,7);
})

rankTest('calculate the voyage risk of voyage.length>8 and the destination is china or east-indies',t=>{
  const voyage = {
    zone: 'china',
    length: 10,
  };
  const result=voyageRisk(voyage);
  t.is(result,9);
})

rankTest('should return true if history includes china',t=>{
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },{
      zone: 'china',
      profit: -2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
  ];
  const result=hasChina(history);
  t.is(result,true);
})

rankTest('calculate the captainHistoryRisk when history<5 and all profit>0 and doesn\'t contain china',t=>{
  const voyage = {
    zone: 'west-indies',
    length: 10,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },{
      zone: 'china',
      profit: 2,
    },{
      zone: 'west-africa',
      profit: 7,
    },
  ];
  const result=captainHistoryRisk(voyage,history);
  t.is(result,5);
})

rankTest('calculate the captainHistoryRisk when history>5 and all profit>0 and doesn\'t contain china',t=>{
  const voyage = {
    zone: 'west-indies',
    length: 10,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },{
      zone: 'china',
      profit: 2,
    },{
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'east-africa',
      profit: 1
    },{
      zone: 'east-asia',
      profit: 1
    }
  ];
  const result=captainHistoryRisk(voyage,history);
  t.is(result,1);
})

rankTest('calculate the captainHistoryRisk when history>5 and 2 profit<0 and doesn\'t contain china',t=>{
  const voyage = {
    zone: 'west-indies',
    length: 10,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: -15,
    },{
      zone: 'china',
      profit: -2,
    },{
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'east-africa',
      profit: 1
    },{
      zone: 'east-asia',
      profit: 1
    }
  ];
  const result=captainHistoryRisk(voyage,history);
  t.is(result,3);
})

rankTest('calculate the captainHistoryRisk when history>5 and all profit>0 and about china',t=>{
  const voyage = {
    zone: 'china',
    length: 10,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },{
      zone: 'west-indies',
      profit: 15,
    },{
      zone: 'china',
      profit: 2,
    },{
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'east-africa',
      profit: 1
    },{
      zone: 'east-asia',
      profit: 1
    }
  ];
  const result=captainHistoryRisk(voyage,history);
  t.is(result,0);
})

rankTest('calculate the captainHistoryRisk when history<5 and 1 profit<0 and about china',t=>{
  const voyage = {
    zone: 'china',
    length: 10,
  };
  const history = [{
      zone: 'china',
      profit: 2,
    },{
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'east-africa',
      profit: -1
    },{
      zone: 'east-asia',
      profit: 1
    }
  ];
  const result=captainHistoryRisk(voyage,history);
  t.is(result,4);
})