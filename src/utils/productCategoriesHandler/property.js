
const ppty = [
  { name: "Building", sub: [] },
  { name: "Apartment", sub: [] },
  { name: "Land", sub: [] },
  { name: "Estate", sub: [] },
];


export const pptyCategory=()=>{
  let cat = [];
  for (const i of ppty) {
    if(!cat.includes(i.name)){
      cat.push(i.name)
    }
  }
  return cat.sort()
}

export const subPpty=(name)=>{
  const cat = ppty.filter(item=>item.name===name);
  return cat.sub
}
