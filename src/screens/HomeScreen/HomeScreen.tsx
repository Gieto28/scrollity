import {
  Animated,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  IconComponent,
  InputTextComponent,
  PostComponent,
} from '../../components';
import {useForm} from 'react-hook-form';
import {
  CategoryButton,
  CategoryText,
  CategoryView,
  HomeLabel,
  HomeScreenWrapper,
  IconsWrapper,
  CreatePostIcon,
  LabelWrapper,
  scrollY,
  scrollYIconsWrapper,
  SearchView,
  styledHeaderAnimation,
  ToTopIconView,
  styledIConsWrapperAnimation,
  HomeContentView,
  PostWrapper,
  HomeScreenScroll,
} from './Styled.HomeScreen';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppSettings} from '../../context';
import {
  CategoryArrayModel,
  HomeStackParams,
  PostModel,
  SchemaSearch,
  FormSearchModel,
  FormControllerName,
} from '../../models';
import {yupResolver} from '@hookform/resolvers/yup';
import {getAllPostsAxios} from '../../services';
import {NoContentText, NoContentView} from '../../styles/GlobalStyle';
import {useTranslation} from 'react-i18next';
import getPostByTitleAxios from '../../services/post/getPostByTitleAxios';

type CreatePostNavigationProp = StackNavigationProp<
  HomeStackParams,
  'CreatePostScreen'
>;

/**
 *
 * @returns The home screen, middle screen on the AppStack
 */
const HomeScreen: React.FC = () => {
  const {theme} = useAppSettings();
  const {t} = useTranslation();
  const [categoryId, setCategoryId] = useState<number>(0);
  const [category, setCategory] = useState<string>('Top');
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/search-24-dark.png')
    : require('../../assets/Images/search-24-light.png');

  const createPostIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/add-50-dark.png')
    : require('../../assets/Images/add-50-light.png');

  const ToTopIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/to-top-46-dark.png')
    : require('../../assets/Images/to-top-46-light.png');

  const loadPosts = async (): Promise<void> => {
    try {
      setLoading(true);
      const res: {data: PostModel[]} = await getAllPostsAxios(category);
      setPosts(res.data);
    } catch (e: any) {
      throw new Error(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onRefresh = async () => {
    loadPosts();
  };

  // search handler
  const {control, handleSubmit} = useForm<FormSearchModel>({
    resolver: yupResolver(SchemaSearch),
  });

  const categoryArray: CategoryArrayModel[] = [
    {category: 'Top', lang: t('top'), id: 0},
    {category: 'New', lang: t('new'), id: 1},
    {category: 'Funny', lang: t('funny'), id: 2},
    {category: 'Pet', lang: t('pet'), id: 3},
    {category: 'Help', lang: t('help'), id: 4},
    {category: 'Other', lang: t('other'), id: 5},
    {category: 'Random', lang: t('random'), id: 6},
  ];

  const currentFilter: number = categoryArray[categoryId].id;

  const searchData = async (data: FormSearchModel) => {
    const res: PostModel[] = await getPostByTitleAxios(data.search);
    setPosts(res);
  };

  const handleAnimateOnScroll = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    scrollY.setValue(e.nativeEvent.contentOffset.y);
    scrollYIconsWrapper.setValue(e.nativeEvent.contentOffset.y);
  };

  const navigation: CreatePostNavigationProp =
    useNavigation<CreatePostNavigationProp>();

  const handleRedirectToCreatePostScreen = () => {
    navigation.navigate('CreatePostScreen');
  };

  const refScroll: any = useRef<any>(null);

  const handleFilter = (index: number) => {
    refScroll?.current?.scrollTo({x: 0, y: 0, animated: true});
    setCategoryId(index);
    setCategory(categoryArray[index].category);
  };

  const handleBackToTop = () => {
    refScroll?.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  const renderPosts = () => {
    return posts.length > 0 ? (
      posts.map((post: PostModel) => (
        <PostWrapper key={post._id}>
          <PostComponent IconToCommentsScreen={true} postObject={post} />
        </PostWrapper>
      ))
    ) : (
      <NoContentView>
        <NoContentText>{t('noPostsTitle')}</NoContentText>
        <NoContentText>{t('noPostsText')}</NoContentText>
      </NoContentView>
    );
  };

  return (
    <HomeScreenWrapper>
      <Animated.View style={styledHeaderAnimation}>
        <CategoryView>
          {categoryArray.map((cat: CategoryArrayModel, index: number) => (
            <CategoryButton key={cat.id} onPress={() => handleFilter(index)}>
              <CategoryText>{cat.lang}</CategoryText>
            </CategoryButton>
          ))}
        </CategoryView>
      </Animated.View>
      <HomeScreenScroll
        ref={refScroll}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          handleAnimateOnScroll(e)
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[theme.screen.secondaryColor]}
            tintColor={theme.screen.secondaryColor}
            progressViewOffset={300}
          />
        }>
        <HomeContentView>
          <LabelWrapper>
            <HomeLabel>{categoryArray[currentFilter].lang}</HomeLabel>
          </LabelWrapper>
          <SearchView>
            <InputTextComponent
              controllerName={FormControllerName.SEARCH}
              placeholder={t('search')}
              onPress={handleSubmit(searchData)}
              control={control}
              onSubmitEditing={handleSubmit(searchData)}
              icon={searchIcon}
            />
          </SearchView>
          {loading ? null : renderPosts()}
        </HomeContentView>
      </HomeScreenScroll>
      <Animated.View style={styledIConsWrapperAnimation}>
        <IconsWrapper>
          <ToTopIconView>
            <IconComponent
              altText="This icon moves you to the top of the screen"
              image={ToTopIcon}
              onPress={handleBackToTop}
            />
          </ToTopIconView>
          <CreatePostIcon>
            <IconComponent
              altText="This icon navigates you to the create post screen"
              image={createPostIcon}
              onPress={handleRedirectToCreatePostScreen}
            />
          </CreatePostIcon>
        </IconsWrapper>
      </Animated.View>
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
