const vehicle=
[
    {name:"Cars"},
    {name:"Heavy Equipment"},
    {name:"Motocycles"},
    {name:"Tricycles"},
    {name:"Trucks & Trailers"},
    {name:"Parts & Accessories"},
]


export const vehiclesTypes=()=>{
    let cat = [];
  for (const i of vehicle) {
    if(!cat.includes(i.name)){
      cat.push(i.name)
    }
  }
  return cat
}

