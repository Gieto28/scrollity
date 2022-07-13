import * as yup from 'yup';

const SchemaSearch = yup.object().shape({
  search: yup.string().required().max(100),
});

export default SchemaSearch;
