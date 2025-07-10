import { getInstance } from '../whatsinstance';
import { Decode64 } from '../../utils/crypto';
import { Message } from '../../components/Message';

export const onExecute = async (method, param, type) => {
  try {
    const apiInstance = getInstance();
    switch (type) {
      case 0: {
        // GET
        return await apiInstance.get(method + '/' + param);
      }
      case 1: {
        // POST
        return await apiInstance.post(method, param);
      }
      case 2: {
        // PUT
        return await apiInstance.put(method, param);
      }
      case 3: {
        // DELETE
        return await apiInstance.delete(method + '&' + param);
      }
      case 4: {
        // PATCH
        return await apiInstance.patch(method, param);
      }
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendMessage = async (whatsapp, message, delaytyping = 1) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['message'] = message;
      jsonwhats['delayMessage'] = delaytyping;
      return onExecute('send-text', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const forwardMessage = async (origin, id, destiny) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + destiny;
      jsonwhats['messageId'] = id;
      jsonwhats['delayMessage'] = origin;
      return onExecute('forward-message', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendReaction = async (whatsapp, reaction, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['reaction'] = reaction;
      jsonwhats['messageId'] = id;
      return onExecute('send-reaction', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendImage = async (whatsapp, base64, name, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['delayMessage'] = 1;
      jsonwhats['image'] = 'data:image/png;base64,' + base64 + ' ';
      if (name !== undefined && name !== null && name !== '') {
        jsonwhats['caption'] = name;
      }
      if (id !== undefined && id !== null && id !== '') {
        jsonwhats['messageId'] = id;
      }
      return onExecute('send-image', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const removeReaction = async (whatsapp, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['messageId'] = id;
      jsonwhats['delayMessage'] = 1;
      onExecute('send-remove-reaction', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendSticker = async (whatsapp, base64, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['sticker'] = 'data:image/png;base64,' + base64 + ' ';
      jsonwhats['delayMessage'] = 1;
      if (id !== undefined && id !== null && id !== '') {
        jsonwhats['messageId'] = id;
      }
      return onExecute('send-sticker', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendGIF = async (whatsapp, base64, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['gif'] = 'data:image/gif;base64,' + base64 + ' ';
      jsonwhats['delayMessage'] = 1;
      if (id !== undefined && id !== null && id !== '') {
        jsonwhats['messageId'] = id;
      }
      onExecute('send-gif', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendAudio = async (whatsapp, base64, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['audio'] = 'data:audio/mp3;base64,' + base64 + ' ';
      jsonwhats['delayMessage'] = 1;
      if (id !== undefined && id !== null && id !== '') {
        jsonwhats['messageId'] = id;
      }
      onExecute('send-audio', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendVideo = async (whatsapp, base64, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['video'] = 'data:video/mp4;base64,' + base64 + ' ';
      jsonwhats['delayMessage'] = 1;
      if (id !== undefined && id !== null && id !== '') {
        jsonwhats['messageId'] = id;
      }
      onExecute('send-video', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendDocument = async (whatsapp, base64, filename, ext, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['document'] = 'data:application/pdf;base64,' + base64 + ' ';
      jsonwhats['delayMessage'] = 1;
      if (id !== undefined && id !== null && id !== '') {
        jsonwhats['messageId'] = id;
      }
      if (filename !== undefined && filename !== null && filename !== '') {
        jsonwhats['fileName'] = filename;
      }
      onExecute('send-document/' + ext, jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendLink = async (whatsapp, message, linkimage, url, title, description, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['message'] = message;
      jsonwhats['delayMessage'] = 1;
      jsonwhats['image'] = linkimage;
      jsonwhats['linkUrl'] = url;
      jsonwhats['title'] = title;
      jsonwhats['linkDescription'] = description;
      if (id !== undefined && id !== null && id !== '') {
        jsonwhats['messageId'] = id;
      }
      onExecute('send-link', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendLocation = async (whatsapp, title, address, latittde, longitude, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['title'] = title;
      jsonwhats['delayMessage'] = 1;
      jsonwhats['address'] = address;
      jsonwhats['latittde'] = latittde;
      jsonwhats['longitude'] = longitude;
      if (id !== undefined && id !== null && id !== '') {
        jsonwhats['messageId'] = id;
      }
      onExecute('send-location', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendContact = async (whatsapp, contactname, contactphone, contactdescription, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['contactName'] = contactname;
      jsonwhats['delayMessage'] = 1;
      jsonwhats['contactPhone'] = contactphone;
      jsonwhats['contactBusinessDescription'] = contactdescription;
      if (id !== undefined && id !== null && id !== '') {
        jsonwhats['messageId'] = id;
      }
      onExecute('send-contact', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendButtonsActions = async (whatsapp, message, title, footer, listoptions = []) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['message'] = message;
      jsonwhats['title'] = title;
      if (footer !== undefined && footer !== null && footer !== '') {
        jsonwhats['footer'] = footer;
      }
      if (listoptions.length > 0) {
        let itens = [];
        let item = {};
        listoptions.forEach((option, index) => {
          item['id'] = index;
          item['label'] = option.label;
          switch (option.type) {
            case 0: {
              item['type'] = 'CALL';
              item['phone'] = option.phone;
              break;
            }
            case 1: {
              item['type'] = 'URL';
              item['phone'] = option.url;
              break;
            }
            case 2: {
              item['type'] = 'REPLY';
              break;
            }
          }
          itens = itens.concat(item);
        });
        jsonwhats['buttonActions'] = itens;
      }
      onExecute('send-button-actions', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendButtonList = async (whatsapp, message, listoptions = []) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['message'] = message;
      let itens = [];
      let item = {};
      let buttons = {};
      if (listoptions.length > 0) {
        listoptions.forEach((option, index) => {
          item['id'] = index;
          item['label'] = option.label;
          itens = itens.concat(item);
        });
        buttons['buttons'] = itens;
        jsonwhats['buttonList'] = buttons;
      }
      onExecute('send-button-list', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const sendOptionlist = async (whatsapp, message, title, label, listoptions = []) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['message'] = message;
      let itens = [];
      let item = {};
      let options = {};
      let optionfim = {};
      if (listoptions.length > 0) {
        listoptions.forEach((option, index) => {
          item['id'] = index;
          item['description'] = option.description;
          item['title'] = option.title;
          itens = itens.concat(item);
        });
        optionfim['title'] = title;
        optionfim['buttonLabel'] = label;
        optionfim['options'] = itens;
        jsonwhats['optionList'] = optionfim;
      }
      onExecute('send-option-list', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};

export const deleteMessage = async (whatsapp, id, owner = false) => {
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      let link = 'messageId = ' + id;
      link = link + '&phone = ' + whatsapp;
      if (owner) {
        link = link + '&owner=true';
      } else {
        link = link + '&owner=false';
      }
      onExecute('messages', link, 3);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    //console.log(error);
  }
};

export const readMessage = async (whatsapp, id) => {
  let jsonwhats = {};
  const idwhats = Decode64(sessionStorage.getItem('idwhats'));
  const tokenwhats = Decode64(sessionStorage.getItem('tokenwhats'));
  try {
    if (
      idwhats !== undefined &&
      idwhats !== '' &&
      idwhats !== null &&
      tokenwhats !== undefined &&
      tokenwhats !== '' &&
      tokenwhats !== null
    ) {
      jsonwhats['phone'] = '55' + whatsapp;
      jsonwhats['messageId'] = id;
      jsonwhats['delayMessage'] = 1;
      onExecute('read-message', jsonwhats, 1);
    } else {
      Message('frmChat', '', 'error', 'É necessário preencher as propriedades "Instance e Token"');
    }
  } catch (error) {
    Message('frmChat', '', 'error', error);
  }
};
