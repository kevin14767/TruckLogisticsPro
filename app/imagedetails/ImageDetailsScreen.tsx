import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import styles from './ImageDetailsStyles';
import {ImageDetailRouteType, responseType} from './ImageDetailsTypes';
import {recognizeImage} from './ImageDetailsUtils';

const ImageDetailsScreen = () => {
  const route = useRoute<RouteProp<ImageDetailRouteType, 'imageDetails'>>();
  const [response, setResponse] = useState<Array<responseType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const uri = route?.params?.uri;
  const navigation = useNavigation();

  useEffect(() => {
    if (uri) {
      processImage(uri);
    }
  }, [uri]);

  const processImage = async (url: string) => {
    if (url) {
      try {
        const result = await recognizeImage(url);
        setIsLoading(false);
        if (result?.blocks?.length > 0) {
          setResponse(result?.blocks);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

};
export default ImageDetailsScreen;
