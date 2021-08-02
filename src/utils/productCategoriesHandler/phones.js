
const phoneGroup = [
  { name: "Accessories", sub: [] },
  { name: "Phones", sub: [] },
  { name: "Smart Watches", sub: [] },
  { name: "Tablets", sub: [] },
];


export const phoneCategory=()=>{
  let cat = [];
  for (const i of phoneGroup) {
    if(!cat.includes(i.name)){
      cat.push(i.name)
    }
  }
  return cat
}

export const subPhone=(name)=>{
  const cat = phoneGroup.filter(item=>item.name===name);
  return cat.sub
}
