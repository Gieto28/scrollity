import React, {useState} from 'react';
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
  RemoveMediaText,
  RemoveMediaButton,
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
import {SubmitHandler, useForm} from 'react-hook-form';
import {Dimensions, ImageSourcePropType} from 'react-native';
import {useAppSettings} from '../../context';
import SelectDropdown from 'react-native-select-dropdown';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  CategoryArrayProps,
  CreatePostModel,
  PostResponse,
  SchemaCreatePost,
} from '../../models';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {AppScrollView} from '../../styles/GlobalStyle';
import {createPostAxios} from '../../services';
import AsyncStorage from '@react-native-community/async-storage';

/**
 *
 * @returns a screen which it's only purpose is to show the user a form to create a new post
 */
const CreatePostScreen: React.FC = () => {
  const {theme} = useAppSettings();
  const [category, setCategory] = useState<string>('Other');
  const [placeholder, setPlaceholder] = useState<string>(
    'https://via.placeholder.com/400',
  );
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [mediaHeight, setMediaHeight] = useState<number>(400);
  const [mediaMaxWidth, setMediaMaxWidth] = useState<number>(
    Dimensions.get('window').width * 0.9,
  );
  const [imageError, setImageError] = useState(false);

  const navigation = useNavigation();

  //array of category
  const categoryArray: CategoryArrayProps[] = [
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

  const handleMediaState = async () => {
    imageError === true && setImageError(false);

    const res: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'mixed',
      maxWidth: 400,
      videoQuality: 'low',
    });

    if (res.errorCode) console.log(res.errorMessage);
    if (res.didCancel) console.log(res.didCancel);

    if (res!.assets![0].height! > 900) {
      setImageError(true);
      throw new Error('Image is too tall!');
    }

    if (res!.assets![0]) {
      const mediaValue = res!.assets![0];

      setMediaUri(mediaValue!.uri!);
      setMediaType(mediaValue!.type!);

      if (mediaValue.width && mediaValue.height) {
        setMediaMaxWidth(mediaValue.width);
        setMediaHeight(
          (mediaValue.height / mediaValue.width) * mediaValue.width,
        );
      }
    }
  };

  const handleResetMedia = () => {
    setMediaUri(null);
    setMediaType(null);
    setMediaHeight(400);
    setMediaMaxWidth(Dimensions.get('window').width * 0.9);
  };

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const handleSelectOptions = (option: any, index: number) => {
    setCategory(categoryArray[index].category);
  };

  const handleSubmitPost: SubmitHandler<CreatePostModel> = async (
    data: CreatePostModel,
  ) => {
    const {title, description} = data;
    try {
      const user_id: string | null = await AsyncStorage.getItem('userId');

      const data: PostResponse = await createPostAxios(
        user_id,
        title,
        description,
        mediaUri,
        mediaType,
        category,
      );

      console.log(data);
      reset();
      setMediaUri(null);
      setMediaType(null);
      setMediaHeight(400);
      setMediaMaxWidth(Dimensions.get('window').width * 0.9);
      setCategory('Other');
    } catch (e: any) {
      console.log(
        'error while sending data to createPostAxios in file createPostScreen',
      );
      throw new Error(e.message);
    }
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
            <SelectMediaWrapper onPress={handleMediaState}>
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
                return selectedItem.category;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                return item.category;
              }}
            />
          </SelectWrapper>
        </CreateBody>
        {imageError && <ErrorLabel>Image is too tall!</ErrorLabel>}
        <ImageWrapper
          style={{
            height: mediaHeight,
            maxWidth: mediaMaxWidth,
          }}>
          <ImagePreview
            source={{uri: mediaUri ? mediaUri : placeholder}}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </ImageWrapper>
        {mediaUri && (
          <RemoveMediaButton onPress={handleResetMedia}>
            <RemoveMediaText>Remove media</RemoveMediaText>
          </RemoveMediaButton>
        )}
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
