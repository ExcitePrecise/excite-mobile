import {electronicsTypes} from './electronics';
import {fashionCategory} from './fashion';
import {healthCategory} from './health';
import {phoneCategory} from './phones';
import {vehiclesTypes} from './vehicle'
import {pptyCategory} from './property'
import {kidsName} from './kids'


export default {
    "electronics":electronicsTypes,
    "fashion":fashionCategory,
    "health":healthCategory,
    "phones-tablets":phoneCategory,
    "vehicle":vehiclesTypes,
    "Property":pptyCategory,
    "kids":kidsName,
}

export const CategoryMajor = [
    {
        type:"Electronics",
        key:"electronics"
    },
    {
        type:"Fashion & Styles",
        key:"fashion"
    },
    {
        type:"Health & Beauty",
        key:"health"
    },
    {
        type:"Automobile",
        key:"vehicle"
    },
    {
        type:"Property & Real Estate",
        key:"Property"
    }
]

export const category = CategoryMajor.map(item=>item.type).sort((a,b)=>a.type > b.type)