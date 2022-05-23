import {View} from 'react-native';
import React, {useState} from 'react';
import {PostComponent, SearchComponent} from '../../components';
import {useForm} from 'react-hook-form';
import {AppScrollView, AppView} from '../../styles/GlobalStyle';
import {
  CategoryButton,
  CategoryScroll,
  CategoryText,
  CategoryView,
  HomeLabel,
  LabelWrapper,
} from './Styled.HomeScreen';

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

  const searchData = (data: {}) => {
    console.log('search', data);
  };

  const [categoryId, setCategoryId] = useState<number>(0);

  const [categoryArray, setCategoryArray] = useState<CategoryArrayProps[]>([
    {category: 'Top', id: 0},
    {category: 'New', id: 1},
    {category: 'Funny', id: 2},
    {category: 'Pet', id: 3},
    {category: 'Help', id: 4},
  ]);

  const currentFilter = categoryArray[categoryId].id;

  const handleFilter = (index: number) => {
    console.log(index);
    setCategoryId(index);
  };

  const fakePost = {
    postId: '0101-postId-0101',
    title: 'example',
    source: require('../../assets/Images/Logo-NBG.png'),
    description: 'a description',
    upVotes: 4,
    downVotes: 2,
    commentsAmount: 1,
  };

  return (
    <AppScrollView>
      <AppView>
        <LabelWrapper>
          <HomeLabel>{categoryArray[currentFilter].category}</HomeLabel>
        </LabelWrapper>
        <SearchComponent
          value=""
          controllerName="search"
          placeholder="Search.."
          onPress={handleSubmit(searchData)}
          control={control}
          onSubmitEditing={handleSubmit(searchData)}
        />
        <CategoryScroll horizontal={true}>
          <CategoryView>
            {categoryArray.map((cat: any, index: number) => {
              return (
                <View key={cat.id}>
                  <CategoryButton onPress={() => handleFilter(index)}>
                    <CategoryText>{cat.category}</CategoryText>
                  </CategoryButton>
                </View>
              );
            })}
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
          comments={true}
          postObject={fakePost}
        />
      </AppView>
    </AppScrollView>
  );
};

export default HomeScreen;
