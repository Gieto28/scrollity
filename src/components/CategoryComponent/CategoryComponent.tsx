import React from 'react';
import {CategoryButton, CategoryText} from './Styled.CategoryComponent';

interface Props {
  name: string;
}

const filterArray = (name: string) => {
  console.log(name);
};

/**
 *
 * @param {string} name name of the category
 * @returns a simple button with a name of a category
 */
const CategoryComponent: React.FC<Props> = ({name}) => {
  return (
    <CategoryButton onPress={() => filterArray(name)}>
      <CategoryText>{name}</CategoryText>
    </CategoryButton>
  );
};

export default CategoryComponent;
