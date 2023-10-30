import React from 'react';
import styles from '../../styles/nativeShare.module.css';

const ShareButton: React.FC<{ title: string; url: string }> = ({ title, url }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      console.log('Web Share API not supported');
    }
  };

  return (
    <button onClick={handleShare} className={styles.button}>
      Share
    </button>
  );
};

export default ShareButton;