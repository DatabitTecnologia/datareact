import React, { useRef } from 'react';
import CreateInput from '../CreateInput';
import CreateMult from '../CreateMult';
import CreateFind from '../CreateFind';
import CreateInputMask from '../CreateInputMask';
import CreateDate from '../CreateDate';
import CreateText from '../CreateText';
import CreateNumber from '../CreateNumber';
import CreateCheck from '../CreateCheck';
import CreateRadio from '../CreateRadio';
import CreateSelect from '../CreateSelect';

export const CreateObject = (props) => {
  const { valuesfield, setValuesfield } = props;
  const { valuesfield2, setValuesfield2 } = props;
  const { valuesname, setValuesname } = props;
  const [listoptions, setListoptions] = React.useState([]);
  const { valuesfieldref } = props;
  const valuesfieldref2 = useRef([]);
  if (valuesfieldref === undefined) {
    try {
      props.fields.forEach((element) => {
        valuesfieldref2.current[element.id] = element.campo;
      });
    } catch (error) {
      //console.log(error);
    }
  }

  switch (props.field.tipoobject) {
    case 1: {
      // Input
      return (
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateInput
              index={props.index}
              size={props.field.tamanho}
              title={props.field.funcao}
              name={props.field.campo}
              interval={props.field.tipofiltro === 3}
              measure={props.field.measure}
              fields={props.fields}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              disabled={props.disabled}
              readonly={props.field.readonly}
              charnormal={props.field.charnormal}
              onkeydown={props.onkeydown}
              required={props.required}
              methodBlur={props.field.methodBlur}
              ispassword={false}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateInput>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
    case 2: {
      // Pesquisa
      return (
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateFind
              index={props.index}
              size={props.field.tamanho}
              title={props.field.funcao}
              name={props.field.campo}
              table={props.field.tabelaref}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              measure={props.field.measure}
              widthname={props.field.widthname}
              fields={props.fields}
              disabled={props.disabled}
              readonly={props.field.readonly}
              filteraux={props.field.filteraux}
              onkeydown={props.onkeydown}
              findOnly={props.field.findOnly}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateFind>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
    case 3: {
      // Multi-seleção
      return (
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateMult
              index={props.index}
              size={props.field.tamanho}
              title={props.field.funcao}
              name={props.field.campo}
              table={props.field.tabelaref}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              measure={props.field.measure}
              widthname={props.field.widthname}
              fields={props.fields}
              disabled={props.disabled}
              readonly={props.field.readonly}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateMult>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
    case 4: {
      // Númerico
      return (
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateNumber
              index={props.index}
              title={props.field.funcao}
              name={props.field.campo}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              interval={props.field.tipofiltro === 3}
              measure={props.field.measure}
              decimal={props.field.decimal}
              fields={props.fields}
              disabled={props.disabled}
              readonly={props.field.readonly}
              onkeydown={props.onkeydown}
              required={props.required}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateNumber>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
    case 5: {
      return (
        // Data
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateDate
              index={props.index}
              size={props.field.tamanho}
              title={props.field.funcao}
              name={props.field.campo}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              interval={props.field.tipofiltro === 3}
              measure={props.field.measure}
              fields={props.fields}
              disabled={props.disabled}
              readonly={props.field.readonly}
              onkeydown={props.onkeydown}
              required={props.required}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateDate>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
    case 6: {
      // Texto
      return (
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateText
              index={props.index}
              size={props.field.tamanho}
              title={props.field.funcao}
              name={props.field.campo}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              fields={props.fields}
              disabled={props.disabled}
              readonly={props.field.readonly}
              onkeydown={props.onkeydown}
              required={props.required}
              lines={props.field.lines}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateText>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
    case 8: {
      // Input com máscaras
      return (
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateInputMask
              index={props.index}
              size={props.field.tamanho}
              title={props.field.funcao}
              name={props.field.campo}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              valuesname={valuesname}
              setValuesname={(data) => setValuesname(data)}
              interval={props.field.tipofiltro === 3}
              measure={props.field.measure}
              typemask={props.field.tipomascara}
              mask={props.field.mascara}
              fields={props.fields}
              disabled={props.disabled}
              readonly={props.field.readonly}
              onkeydown={props.onkeydown}
              required={props.required}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateInputMask>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
    case 9: {
      // CreckBox
      return (
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateCheck
              index={props.index}
              size={props.field.tamanho}
              title={props.field.funcao}
              name={props.field.campo}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              fields={props.fields}
              valuechecked={props.field.valuechecked}
              valueunchecked={props.field.valueunchecked}
              measure={props.field.measure}
              disabled={props.disabled}
              readonly={props.field.readonly}
              onkeydown={props.onkeydown}
              required={props.required}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateCheck>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
    case 10: {
      // RadioGroup
      return (
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateRadio
              index={props.index}
              size={props.field.tamanho}
              title={props.field.funcao}
              name={props.field.campo}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              fields={props.fields}
              itens={props.field.itens}
              values={props.field.valuesfield ? props.field.valuesfield : props.field.values}
              measure={props.field.measure}
              disabled={props.disabled}
              readonly={props.field.readonly}
              onkeydown={props.onkeydown}
              required={props.required}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateRadio>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }

    case 11: {
      // Select Normal

      let optionsfim;
      let arrayitens = [];
      let arrayvalues = [];
      if (props.field.itens !== '' && props.field.itens !== undefined) {
        arrayitens = props.field.itens.split(',');
        if (props.field.valuesfield) {
          arrayvalues = props.field.valuesfield.split(',');
        } else {
          arrayvalues = props.field.values.split(',');
        }
        let option = [];
        arrayitens.forEach((item, index) => {
          const option2 = { value: arrayvalues[index], label: arrayitens[index] };
          option = option.concat(option2);
        });
        optionsfim = option;
      } else {
        optionsfim = props.field.options;
      }
      if (optionsfim === undefined) {
        optionsfim = [{ value: 'null', label: 'Sem itens para serem selecionados!' }];
      }
      return (
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateSelect
              index={props.index}
              size={props.field.tamanho}
              title={props.field.funcao}
              name={props.field.campo}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              fields={props.fields}
              options={optionsfim}
              measure={props.field.measure}
              disabled={props.disabled}
              readonly={props.field.readonly}
              onkeydown={props.onkeydown}
              required={props.required}
              valuesoption={arrayvalues}
              firstdefault={false}
              tabelaref={undefined}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateSelect>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
    case 12: {
      // Select Tabela
      return (
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateSelect
              index={props.index}
              size={props.field.tamanho}
              title={props.field.funcao}
              name={props.field.campo}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              fields={props.fields}
              options={listoptions}
              measure={props.field.measure}
              disabled={props.disabled}
              readonly={props.field.readonly}
              onkeydown={props.onkeydown}
              required={props.required}
              tabelaref={props.field.tabelaref}
              fieldlist={props.field.campolist}
              fieldvalue={props.field.camporefdrop}
              filteraux={props.field.filteraux}
              firstdefault={props.field.firstdefault}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateSelect>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
    case 13: {
      // Password
      return (
        <React.Fragment>
          {props.invisible === false || props.invisible === undefined ? (
            <CreateInput
              index={props.index}
              size={props.field.tamanho}
              title={props.field.funcao}
              name={props.field.campo}
              interval={props.field.tipofiltro === 3}
              measure={props.field.measure}
              fields={props.fields}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
              valuesfield2={valuesfield2}
              setValuesfield2={(data) => setValuesfield2(data)}
              disabled={props.disabled}
              readonly={props.field.readonly}
              charnormal={props.field.charnormal}
              onkeydown={props.onkeydown}
              required={props.required}
              ispassword={true}
              viewpass={props.field.viewpass}
              refs={valuesfieldref !== undefined ? valuesfieldref : valuesfieldref2}
            ></CreateInput>
          ) : (
            <></>
          )}
        </React.Fragment>
      );
    }
  }
};
