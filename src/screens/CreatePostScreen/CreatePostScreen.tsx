import React from 'react';
import {
  CreateBody,
  CreateHeader,
  CreatePostWrapper,
} from './Styled.CreatePostScreen';
import {IconComponent, InputTextComponent} from '../../components';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {ImageSourcePropType} from 'react-native';
import {useApp} from '../../context/App';

/**
 *
 * @returns a screen which it's only purpose is to show the user a form to create a new post
 */
const CreatePostScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      media: '',
      description: '',
      category: '',
    },
  });

  const {theme} = useApp();

  const leftArrowIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-left-dark-24.png')
    : require('../../assets/Images/arrow-left-light-24.png');

  const navigation = useNavigation();

  const categories = ['Top', 'New', 'Funny', 'Pet', 'Help', 'Other', 'Random'];

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <CreatePostWrapper>
      <CreateHeader>
        <IconComponent
          image={leftArrowIcon}
          altText={'Click here to go back to the previous screen'}
          onPress={handleGoBack}
        />
      </CreateHeader>
      <CreateBody>
        <InputTextComponent
          placeholder={'Title...'}
          value={''}
          label="Title"
          controllerName={'title'}
          control={control}
        />
        <InputTextComponent
          style={{height: 100, textAlignVertical: 'top'}}
          multiline={true}
          numberOfLines={4}
          label="Description"
          placeholder={'Description...'}
          value={''}
          controllerName={'description'}
          control={control}
        />
      </CreateBody>
    </CreatePostWrapper>
  );
};

export default CreatePostScreen;
