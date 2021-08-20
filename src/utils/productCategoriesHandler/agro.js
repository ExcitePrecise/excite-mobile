const PetsAgro = [
	{
		name: "Seeds",
		sub: []
	},
	{
		name: "Fertilizers",
		sub: []
	},
	{
		name: "Poultry",
		sub: []
	},
	{
		name: "Herbicides & Pesticides",
		sub: []
	},
	{
		name: "Farm Machinery & Equipments",
		sub: []
	}
]

export const agro = PetsAgro.map(item=>item.name).sort();