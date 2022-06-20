import {Animated, ImageSourcePropType} from 'react-native';
import React, {useRef, useState} from 'react';
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
} from './Styled.HomeScreen';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppSettings} from '../../context';
import {
  CategoryArrayProps,
  HomeStackParams,
  SchemaSearch,
  SearchModel,
} from '../../models';
import {yupResolver} from '@hookform/resolvers/yup';

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

  const searchIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/search-24-dark.png')
    : require('../../assets/Images/search-24-light.png');

  const createPostIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/add-50-dark.png')
    : require('../../assets/Images/add-50-light.png');

  const ToTopIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/to-top-46-dark.png')
    : require('../../assets/Images/to-top-46-light.png');

  // search handler
  const {control, handleSubmit} = useForm<SearchModel>({
    resolver: yupResolver(SchemaSearch),
  });

  const categoryArray: CategoryArrayProps[] = [
    {category: 'Top', id: 0},
    {category: 'New', id: 1},
    {category: 'Funny', id: 2},
    {category: 'Pet', id: 3},
    {category: 'Help', id: 4},
    {category: 'Other', id: 5},
    {category: 'Random', id: 6},
  ];

  const [categoryId, setCategoryId] = useState<number>(0);

  const searchData = (data: {}) => {
    console.log('search', data);
  };

  const fakePost = {
    postId: '0101-postId-0101',
    title:
      'what if instead of example as an example of a title this becomes a really long title',
    source: require('../../assets/Images/Logo-NBG.png'),
    description:
      'a very unnecessary long description with lots of details about the post, video, image etc',
    upVotes: 4,
    downVotes: 2,
    commentsAmount: 1,
    timeStamp: '2d ago',
    category: 'Top',
  };

  const currentFilter: number = categoryArray[categoryId].id;

  const handleFilter = (index: number) => {
    setCategoryId(index);
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

  const handleBackToTop = () => {
    console.log('to top icon');
    refScroll?.current?.scrollTo({x: 0, y: 0, animated: true});
  };

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
        <AppView>
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
          <PostComponent
            title={fakePost.title}
            source={fakePost.source}
            description={fakePost.description}
            upVotes={fakePost.upVotes}
            downVotes={fakePost.downVotes}
            postId={fakePost.postId}
            commentsAmount={fakePost.commentsAmount}
            category={fakePost.category}
            timeStamp={fakePost.timeStamp}
            IconToCommentsScreen={true}
            postObject={fakePost}
          />
          <PostComponent
            title={fakePost.title}
            source={fakePost.source}
            description={fakePost.description}
            upVotes={fakePost.upVotes}
            downVotes={fakePost.downVotes}
            postId={fakePost.postId}
            commentsAmount={fakePost.commentsAmount}
            category={fakePost.category}
            timeStamp={fakePost.timeStamp}
            IconToCommentsScreen={true}
            postObject={fakePost}
          />
          <PostComponent
            title={fakePost.title}
            source={fakePost.source}
            description={fakePost.description}
            upVotes={fakePost.upVotes}
            downVotes={fakePost.downVotes}
            postId={fakePost.postId}
            commentsAmount={fakePost.commentsAmount}
            category={fakePost.category}
            timeStamp={fakePost.timeStamp}
            IconToCommentsScreen={true}
            postObject={fakePost}
          />
        </AppView>
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
