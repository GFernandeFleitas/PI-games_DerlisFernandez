import loadingImage from "/loading_circle.gif";
import style from "./LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <div className={style.mainLoadingContainer}>
      <img className={style.loadingImage} src={loadingImage} alt="LOADING..." />
      <h3 className={style.loadingText}>
        LOADING
        <span className={style.dotone}> .</span>
        <span className={style.dottwo}> .</span>
        <span className={style.dotthree}> .</span>
      </h3>
    </div>
  );
};

export default LoadingPage;
