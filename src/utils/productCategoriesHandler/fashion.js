
const fashionGroup = [
  {
    name: "Bags",
    sub: [],
  },
  {
    name: "Clothings",
    sub: [],
  },
  {
    name: "Jewelry",
    sub: [],
  },
  {
    name: "Shoes & Foot Wears",
    sub: [],
  },
  {
    name: "Wrist Watches",
    sub: [],
  },
  {
    name: "Wedding Wears & Accessories",
    sub: [],
  },
];

export const fashionCategory=fashionGroup.map(item=>item.name).sort()

export const subFashion=(name)=>{
  const cat = fasionGroup.filter(item=>item.name===name);
  return cat.sub
}
