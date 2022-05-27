import {View} from 'react-native';
import React, {useState} from 'react';
import {InputTextComponent, PostComponent} from '../../components';
import {useForm} from 'react-hook-form';
import {AppScrollView, AppView} from '../../styles/GlobalStyle';
import {
  CategoryButton,
  CategoryScroll,
  CategoryText,
  CategoryView,
  HomeLabel,
  LabelWrapper,
  SearchView,
} from './Styled.HomeScreen';
import {searchIcon} from '../../assets/imagesIndex';

interface CategoryArrayProps {
  category: string;
  id: number;
}

const HomeScreen = () => {
  // search handler
  const {control, handleSubmit} = useForm({
    defaultValues: {
      search: '',
    },
  });

  const [categoryArray, setCategoryArray] = useState<CategoryArrayProps[]>([
    {category: 'Top', id: 0},
    {category: 'New', id: 1},
    {category: 'Funny', id: 2},
    {category: 'Pet', id: 3},
    {category: 'Help', id: 4},
  ]);

  const [categoryId, setCategoryId] = useState<number>(0);

  const searchData = (data: {}) => {
    console.log('search', data);
  };

  const currentFilter = categoryArray[categoryId].id;

  const handleFilter = (index: number) => {
    setCategoryId(index);
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

  return (
    <AppScrollView>
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
        <CategoryScroll horizontal={true}>
          <CategoryView>
            {categoryArray.map((cat: any, index: number) => (
              <View key={cat.id}>
                <CategoryButton onPress={() => handleFilter(index)}>
                  <CategoryText>{cat.category}</CategoryText>
                </CategoryButton>
              </View>
            ))}
          </CategoryView>
        </CategoryScroll>
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
      </AppView>
    </AppScrollView>
  );
};

export default HomeScreen;
