const voyage = {
  zone: 'west-indies',
  length: 10,
};
const history = [{
    zone: 'east-indies',
    profit: 5,
  }, {
    zone: 'west-indies',
    profit: 15,
  }, {
    zone: 'china',
    profit: -2,
  },
  {
    zone: 'west-africa',
    profit: 7,
  },
];

function hasChina(history) {
  return history.some(v => 'china' === v.zone);
}

function isContainChinaOrEastIndies(voyage) {
  return voyage.zone === 'china' || voyage.zone === 'east-indies';
}

function aboutChina(voyage, history) {
  return voyage.zone === 'china' && hasChina(history)
}

function voyageRisk(voyage) {
  let result = 1;
  voyage.length > 4 ? result += 2 : result;
  voyage.length > 8 ? result += voyage.length - 8 : result;
  return isContainChinaOrEastIndies(voyage) ? result += 4 : result;
}

function captainHistoryRisk(voyage, history) {
  let result = 1;
  history.length < 5 ? result += 4 : result;
  result += history.filter(v => v.profit < 0).length;
  return Math.max(aboutChina(voyage, history) ? result -= 2 : result, 0);
}

function voyageProfitFactor(voyage, history) {
  let result = 2;
  isContainChinaOrEastIndies(voyage) ? result += 1 : result;
  if (aboutChina(voyage, history)) {
    result += 3;
    history.length > 10 ? result += 1 : result;
    voyage.length > 12 ? result += 1 : result;
    voyage.length > 18 ? result -= 1 : result;
  } else {
    history.length > 8 ? result += 1 : result;
    voyage.length > 14 ? result -= 1 : result;
  }
  return result;
}

function rating(voyage, history) {
  const profit = voyageProfitFactor(voyage, history);
  const risk = voyageRisk(voyage);
  const riskOfCaptain = captainHistoryRisk(voyage, history);
  if (profit * 3 > (risk + riskOfCaptain * 2)) {
    return 'A';
  } else {
    return 'B';
  }
}

module.exports = {
  voyageRisk,
  rating,
  voyageProfitFactor,
  captainHistoryRisk,
  hasChina
};

const myRating = rating(voyage, history);
console.log(`myRating: ${myRating}`);