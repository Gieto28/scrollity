import React from 'react';
import Svg, {Circle, Defs} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
}

const ProfileIcon: React.FC<Props> = ({color, size}) => {
  return (
    <Svg width={size} height={size} fill={color}>
      <Defs>
        <clipPath id="circular-border">
          <circle cx="300" cy="300" r="280" />
        </clipPath>
        <clipPath id="avoid-antialiasing-bugs">
          <rect width="100%" height="498" />
        </clipPath>
      </Defs>

      <Circle
        cx="300"
        cy="300"
        r="280"
        fill="black"
        clip-path="url(#avoid-antialiasing-bugs)"
      />
      <Circle cx="300" cy="230" r="115" />
      <Circle cx="300" cy="550" r="205" clip-path="url(#circular-border)" />
    </Svg>
  );
};

export default ProfileIcon;
