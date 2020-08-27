function includeMAOrCT(anOrder){
  return anOrder.deliveryState==='MA'||anOrder.deliveryState==='CT';
}

function includeNYOrNH(anOrder){
  return anOrder.deliveryState==='NY'||anOrder.deliveryState==='NH';
}

function includeMAOrCTOrNY(anOrder){
  return anOrder.deliveryState==='MA'||anOrder.deliveryState==='CT'||anOrder.deliveryState==='NY';
}

function includeMEOrNH(anOrder){
  return anOrder.deliveryState==='ME'||anOrder.deliveryState==='NH';
}

function deliveryDate (anOrder, isRush) {
  if (isRush) {
    let deliveryTime;
    if (includeMAOrCT(anOrder)) {
      deliveryTime = 1;
    }
    else if (includeNYOrNH(anOrder)) {
      deliveryTime = 2;
    }
    else {
      deliveryTime = 3;
    }
    return anOrder.placedOn.plusDays(1 + deliveryTime);
  }
  else {
    let deliveryTime;
    if (includeMAOrCTOrNY(anOrder)) {
      deliveryTime = 2;
    }
    else if (includeMEOrNH(anOrder)) {
      deliveryTime = 3;
    }
    else {
      deliveryTime = 4;
    }
    return anOrder.placedOn.plusDays(2 + deliveryTime);
  }
}
