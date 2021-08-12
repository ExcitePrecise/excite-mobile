import * as ImageManipulator from 'expo-image-manipulator'

export const ImageResizer = async (image) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    image.localUri || image.uri,
    [{ resize: { width: 350 , height:350} }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.PNG },
  )
  return manipResult
}

// const resizeImage = async image => {
//     const manipResult = await ImageManipulator.manipulateAsync(
//       image.localUri || image.uri,
//       [{ resize: { width: image.width * 0.5, height: image.height * 0.5 } }],
//       { compress: 0.7, format: ImageManipulator.SaveFormat.PNG }
//     );
// return manipResult
// }
