import {
  ActivityIndicator,
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
import {useApp} from '../../context';
import {
  CategoryModel,
  HomeStackParams,
  PostModel,
  SchemaSearch,
  FormSearchModel,
  FormControllerName,
} from '../../models';
import {yupResolver} from '@hookform/resolvers/yup';
import {getAllPostsAxios} from '../../services';
import {NoContentText, NoContentView} from '../../styles/GlobalStyle';
import getPostByTitleAxios from '../../services/post/getPostByTitleAxios';
import {useTranslation} from 'react-i18next';

type CreatePostNavigationProp = StackNavigationProp<
  HomeStackParams,
  'CreatePostScreen'
>;

/**
 *
 * @returns The home screen, middle screen on the AppStack
 */
const HomeScreen: React.FC = () => {
  const {theme} = useApp();
  const {t} = useTranslation();
  const take: number = 6;

  const [categoryId, setCategoryId] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [category, setCategory] = useState<string>('Top');
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

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
    setSkip(0);
    try {
      setLoading(true);
      const res: {data: PostModel[]} = await getAllPostsAxios(
        category,
        take,
        skip,
      );
      setPosts(res.data);
    } catch (e: any) {
      throw new Error(e.message);
    }
    setLoading(false);
  };

  const loadMorePosts = async () => {
    setSkip(skip + 1);
    try {
      setLoadingMore(true);
      const res: {data: PostModel[]} = await getAllPostsAxios(
        category,
        take,
        skip,
      );
      setPosts(posts.concat(res.data));
    } catch (e: any) {
      throw new Error(e.message);
    }
    setLoadingMore(false);
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onRefresh = async () => {
    setSkip(0);
    loadPosts();
  };

  // search handler
  const {control, handleSubmit} = useForm<FormSearchModel>({
    resolver: yupResolver(SchemaSearch),
  });

  const categoryArray: CategoryModel[] = [
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

  const refScroll: any = useRef<any>(null);

  const handleFilter = async (index: number) => {
    setSkip(0);
    await refScroll?.current?.scrollTo({x: 0, y: 0, animated: true});
    setCategoryId(index);
    setCategory(categoryArray[index].category);
  };

  const renderPosts = () => {
    return posts.length > 0 ? (
      posts.map((post: PostModel, index: number) => (
        <PostWrapper key={index}>
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

  const isCloseToBottom = (e: NativeScrollEvent) => {
    return (
      e.layoutMeasurement.height + e.contentOffset.y >=
      e.contentSize.height - 200
    );
  };

  const navigation: CreatePostNavigationProp =
    useNavigation<CreatePostNavigationProp>();

  return (
    <HomeScreenWrapper>
      <Animated.View style={styledHeaderAnimation}>
        <CategoryView>
          {categoryArray.map((cat: CategoryModel, index: number) => (
            <CategoryButton key={cat.id} onPress={() => handleFilter(index)}>
              <CategoryText>{cat.lang}</CategoryText>
            </CategoryButton>
          ))}
        </CategoryView>
      </Animated.View>
      <HomeScreenScroll
        ref={refScroll}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          handleAnimateOnScroll(e);
          if (posts.length > 0 && isCloseToBottom(e.nativeEvent)) {
            setSkip(skip + 1);
            loadMorePosts();
          }
        }}
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
          {!loading && renderPosts()}
          {loadingMore && <ActivityIndicator size={'large'} />}
        </HomeContentView>
      </HomeScreenScroll>
      <Animated.View style={styledIConsWrapperAnimation}>
        <IconsWrapper>
          <ToTopIconView>
            <IconComponent
              altText="This icon moves you to the top of the screen"
              image={ToTopIcon}
              onPress={() =>
                refScroll?.current?.scrollTo({x: 0, y: 0, animated: true})
              }
            />
          </ToTopIconView>
          <CreatePostIcon>
            <IconComponent
              altText="This icon navigates you to the create post screen"
              image={createPostIcon}
              onPress={() => navigation.navigate('CreatePostScreen')}
            />
          </CreatePostIcon>
        </IconsWrapper>
      </Animated.View>
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
