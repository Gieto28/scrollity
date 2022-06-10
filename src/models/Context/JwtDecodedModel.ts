/**
 * Object retrieved when decoding json web token
 */
interface JwtDecodedModel {
  _id: number;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

export default JwtDecodedModel;
