import React, {useState} from 'react';
import {
  CreateBody,
  CreateHeader,
  CreatePostWrapper,
  Label,
  LabelWrapper,
  SelectMediaText,
  SelectMediaWrapper,
  SelectWrapper,
} from './Styled.CreatePostScreen';
import {
  FormButtonComponent,
  IconComponent,
  InputTextComponent,
} from '../../components';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {ImageSourcePropType} from 'react-native';
import {useAppSettings} from '../../context';
import SelectDropdown from 'react-native-select-dropdown';
import {yupResolver} from '@hookform/resolvers/yup';
import {CreatePostModel, SchemaCreatePost} from '../../models';

/**
 *
 * @returns a screen which it's only purpose is to show the user a form to create a new post
 */
const CreatePostScreen = () => {
  const {theme} = useAppSettings();
  const [pickedCategory, setPickedCategory] = useState<string>('Other');

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<CreatePostModel>({
    resolver: yupResolver(SchemaCreatePost),
  });

  const leftArrowIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-left-dark-24.png')
    : require('../../assets/Images/arrow-left-light-24.png');

  const navigation = useNavigation();

  const categoryArray = [
    {category: 'Funny', id: 0},
    {category: 'Pet', id: 1},
    {category: 'Help', id: 2},
    {category: 'Other', id: 3},
    {category: 'Random', id: 4},
  ];

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const handleSubmitMedia = () => {
    console.log('submitting media button is working');
  };

  const handleSelectOptions = (option: any, index: number) => {
    console.log(option);
    setPickedCategory(categoryArray[index].category);
    console.log(pickedCategory);
  };

  const handleSubmitPost = async (data: CreatePostModel) => {
    console.log('data when submitting post', data);
    console.log(pickedCategory);
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
      <LabelWrapper>
        <Label>Upload Post</Label>
      </LabelWrapper>
      <CreateBody>
        <InputTextComponent
          placeholder={'Title...'}
          value={''}
          label="title"
          controllerName={'title'}
          control={control}
          errors={errors.title}
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
          errors={errors.description}
        />
        <SelectWrapper>
          <SelectMediaWrapper onPress={handleSubmitMedia}>
            <SelectMediaText>Media</SelectMediaText>
          </SelectMediaWrapper>
          <SelectDropdown
            defaultButtonText="Category"
            data={categoryArray}
            onSelect={(selectedItem, index) =>
              handleSelectOptions(selectedItem, index)
            }
            buttonStyle={{
              width: 130,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: theme.button.border,
              backgroundColor: theme.screen.background,
              borderRadius: 10,
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.category;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item.category;
            }}
          />
        </SelectWrapper>
        <FormButtonComponent
          name="Share Post"
          onPress={handleSubmit(handleSubmitPost)}
          fontSize="28px"
        />
      </CreateBody>
    </CreatePostWrapper>
  );
};

export default CreatePostScreen;
