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
  SchemaCreatePost,
  FormCreatePostModel,
  FormControllerName,
} from '../../models';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {AppScrollView} from '../../styles/GlobalStyle';
import {createPostAxios, uploadFileAxios} from '../../services';
import AsyncStorage from '@react-native-community/async-storage';
import {useTranslation} from 'react-i18next';

/**
 *
 * @returns a screen which it's only purpose is to show the user a form to create a new post
 */
const CreatePostScreen: React.FC = () => {
  const {theme, changeLang} = useAppSettings();
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();

  const [category, setCategory] = useState<string>('Other');
  const [mediaUri, setMediaUri] = useState<string | undefined>(undefined);
  const [mediaType, setMediaType] = useState<string | undefined>(undefined);
  const [mediaHeight, setMediaHeight] = useState<number>(400);
  const [imageError, setImageError] = useState(false);

  const placeholder = require('../../assets/Images/image_preview.png');
  const screenWidth = Dimensions.get('window').width * 0.87;

  //array of category
  const categoryArray: CategoryArrayModel[] = [
    {category: 'Funny', lang: t('funny'), id: 0},
    {category: 'Pet', lang: t('pet'), id: 1},
    {category: 'Help', lang: t('help'), id: 2},
    {category: 'Other', lang: t('other'), id: 3},
  ];

  //form hook
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormCreatePostModel>({
    resolver: yupResolver(SchemaCreatePost),
  });

  const lang = i18n.language;

  const imageLanguage =
    lang === 'en'
      ? require('../../assets/Images/portugal.png')
      : require('../../assets/Images/united-kingdom.png');

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

    if (res!.assets![0].height! > 900) {
      setImageError(true);
      throw new Error('Image is too tall!');
    }

    const media = res.assets![0];

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

  const handleSelectOptions = (
    option: CategoryArrayModel,
    index: number,
  ): void => {
    setCategory(categoryArray[index].category);
  };

  const handleSubmitPost: SubmitHandler<FormCreatePostModel> = async (
    data: FormCreatePostModel,
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
        await uploadFileAxios(mediaUri, media_id, mediaType);
        reset();
        handleResetMedia();
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    try {
      await createPostAxios(user_id, title, description, media_id, category);
    } catch (e: any) {
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
            style={{marginLeft: 15}}
          />
          <IconComponent
            image={imageLanguage}
            altText={'Click here to change language '}
            onPress={() => changeLang()}
            style={{marginRight: 15}}
          />
        </CreateHeader>
        <LabelWrapper>
          <Label>{t('upload')}</Label>
        </LabelWrapper>
        <CreateBody>
          <InputTextComponent
            placeholder={t('title')}
            label={t('title')}
            controllerName={FormControllerName.TITLE}
            control={control}
            errors={errors.title}
          />
          <InputTextComponent
            multiline={true}
            numberOfLines={4}
            label={t('description')}
            placeholder={t('description')}
            controllerName={FormControllerName.DESCRIPTION}
            control={control}
            errors={errors.description}
          />
          <SelectWrapper>
            <SelectMediaWrapper onPress={handleMediaState}>
              <SelectMediaText>{t('media')}</SelectMediaText>
            </SelectMediaWrapper>
            <SelectDropdown
              defaultButtonText={t('dropdownDefaultText')}
              data={categoryArray}
              onSelect={(selectedItem, index) => {
                handleSelectOptions(selectedItem, index);
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              buttonStyle={{
                width: 130,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: theme.button.border,
                backgroundColor: theme.screen.background,
                borderRadius: 10,
              }}
              buttonTextAfterSelection={(selectedItem, _index) => {
                // text represented after item is selected
                return selectedItem.lang;
              }}
              rowTextForSelection={(item, _index) => {
                // text represented for each item in dropdown
                return item.lang;
              }}
            />
          </SelectWrapper>
        </CreateBody>
        {imageError && <ErrorLabel>{t('imageTooTall')}</ErrorLabel>}
        <ImageWrapper
          style={{
            height: mediaHeight,
            width: screenWidth,
          }}>
          <ImagePreview
            source={mediaUri ? {uri: mediaUri} : placeholder}
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
            name={t('sharePost')}
            onPress={handleSubmit(handleSubmitPost)}
            fontSize="28px"
          />
        </ButtonWrapper>
      </CreatePostWrapper>
    </AppScrollView>
  );
};

export default CreatePostScreen;
