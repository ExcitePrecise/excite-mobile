
const health = [
  {
    name: "Make Up",
    sub: [],
  },
  {
    name: "Hair Care",
    sub: [],
  },
  {
    name: "Personal Care",
    sub: [],
  },
  {
    name: "Health Care",
    sub: [],
  },
  {
    name: "Oral Care",
    sub: [],
  },
  {
    name: "Fragrance",
    sub: [],
  },
];

export const healthCategory=health.map(item=>item.name).sort()

export const subHealth=(name)=>{
  const cat = health.filter(item=>item.name===name);
  return cat.sub
}
