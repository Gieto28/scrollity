import {Animated, ImageSourcePropType, Text} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  IconComponent,
  InputTextComponent,
  PostComponent,
} from '../../components';
import {useForm} from 'react-hook-form';
import {AppScrollView, AppView} from '../../styles/GlobalStyle';
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
} from './Styled.HomeScreen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppSettings} from '../../context';
import {
  CategoryArrayModel,
  HomeStackParams,
  PostModel,
  SchemaSearch,
  SearchModel,
} from '../../models';
import {yupResolver} from '@hookform/resolvers/yup';
import {getAllPosts} from '../../services';

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

  // posts when app loads

  useFocusEffect(
    useCallback(() => {
      const loadPosts = async (): Promise<void> => {
        try {
          setLoading(true);
          console.log(loading);
          const res: {data: PostModel[]} = await getAllPosts(category);
          setPosts(res.data);
        } catch (e: any) {
          throw new Error(e.message);
        }
        setLoading(false);
        console.log(loading);
      };
      loadPosts();
    }, [category]),
  );

  // search handler
  const {control, handleSubmit} = useForm<SearchModel>({
    resolver: yupResolver(SchemaSearch),
  });

  const categoryArray: CategoryArrayModel[] = [
    {category: 'Top', id: 0},
    {category: 'New', id: 1},
    {category: 'Funny', id: 2},
    {category: 'Pet', id: 3},
    {category: 'Help', id: 4},
    {category: 'Other', id: 5},
    {category: 'Random', id: 6},
  ];

  const currentFilter: number = categoryArray[categoryId].id;

  const searchData = (data: SearchModel) => {
    console.log('search', data);
  };

  const handleAnimateOnScroll = (e: any) => {
    scrollY.setValue(e.nativeEvent.contentOffset.y);
    scrollYIconsWrapper.setValue(e.nativeEvent.contentOffset.y);
  };

  const navigation: CreatePostNavigationProp =
    useNavigation<CreatePostNavigationProp>();

  const handleRedirectToCreatePostScreen = () => {
    navigation.navigate('CreatePostScreen');
  };

  // const refScroll: React.MutableRefObject<ScrollView | null> =
  //   useRef<null>(null);
  // Can't find the type - losing too much time on this
  const refScroll: any = useRef<null>(null);

  const handleFilter = (index: number) => {
    refScroll?.current?.scrollTo({x: 0, y: 0, animated: true});
    setCategoryId(index);
    setCategory(categoryArray[index].category);
  };

  const handleBackToTop = () => {
    console.log('to top icon');
    refScroll?.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  console.log(posts.length);

  return (
    <HomeScreenWrapper>
      <Animated.View style={styledHeaderAnimation}>
        {/* <HorizontalScrollWrapper>
          <CategoryScroll horizontal> */}
        <CategoryView>
          {categoryArray.map((cat: any, index: number) => (
            <CategoryButton key={cat.id} onPress={() => handleFilter(index)}>
              <CategoryText>{cat.category}</CategoryText>
            </CategoryButton>
          ))}
        </CategoryView>
        {/* </CategoryScroll>
        </HorizontalScrollWrapper> */}
      </Animated.View>
      <AppScrollView ref={refScroll} onScroll={e => handleAnimateOnScroll(e)}>
        <HomeContentView>
          <LabelWrapper>
            <HomeLabel>{categoryArray[currentFilter].category}</HomeLabel>
          </LabelWrapper>
          <SearchView>
            <InputTextComponent
              value=""
              controllerName="search"
              placeholder="Search.."
              onPress={handleSubmit(searchData)}
              control={control}
              onSubmitEditing={handleSubmit(searchData)}
              icon={searchIcon}
            />
          </SearchView>
          {/* here goes a map of all of the posts being retrieved from the axios get */}
          {loading ? (
            <Text>Loading....</Text>
          ) : (
            posts.map((post: PostModel) => (
              <PostComponent
                key={post._id}
                title={post.title}
                media_id={post.media_id}
                description={post.description}
                upVotes={post.up_votes}
                downVotes={post.down_votes}
                postId={post._id}
                commentsAmount={post.comments}
                category={post.category}
                timeStamp={post.dateCreated}
                IconToCommentsScreen={true}
                postObject={post}
              />
            ))
          )}
        </HomeContentView>
      </AppScrollView>
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
