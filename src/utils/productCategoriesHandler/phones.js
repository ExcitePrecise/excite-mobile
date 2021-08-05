
const phoneGroup = [
  { name: "Accessories", sub: [] },
  { name: "Phones", sub: [] },
  { name: "Smart Watches", sub: [] },
  { name: "Tablets", sub: [] },
];


export const phoneCategory=phoneGroup.map(item=>item.name).sort()

export const subPhone=(name)=>{
  const cat = phoneGroup.filter(item=>item.name===name);
  return cat.sub
}
