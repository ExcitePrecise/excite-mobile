
const ppty = [
  { name: "Building", sub: [] },
  { name: "Apartment", sub: [] },
  { name: "Land", sub: [] },
  { name: "Estate", sub: [] },
];


export const pptyCategory=ppty.map(item=>item.name).sort();

export const subPpty=(name)=>{
  const cat = ppty.filter(item=>item.name===name);
  return cat.sub
}
