import { useEffect, useRef, useState } from 'react';
import './Blog.css';
import { Flex, Heading, Spinner, Stack, useDisclosure } from '@chakra-ui/react';
import useCustomToast from '../../hooks/useCustomToast';
import { useUser } from '../../Providers/UserContext';
import useVote from '../../hooks/useVote';
import useAddComment from '../../hooks/useAddComment';
import CardBlog from '../../components/CardBlog/CardBlog';
import DetailsPostModal from '../../components/DetailsPostModal/DetailsPostModal';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useCustomToast();
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commentRef = useRef();
  const [loadingComment, setLoadingComment] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/blogs`
        );

        if (!res.ok) {
          throw new Error('Error al obtener los posts');
        }

        const data = await res.json();

        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPosts(sorted);
        setLoading(false);
      } catch (error) {
        showToast({
          title: 'Error',
          description: 'Error al obtener los posts',
          status: 'error'
        });
      }
    };
    fetchBlogs();
  }, []);

  const { handleVote, hasVote } = useVote({
    setItems: setPosts,
    selectedItem: selectedPost,
    setSelectedItem: setSelectedPost,
    showToast,
    user
  });

  const { handleAddComment } = useAddComment({
    commentRef,
    target: 'Blog',
    setLoadingComment,
    selectedItem: selectedPost,
    setSelectedItem: setSelectedPost,
    setItems: setPosts,
    showToast
  });

  if (loading)
    return (
      <Stack align='center' justify='center' height='100svh'>
        <Spinner size='xl' color='red' />
      </Stack>
    );

  return (
    <main className='blog'>
      <Heading align='center' py='4'>
        Nuestro Blog
      </Heading>
      <Flex wrap='wrap' gap={4} justify='center' paddingBottom={10}>
        {posts.map((post) => (
          <CardBlog
            key={post._id}
            setSelectedPost={setSelectedPost}
            post={post}
            onOpen={onOpen}
          />
        ))}
      </Flex>
      {selectedPost && (
        <DetailsPostModal
          isOpen={isOpen}
          onClose={onClose}
          selectedPost={selectedPost}
          user={user}
          handleVote={handleVote}
          hasVote={hasVote}
          commentRef={commentRef}
          handleAddComment={handleAddComment}
          loadingComment={loadingComment}
        />
      )}
    </main>
  );
};

export default Blog;
