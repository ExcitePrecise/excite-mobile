const kids = [
  {
    name: "Fashion for boys",
    sub: []
  },
  {
    name: "Fashion for girls",
    sub: []
  },
  {
    name: "Baby essentials",
    sub: []
  },
  {
    name: "School store",
    sub: []
  },
  {
    name: "Travel and Safety gear",
    sub: []
  },
  {
    name: "Diapering and Daily care",
    sub: []
  },
  {
    name: "Kids Beddings and Decorations",
    sub: []
  },
  {
    name: "Maternity",
    sub: []
  },
  {
    name: "Toys",
    sub: []
  },
  {
    name: "Feeding",
    sub: ["anything"]
  }
]




export const kidsName = kids.map(arr =>arr.name)

export const returnSub =(category) => {
  const ty = kids.filter(item=>item.name===category);
  if(ty.length>0){
    return ty[0].sub.sort()
  }else{
  return []
  }
}
