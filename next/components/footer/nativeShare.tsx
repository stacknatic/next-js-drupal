import styles from "../../styles/nativeShare.module.css";
import { LuShare2 } from "react-icons/lu";


const NativeShare: React.FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
    }
  };

  return (
    
<div className="flex items-center">
  <span className="text-dark text-xxl mr-2 text-white">Share</span>
  <LuShare2 onClick={handleShare} className="shadow-xl bg-primary-500 p-2 text-white rounded-lg" size={32} />
</div>

  );
};

export default NativeShare;
