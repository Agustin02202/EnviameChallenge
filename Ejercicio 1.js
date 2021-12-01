const esPrimo = (numero) => {
    // Casos especiales
    if (numero == 0 || numero == 1 || numero == 4) return false;
    for (let x = 2; x < numero / 2; x++) {
      if (numero % x == 0) return false;
    }
    // Si no se pudo dividir por ninguno de los de arriba, sí es primo
    return true;
  };
  
  function numPrimos(a, b) {
    //arreglo de numeros primos
    const primos = [];
  
    //bucle que genera el rango entre a y b
    for (let i = a; i <= b; i++) {
      //comprobacion si es primo o no
      if (esPrimo(i)) {
        //agrega al array el numero primo
        primos.push(i);
      }
    }
    //te devuelve el arreglo con los numeros primos
    return primos;
  }
  
  const rangoA = 2;
  const rangoB = 10;
  console.log(numPrimos(rangoA, rangoB));
  