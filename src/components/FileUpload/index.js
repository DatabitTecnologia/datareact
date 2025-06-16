import React, { useEffect } from 'react';
import { Dropzone, FileMosaic, FullScreen, ImagePreview, VideoPreview } from '@files-ui/react';

const FileUpload = (props) => {
  const { rows, setRows } = props;
  const [extFiles, setExtFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const [videoSrc, setVideoSrc] = React.useState(undefined);

  useEffect(() => {
    let files = [];
    let item = {};
    let file = {};
    rows.forEach((element, index) => {
      file['name'] = element.nome;
      file['size'] = element.tamanho;
      file['type'] = element.ext;

      item['id'] = index;
      item['name'] = element.nome;
      item['size'] = element.tamanho;
      item['type'] = element.ext;
      item['file'] = file;

      files = files.concat(item);
    });
    setExtFiles(files);
  }, []);

  const updateFiles = (incommingFiles) => {
    console.log('incomming files', incommingFiles);
    setExtFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setExtFiles(extFiles.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleWatch = (videoSource) => {
    setVideoSrc(videoSource);
  };

  const handleStart = (filesToUpload) => {
    console.log('advanced demo start upload', filesToUpload);
  };
  const handleFinish = (uploadedFiles) => {
    console.log('advanced demo finish upload', uploadedFiles);
  };

  const handleAbort = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: 'aborted' };
        } else return { ...ef };
      })
    );
  };
  const handleCancel = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
  };

  return (
    <React.Fragment>
      <Dropzone
        localization="PT-pt"
        onChange={updateFiles}
        minHeight="200px"
        value={extFiles}
        maxFileSize={5 * 1024 * 1024}
        label="Clique aqui para abrir o arquivo desejado"
        accept="image/*, application/pdf, video/*, audio/*, text/*"
        onUploadStart={handleStart}
        onUploadFinish={handleFinish}
        fakeUpload
        header={false}
      >
        {extFiles.map((file) => (
          <FileMosaic
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            onWatch={handleWatch}
            onAbort={handleAbort}
            onCancel={handleCancel}
            resultOnTooltip
            alwaysActive
            preview
          />
        ))}
      </Dropzone>
      <FullScreen open={imageSrc !== undefined} onClose={() => setImageSrc(undefined)}>
        <ImagePreview src={imageSrc} />
      </FullScreen>
      <FullScreen open={videoSrc !== undefined} onClose={() => setVideoSrc(undefined)}>
        <VideoPreview src={videoSrc} autoPlay controls />
      </FullScreen>
    </React.Fragment>
  );
};

export default FileUpload;
