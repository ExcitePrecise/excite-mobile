const service=[  
{ name: "Fashion & Designs" },
{ name: "Food & Catering" },
{ name: "Electrical Work" },
{ name: "Entertainment" },
{ name: "Plumbering" },
{ name: "Art & Craft" },
{ name: "Herbal Mixture" },
{ name: "Capentry" },
{ name: "Educational Services" },
{ name: "Health" },
{ name: "Hospitality & Tourism" },
{ name: "Engineering" },
{ name: "Architectural Work" },
{ name: "Science Labs" },
]



export const serviceTypes=()=>{
    let cat = [];
  for (const i of service) {
    if(!cat.includes(i.name)){
      cat.push(i.name)
    }
  }
  return cat.sort()
}