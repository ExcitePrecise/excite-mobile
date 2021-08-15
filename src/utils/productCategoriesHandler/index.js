import {electronicsTypes} from './electronics';
import {fashionCategory} from './fashion';
import {healthCategory} from './health';
import {phoneCategory} from './phones';
import {vehiclesTypes} from './vehicle'
import {pptyCategory} from './property'
import {kidsName} from './kids'
import { serviceTypes } from './services';
import { homeCategory } from './home';
import {agro} from './agro';
import { laptopCats } from './laptops';

export default {
    "electronics":electronicsTypes,
    "fashion":fashionCategory,
    "health":healthCategory,
    "phones-tablets":phoneCategory,
    "vehicle":vehiclesTypes,
    "Property":pptyCategory,
    "kids":kidsName,
    "services":serviceTypes,
    "home-kitchen-appliance":homeCategory,
    "agro":agro,
    "laptops-accessories":laptopCats
}

export const CategoryMajor = [
    {
        type:"Electronics & Accessories",
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
        type:"Phones & Tablets",
        key:"phones-tablets"
    },
    {
        type:"Baby & Kids",
        key:"kids"
    },
    {
        type:"Automobile",
        key:"vehicle"
    },
    {
        type:"Property & Real Estate",
        key:"Property"
    },
    {
        type:"Services & Repair Works",
        key:"services"
    },
    {
        type:"Home & Offices",
        key:"home-kitchen-appliance"
    },
    {
        type:"Pets & Agro",
        key:"agro"
    },
    {
        type:"Laptops & Accessories",
        key:"laptops-accessories"
    },
]

export const category = CategoryMajor.sort((a,b)=>a.type > b.type).map(item=>item.type)