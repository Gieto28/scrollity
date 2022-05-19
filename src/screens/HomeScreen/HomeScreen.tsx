import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {InputTextComponent} from '../../components';
import {SearchComponent} from '../../components';
import {useForm} from 'react-hook-form';
import {AppScrollView, AppView} from '../../styles/GlobalStyle';
import {HomeLabel, LabelWrapper} from './Styled.HomeScreen';

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

  const category = ['Top', 'New', 'Funny', 'Pet', 'Help'];

  return (
    <AppScrollView>
      <AppView>
        <LabelWrapper>
          <HomeLabel>{category[0]}</HomeLabel>
        </LabelWrapper>
        <SearchComponent
          value=""
          controllerName="search"
          placeholder="Search.."
          onPress={handleSubmit(searchData)}
          control={control}
          onSubmitEditing={handleSubmit(searchData)}
        />
      </AppView>
    </AppScrollView>
  );
};

export default HomeScreen;
