// JSON
let values = {
    1: {
      carrier: "CCH",
      service: "DEX"
    },
    17: {
      carrier: "CHP",
      service: "express"
    }
  };
  // JSON
  let json = {
    data: {
      BUIN: {
        limit: 1,
        over_carrier_service_id: 17,
        under_carrier_service_id: 17
      },
      LAJA: {
        limit: 1,
        over_carrier_service_id: 1,
        under_carrier_service_id: 1
      },
      LEBU: {
        limit: 1,
        over_carrier_service_id: 1,
        under_carrier_service_id: 1
      },
      LOTA: {
        limit: 1,
        over_carrier_service_id: 17,
        under_carrier_service_id: 17
      }
    }
  };
  
  //copia la entrada
  let copy = JSON.parse(JSON.stringify(json));
  
  //devuelve las llaves
  const keys = Object.keys(json.data);
  
  //transforma el json
  keys.forEach((key) => {
    const keyToReplace = copy.data[key].over_carrier_service_id;
    const keyToReplace2 = copy.data[key].under_carrier_service_id;
  
    delete copy.data[key].over_carrier_service_id;
    delete copy.data[key].under_carrier_service_id;
  
    copy.data[key].over = values[keyToReplace];
    copy.data[key].under = values[keyToReplace2];
  });
  
  console.log(copy);
  