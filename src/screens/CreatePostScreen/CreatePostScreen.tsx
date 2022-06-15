import React, {useEffect, useState} from 'react';
import {
  ButtonWrapper,
  CreateBody,
  CreateHeader,
  CreatePostWrapper,
  ErrorLabel,
  ImagePreview,
  ImageWrapper,
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
import {Dimensions, ImageSourcePropType} from 'react-native';
import {useAppSettings} from '../../context';
import SelectDropdown from 'react-native-select-dropdown';
import {yupResolver} from '@hookform/resolvers/yup';
import {CreatePostModel, SchemaCreatePost} from '../../models';
import ImagePicker, {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {AppScrollView} from '../../styles/GlobalStyle';

/**
 *
 * @returns a screen which it's only purpose is to show the user a form to create a new post
 */
const CreatePostScreen = () => {
  const {theme} = useAppSettings();
  const [pickedCategory, setPickedCategory] = useState<string>('Other');
  const [pickedMedia, setPickedMedia] = useState<string | null>(null);

  const navigation = useNavigation();

  //array of category
  const categoryArray = [
    {category: 'Funny', id: 0},
    {category: 'Pet', id: 1},
    {category: 'Help', id: 2},
    {category: 'Other', id: 3},
    {category: 'Random', id: 4},
  ];

  //form hook
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

  //
  //
  const [filePath, setFilePath] = useState({});
  const [image, setImage] = useState<string | undefined>(
    'https://via.placeholder.com/400',
  );
  const [imageHeight, setImageHeight] = useState<number | undefined>(400);
  const [imageError, setImageError] = useState(false);

  // : require('../../assets/Images/image_preview.png')
  //
  //
  const handleSubmitMedia = async () => {
    console.log('submitting media button is working');

    imageError === true && setImageError(false);

    const res: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'mixed',
      maxWidth: 400,
      videoQuality: 'low',
      presentationStyle: 'popover',
    });

    if (res.errorCode) console.log(res.errorMessage);
    if (res.didCancel) console.log(res.didCancel);

    if (res!.assets![0].height! > 900) {
      setImageError(true);
      throw new Error('Image is too tall!');
    }

    const mediaValue = res!.assets!;

    const uriPath = mediaValue![0].uri!;
    setImage(uriPath!);
    setImageHeight(mediaValue![0].height! ?? 400);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const handleSelectOptions = (option: any, index: number) => {
    console.log(option);
    setPickedCategory(categoryArray[index].category);
    console.log(pickedCategory);
  };

  const handleSubmitPost = async (data: CreatePostModel) => {
    console.log('data when submitting post', data);
    console.log(pickedCategory);
    console.log(pickedMedia);
  };

  return (
    <AppScrollView>
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
              buttonTextStyle={{}}
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
        </CreateBody>
        {imageError && <ErrorLabel>Image is too tall!</ErrorLabel>}
        <ImageWrapper>
          <ImagePreview
            source={{uri: image}}
            style={{
              resizeMode: 'cover',
              width: Dimensions.get('window').width * 0.9,
              height: imageHeight ? imageHeight : '100%',
            }}
          />
        </ImageWrapper>
        <ButtonWrapper>
          <FormButtonComponent
            name="Share Post"
            onPress={handleSubmit(handleSubmitPost)}
            fontSize="28px"
          />
        </ButtonWrapper>
      </CreatePostWrapper>
    </AppScrollView>
  );
};

export default CreatePostScreen;
