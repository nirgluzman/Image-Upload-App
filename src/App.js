import { useState } from 'react';

import ImageUploader from 'react-images-upload';

import './App.css';

const UploadComponent = (props) => {
  return (
    <form>
      <label>
        File upload URL:
        <input
          id='urlInput'
          type='text'
          onChange={props.onUrlChange}
          value={props.url}
        />
      </label>
      <ImageUploader
        key='image-uploader'
        withIcon={true}
        singleImage={true}
        withPreview={true}
        label='Maximum size file: 5MB'
        buttonText='Choose an image'
        onChange={props.onImage}
        imgExtension={['.jpg', '.png', '.jpeg']}
        maxFileSize={5242880}
      ></ImageUploader>
    </form>
  );
};

const App = () => {
  const [progress, setProgress] = useState('getUpload');
  const [url, setImageUrl] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState('');

  const onUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const onImage = async (failedImages, successImages) => {
    if (!url) {
      console.log('missing URL');
      setErrorMessage('URL is missing');
      setProgress('uploadError');
      return;
    }

    setProgress('uploading');
    try {
      console.log('successImages', successImages);
    } catch (error) {
      console.log('error in upload', error);
      setErrorMessage(error.message);
      setProgress('uploadError');
    }
  };

  const content = () => {
    switch (progress) {
      case 'getUpload':
        return (
          <UploadComponent
            onUrlChange={onUrlChange}
            onImage={onImage}
            url={url}
          />
        );
      case 'uploading':
        return <h2>Uploading...</h2>;
      case 'uploaded':
        return <img src={url} alt='uploaded image' />;
      case 'uploadError':
        <>
          <div>Error message = {errorMessage}</div>
          <div>Please upload an image</div>
        </>;
    }
  };

  return (
    <div className='App'>
      <h1>Image Upload Website</h1>
      {content()}
    </div>
  );
};

export default App;
