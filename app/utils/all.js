import config from '../config/config.json';

const returnHeightWhenNativeViewLoaded = (nativeView) => {
  return new Promise((accept, reject) => {
    const checkViewLoaded = () => {
      const heightView = nativeView.getActualSize().height;
      if (heightView === 0) {
        setTimeout(() => { checkViewLoaded();}, 1);
      } else {
        accept(heightView);
      }
    };
    checkViewLoaded();
  });
};

const returnImageUrl = (pathUrl) => {
  return `${config.apiUrl}${pathUrl}`;
};

export default {
  returnHeightWhenNativeViewLoaded,
  returnImageUrl
};