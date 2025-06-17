import { calcWidth } from '../calcWidth';

export const calcObject = (fields, maxLength) => {
  fields.forEach((field) => {
    switch (field.tipoobject) {
      case 1:
      case 8: {
        field.widthfield = calcWidth(field.tamanho);
        if (field.tipofiltro === 3) {
          field.widthfield = field.widthfield * 2;
        }
        field.measure = field.widthfield + 'rem';
        break;
      }
      case 2:
        if (field.tipofiltro !== 3) {
          field.widthfield = 33;
          field.measure = '33rem';
        } else {
          field.widthfield = 66;
          field.measure = '66';
        }
        field.widthname = 24;
        break;
      case 3: {
        field.widthfield = maxLength;
        field.measure = maxLength + 'rem';
        break;
      }
      case 4:
      case 5:
      case 6: {
        if (field.tipofiltro !== 3) {
          field.widthfield = 10;
          field.measure = '10rem';
        } else {
          field.widthfield = 22;
          field.measure = '22rem';
        }
        break;
      }
      case 7: {
        field.widthfield = maxLength;
        field.measure = maxLength + 'rem';
        break;
      }
      case 9: {
        field.widthfield = calcWidth(field.funcao);
        if (field.tipofiltro === 3) {
          field.widthfield = field.widthfield * 2;
        }
        field.measure = field.widthfield + 'rem';
        break;
      }
      case 10: {
        field.widthfield = 20;
        field.measure = '20rem';
        break;
      }
      case 11: {
        field.widthfield = 25;
        field.measure = '25rem';
        break;
      }
    }
  });
  let totline = 1;
  let totwidth = 0;
  fields.forEach((field, index) => {
    field.line = totline;
    if (field.widthfield < maxLength - totwidth) {
      totwidth = totwidth + field.widthfield;
    } else {
      const fieldant = fields[index - 1];
      if (fieldant !== undefined) {
        fieldant.widthfield = fieldant.widthfield + (maxLength - totwidth);
        fieldant.measure = fieldant.widthfield + 'rem';
        if (fieldant.tipoobject === 2) {
          fieldant.widthname = fieldant.widthfield - 33 + 24;
        }
        totline = totline + 1;
        totwidth = field.widthfield;
        field.line = totline;
      }
    }
  });
};
