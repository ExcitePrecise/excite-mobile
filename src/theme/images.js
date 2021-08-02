import { Asset } from 'expo-asset'

// svg
import Logo from '../../assets/images/logo.svg'

export const svgs = {
  logo: Logo,
}

// png/jpeg
export const images = {
  logo_sm: require('../../assets/images/logo-sm.png'),
  logo_lg: require('../../assets/images/logo-lg.png'),
  market_bg: require('../../assets/images/market.png'),
  business_bg: require('../../assets/images/business.png'),
  electronic_icon:require('../../assets/images/electronicIcon.png'),
  hair_icon:require('../../assets/images/hair.png'),
  pets_icon:require('../../assets/images/pets.png'),
  phone_icon:require('../../assets/images/phone.png'),
  property_icon:require('../../assets/images/property.png'),
  repairs_icon:require('../../assets/images/repairs.png'),
  services_icon:require('../../assets/images/services.png'),
  kid_icon:require('../../assets/images/kids.png'),
  home_icon:require('../../assets/images/home.png'),
  vehicle_icon:require('../../assets/images/vehicle.png'),
  fashion_icon:require('../../assets/images/fashion.png'),
  tools_icon:require('../../assets/images/tools.png'),
  top_icon:require('../../assets/images/tools.png'),
}

// image preloading
export const imageAssets = Object.keys(images).map((key) => Asset.fromModule(images[key]).downloadAsync())
