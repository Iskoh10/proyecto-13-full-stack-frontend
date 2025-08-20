import { Tag } from '@chakra-ui/react';
const TagItem = ({ color, left, top, transform, children }) => {
  return (
    <Tag
      size='md'
      variant='solid'
      colorScheme={color}
      borderRadius='10px'
      position='absolute'
      left={left}
      top={top}
      transform={transform}
    >
      {children}
    </Tag>
  );
};

export default TagItem;
