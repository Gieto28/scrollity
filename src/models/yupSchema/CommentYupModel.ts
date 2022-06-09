import * as yup from 'yup';

const SchemaComment = yup.object().shape({
  comment: yup.string().required().min(3).max(255),
});

export default SchemaComment;
