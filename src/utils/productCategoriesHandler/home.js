
const homeGroup = [
  { name: "Furniture", sub: [] },
  { name: "Garden", sub: [] },
  { name: "Home Accessories", sub: [] },
  { name: "Home Appliance", sub: [] },
  { name: "Kitchen & Dining", sub: [] },
];

export const homeCategory=()=>{
  let cat = [];
  for (const i of homeGroup) {
    if(!cat.includes(i.name)){
      cat.push(i.name)
    }
  }
  return cat
}

export const subHome=(name)=>{
  const cat = homeGroup.filter(item=>item.name===name);
  return cat.sub
}
