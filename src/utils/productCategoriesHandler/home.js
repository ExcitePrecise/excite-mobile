
const homeGroup = [
  { name: "Furniture", sub: [] },
  { name: "Garden", sub: [] },
  { name: "Home Accessories", sub: [] },
  { name: "Home Appliance", sub: [] },
  { name: "Kitchen & Dining", sub: [] },
];
export const homeCategory=homeGroup.map(item=>item.name).sort()


export const subHome=(name)=>{
  const cat = homeGroup.filter(item=>item.name===name);
  return cat.sub
}
