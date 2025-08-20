import './Bg404.css';

const Bg404 = () => {
  const images = Array.from(
    { length: 10 },
    (_, i) => `/assets/bg404/${i + 1}.png`
  );

  const getRandomStyle = () => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = 30 + Math.random() * 70;

    return {
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}px`,
      height: 'auto',
      transform: 'translate(-50%, -50%)',
      opacity: 0.5 + Math.random() * 0.5,
      pointerEvents: 'none'
    };
  };

  return (
    <div className='bg404-wrapper'>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`bg-${index}`}
          style={getRandomStyle()}
        />
      ))}
    </div>
  );
};

export default Bg404;
