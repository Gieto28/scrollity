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
import {v4 as uuid} from 'uuid';
import {
  CategoryArrayModel,
  CreatePostModel,
  SuccessResponse,
  SchemaCreatePost,
} from '../../models';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {AppScrollView} from '../../styles/GlobalStyle';
import {createPostAxios, uploadFileAxios} from '../../services';
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
  const [mediaValue, setMediaValue] = useState<any>();
  const [mediaUri, setMediaUri] = useState<string | undefined>(undefined);
  const [mediaType, setMediaType] = useState<string | undefined>(undefined);
  const [mediaHeight, setMediaHeight] = useState<number>(400);
  const [screenWidth, setScreenWidth] = useState<number>(
    Dimensions.get('window').width * 0.9,
  );
  const [imageError, setImageError] = useState(false);

  const navigation = useNavigation();

  //array of category
  const categoryArray: CategoryArrayModel[] = [
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

  const handleMediaState = async (): Promise<void> => {
    imageError === true && setImageError(false);

    setMediaUri(undefined);
    setMediaType(undefined);
    setMediaHeight(400);

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

    const media = res.assets![0];

    setMediaValue(media);

    setMediaUri(media.uri);
    setMediaType(media.type);

    if (media.width && media.height) {
      const calc: number = media.width / Dimensions.get('window').width;
      setMediaHeight(media.height / calc);
    }
  };

  const handleResetMedia = (): void => {
    setMediaUri(undefined);
    setMediaType(undefined);
    setMediaHeight(400);
  };

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const handleSelectOptions = (option: any, index: number): void => {
    setCategory(categoryArray[index].category);
  };

  const handleSubmitPost: SubmitHandler<CreatePostModel> = async (
    data: CreatePostModel,
  ) => {
    const {title, description} = data;

    const uniqueId: string = uuid();
    const user_id: string | null = await AsyncStorage.getItem('userId');

    const fileType = mediaType?.split('/')[0];
    const media_id = mediaUri
      ? `post.${user_id}.${fileType}.${uniqueId}.${mediaUri.split('.').pop()}`
      : null;

    if (mediaType && media_id && mediaUri) {
      try {
        const uploadResult: SuccessResponse = await uploadFileAxios(
          mediaUri,
          media_id,
          mediaType,
        );
        console.log(uploadResult);
        reset();
        handleResetMedia();
      } catch (e: any) {
        console.log('error when sending file');
        throw new Error(e.message);
      }
    }

    try {
      const postCreationResponse: SuccessResponse = await createPostAxios(
        user_id,
        title,
        description,
        media_id,
        category,
      );
      console.log(postCreationResponse);
    } catch (e: any) {
      console.log('error when sending post creation');
      throw new Error(e.message);
    }

    reset();
    handleResetMedia();
    setCategory('Other');
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
            minWidth: screenWidth,
          }}>
          <ImagePreview
            source={{uri: mediaUri ? mediaUri : placeholder}}
            resizeMode="stretch"
            style={{
              height: mediaHeight,
              minWidth: screenWidth,
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
