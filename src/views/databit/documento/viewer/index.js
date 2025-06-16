import React, { useEffect, useState } from 'react';
import FileViewer from 'react-file-viewer';

const ViewerDoc = (props) => {
  const { url, ext } = props;

  return (
    <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
      <FileViewer fileType={ext} filePath={url} width="100%" height="100%" onGridSort={() => null}></FileViewer>
    </div>
  );
};

export default ViewerDoc;
