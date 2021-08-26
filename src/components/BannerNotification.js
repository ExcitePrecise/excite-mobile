import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Banner } from 'react-native-paper'
import { Image } from 'react-native'
// import { CategoryMajor } from '../../utils/productCategoriesHandler';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../theme/theme'
import { popBanner } from '../slices/app.slice'
import { connect } from 'react-redux'

//
const BannerNotification = ({ banner, popBanner }) => {
  // Banner

  const handleBg = () => {
    switch (banner?.type) {
      case 'success':
        return COLORS.exciteGreen
      case 'error':
        return COLORS.red
      default:
        return COLORS.exciteGreen
    }
  }

  React.useEffect(() => {
    if (banner?.visible) {
      setTimeout(() => {
        popBanner({ visible: false, msg: '',type:"" })
      }, 4000)
    }
  }, [banner?.visible])
  return (
 
      <Banner
        visible={banner?.visible}
        actions={[]}
        icon={({ size }) => (
          <MaterialCommunityIcons
            name={banner?.icon ? banner?.icon : 'information-outline'}
            size={20}
            color={COLORS.white}
          />
        )}
        contentStyle={{color:COLORS.white}}
        style={{ backgroundColor: handleBg(), borderRadius:6}}
      >
        {banner?.msg ? banner?.msg : <Text>No message</Text>}
      </Banner>
  )
}

const mapStateToProps = (state) => {
  return {
    banner: state.app?.banner,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    popBanner: (payload) => dispatch(popBanner(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BannerNotification)

const styles = StyleSheet.create({})
