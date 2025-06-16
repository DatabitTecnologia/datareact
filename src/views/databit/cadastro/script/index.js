import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { LinearProgress } from '@mui/material';
import { CreateObject } from '../../../../components/CreateObject';
import { apiList } from '../../../../api/crudapi';
import { Decode64 } from '../../../../utils/crypto';

const Script = (props) => {
  const { table, view, itensfield, option, create, modulo } = props;
  const [carregando, setCarregando] = React.useState(false);
  const [listgroups, setListgroups] = React.useState([]);
  const [listforms, setListforms] = React.useState([]);
  const [listfields, setListfields] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [valuesfield, setValuesfield] = React.useState([]);

  const sqlVariable = `-- Iniciando Variaveis 


DECLARE @CODGRUPO VARCHAR(4);
DECLARE @CODFORM VARCHAR(4);

-- Criando nome do Módulo
DELETE FROM TB00120 WHERE TB00120_TABELA = '@#TABELA#@' AND TB00120_SYSTEM = @#SYSTEM#@
INSERT INTO TB00120 (TB00120_TABELA,TB00120_NOME,TB00120_SYSTEM )
VALUES ('@#TABELA#@','@#MODULO#@',@#SYSTEM#@)

`;

  const sqlCount = `-- Pegando o último contador

UPDATE TB00002 SET TB00002_COD = (SELECT dbo.fs00002(MAX(TB00107_CODIGO)) FROM TB00107) 
 WHERE TB00002_TABELA = 'TB00107';
 
IF EXISTS(SELECT * FROM TB00002 WHERE TB00002_TABELA = 'TB00107')
BEGIN
  SELECT @CODGRUPO = TB00002_COD FROM TB00002 WHERE TB00002_TABELA = 'TB00107';
END
ELSE
BEGIN
  IF EXISTS(SELECT * FROM TB00107)
    SELECT @CODGRUPO = (SELECT dbo.fs00002(MAX(TB00107_CODIGO)) FROM TB00107) 
  ELSE
    SELECT @CODGRUPO = '0000';
  INSERT INTO TB00002 (TB00002_COD,TB00002_NOME,TB00002_TABELA,TB00002_TAMANHO)
			   VALUES (@CODGRUPO ,'Grupos de Formulários','TB00107',4);
END

UPDATE TB00002 SET TB00002_COD = (SELECT dbo.fs00002(MAX(TB00108_CODIGO)) FROM TB00108) 
WHERE TB00002_TABELA = 'TB00108';

IF EXISTS(SELECT * FROM TB00002 WHERE TB00002_TABELA = 'TB00108')
BEGIN
  SELECT @CODFORM = TB00002_COD FROM TB00002 WHERE TB00002_TABELA = 'TB00108';
END
ELSE
BEGIN
  IF EXISTS(SELECT * FROM TB00108)
    SELECT @CODFORM = (SELECT dbo.fs00002(MAX(TB00108_CODIGO)) FROM TB00108) 
  ELSE
    SELECT @CODFORM = '0000';
  INSERT INTO TB00002 (TB00002_COD,TB00002_NOME,TB00002_TABELA,TB00002_TAMANHO)
			   VALUES (@CODFORM,'Definição de Formulários','TB00108',4);
END`;

  const sqlDelete = `-- Excluindo Registros Anteriores
DELETE FROM TB00109 WHERE TB00109_TABELA = '@#TABELA#@' AND TB00109_SYSTEM = '@#SYSTEM#@'
DELETE FROM TB00108 WHERE EXISTS (SELECT * FROM TB00107 WHERE TB00108_GRUPO = TB00107_CODIGO 
                      AND TB00108_SYSTEM = TB00107_SYSTEM AND TB00107_TABELA = '@#TABELA#@' AND TB00107_SYSTEM = '@#SYSTEM#@')
DELETE FROM TB00107 WHERE TB00107_TABELA = '@#TABELA#@' AND TB00107_SYSTEM = '@#SYSTEM#@'`;

  const sqlInsGroup = `-- Inserindo Grupo: @#NOME#@ 
DECLARE @CODGRUPO@#INDEX#@ VARCHAR(4);
SELECT @CODGRUPO@#INDEX#@ = TB00002_COD FROM TB00002 WHERE TB00002_TABELA = 'TB00107';
SELECT @CODGRUPO@#INDEX#@ = dbo.fs00002(@CODGRUPO@#INDEX#@)
UPDATE TB00002 SET TB00002_COD = @CODGRUPO@#INDEX#@ WHERE TB00002_TABELA = 'TB00107';
INSERT INTO TB00107(TB00107_DTCAD,TB00107_OPCAD,TB00107_CODIGO,TB00107_NOME,TB00107_SITUACAO,TB00107_TABELA,TB00107_FORMS,TB00107_PADRAO,TB00107_ORDEM,TB00107_SYSTEM)
			values (GETDATE(),'@#USER#@',@CODGRUPO@#INDEX#@,'@#NOME#@','A','@#TABELA#@','@#FORMS#@','@#PADRAO#@','@#ORDEM#@','@#SYSTEM#@')`;

  const sqlInsForm = `-- Inserindo Formulário: @#NOME#@ 
DECLARE @CODFORM@#INDEX#@ VARCHAR(4);
SELECT @CODFORM@#INDEX#@ = TB00002_COD FROM TB00002 WHERE TB00002_TABELA = 'TB00108';
SELECT @CODFORM@#INDEX#@ = dbo.fs00002(@CODFORM@#INDEX#@)
UPDATE TB00002 SET TB00002_COD = @CODFORM@#INDEX#@ WHERE TB00002_TABELA = 'TB00108';
INSERT INTO dbo.TB00108(TB00108_DTCAD,TB00108_OPCAD,TB00108_CODIGO,TB00108_NOME,TB00108_SITUACAO,TB00108_GRUPO,TB00108_PADRAO,
						TB00108_TIPO,TB00108_CODREACT,TB00108_LARGURA,TB00108_ORDEM,TB00108_TIPOESPECIAL,TB00108_SYSTEM)
				 VALUES (GETDATE(),'@#USER#@',@CODFORM@#INDEX#@,'@#NOME#@','A',@CODGRUPO@#IDXGROUP#@,'@#PADRAO#@','@#TIPO#@','@#CODREACT#@',
						'@#LARGURA#@','@#ORDEM#@','@#TIPOESPECIAL#@','@#SYSTEM#@')`;

  const sqlInsField = `-- Inserindo Campo: @#CAMPO#@ : @#FUNCAO#@
INSERT INTO dbo.TB00109(TB00109_TABELA,TB00109_CAMPO,TB00109_ISPRIMARY,TB00109_FUNCAO,TB00109_SELEC,TB00109_ORDEM,TB00109_FORM,TB00109_TIPO,
						TB00109_TAMANHO,TB00109_FOREIGN,TB00109_KEY,TB00109_TABELAREF,TB00109_CAMPOREF,TB00109_DESCRICAOREF,TB00109_TIPOOBJECT,
						TB00109_TIPOMASCARA,TB00109_DECIMAL,TB00109_VALUECHECKED,TB00109_VALUEUNCHECKED,TB00109_ITENS,TB00109_VALUES,TB00109_LARGURA,
						TB00109_VIEW,TB00109_MASCARA,TB00109_TIPOMULT,TB00109_ISFOREIGN,TB00109_DISABLEINSERT,TB00109_DISABLEUPDATE,TB00109_CAMPOLIST,
						TB00109_CAMPOREFDROP,TB00109_FILTERAUX,TB00109_CHARNORMAL,TB00109_SYSTEM,TB00109_CHECKDEFAULT,TB00109_DEFAULT)
				VALUES ('@#TABELA#@','@#CAMPO#@','@#ISPRIMARY#@','@#FUNCAO#@','@#SELEC#@','@#ORDEM#@',@CODFORM@#IDXFORM#@,'@#TIPO#@','@#TAMANHO#@','@#FOREIGN#@',
						'@#KEY#@','@#TABELAREF#@','@#CAMPOREF#@','@#DESCRICAOREF#@','@#TIPOOBJECT#@','@#TIPOMASCARA#@','@#DECIMAL#@','@#VALUECHECKED#@',
						'@#VALUEUNCHECKED#@','@#ITENS#@','@#VALUES#@','@#LARGURA#@','@#VIEW#@','@#MASCARA#@','@#TIPOMULT#@','@#ISFOREIGN#@','@#DISABLEINSERT#@',
						'@#DISABLEUPDATE#@','@#CAMPOLIST#@','@#CAMPOREFDROP#@','@#FILTERAUX#@','@#CHARNORMAL#@','@#SYSTEM#@','@#CHECKDEFAULT#@','@#DEFAULT#@')`;

  const sqlDropForeign = `IF EXISTS (SELECT 1 FROM SYS.foreign_keys WHERE NAME = '@#FOREIGNKEY#@')
BEGIN
  ALTER TABLE @#TABELA#@ DROP CONSTRAINT @#FOREIGNKEY#@;
END`;

  const sqlDropDefault = `IF EXISTS (SELECT 1 FROM SYS.default_constraints WHERE NAME = '@#CHECKDEFAULT#@')
BEGIN
  ALTER TABLE @#TABELA#@ DROP CONSTRAINT @#CHECKDEFAULT#@;
END`;

  const sqlDropField = `IF EXISTS(SELECT 1 FROM SYS.all_columns AS A LEFT JOIN SYS.tables AS B ON A.object_id = B.object_id WHERE A.name =  '@#CAMPO#@' AND B.NAME = '@#TABELA#@') 
BEGIN
 EXEC sys.sp_dropextendedproperty @name=N'MS_Description' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'@#TABELA#@', @level2type=N'COLUMN',@level2name=N'@#CAMPO#@';
 ALTER TABLE @#TABELA#@ DROP COLUMN @#CAMPO#@;
END`;

  const sqlCreateField = `ALTER TABLE @#TABELA#@ ADD @#CAMPO#@ @#TIPO#@
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'@#FUNCAO#@' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'@#TABELA#@', @level2type=N'COLUMN',@level2name=N'@#CAMPO#@'`;

  const sqlCreateForeign = `ALTER TABLE @#TABELA#@ WITH NOCHECK ADD  CONSTRAINT @#FOREIGNKEY#@ FOREIGN KEY(@#CAMPO#@)
REFERENCES @#TABELAREF#@ (@#CAMPOREF#@)
ALTER TABLE @#TABELA#@ CHECK CONSTRAINT @#FOREIGNKEY#@`;

  const sqlCreateDefault = `ALTER TABLE @#TABELA#@ ADD CONSTRAINT @#CHECKDEFAULT#@  DEFAULT @#DEFAULT#@ FOR @#CAMPO#@`;

  const sqlPesqForm = `DECLARE @CODFORM@#CAMPO#@ VARCHAR(4);
SELECT TOP 1 @CODFORM@#CAMPO#@ = TB00109_FORM FROM TB00109 WHERE TB00109_TABELA = '@#TABELA#@' AND TB00109_CAMPO = '@#CAMPO#@'
DELETE FROM TB00109 WHERE TB00109_TABELA = '@#TABELA#@' AND TB00109_CAMPO = '@#CAMPO#@'`;

  useEffect(() => {
    setCarregando(true);
    setFields([
      {
        id: 0,
        campo: 'SCRIPT',
        funcao: 'Script Gerado',
        tipo: 'text',
        nome: 'script',
        tipoobject: 6,
        tamanho: 10,
        widthfield: 10,
        measure: '10',
        lines: 30,
        readonly: true
      }
    ]);
    switch (option) {
      case 1: {
        valuesfield[0] = '';

        let linha = sqlVariable;
        linha = linha.replace(/@#TABELA#@/g, table);
        linha = linha.replace(/@#MODULO#@/g, modulo);
        linha = linha.replace(/@#SYSTEM#@/g, Decode64(sessionStorage.getItem('system')));

        valuesfield[0] += linha;
        valuesfield[0] += '\n' + '\n';

        valuesfield[0] += sqlCount;
        valuesfield[0] += '\n' + '\n';

        linha = sqlDelete;
        linha = linha.replace(/@#TABELA#@/g, table);
        linha = linha.replace(/@#SYSTEM#@/g, Decode64(sessionStorage.getItem('system')));

        valuesfield[0] += linha;
        valuesfield[0] += '\n' + '\n';
        setValuesfield([...valuesfield]);
        apiList(
          'GroupForm',
          '*',
          '',
          "TB00107_TABELA = '" +
            table +
            "' and TB00107_SYSTEM = " +
            Decode64(sessionStorage.getItem('system')) +
            " and TB00107_SITUACAO = 'A' order by TB00107_ORDEM "
        ).then((response) => {
          if (response.status === 200) {
            setListgroups(response.data);
          }
        });
        break;
      }
      case 2: {
        apiList(
          'FieldForm',
          '*',
          '',
          "TB00109_TABELA = '" +
            table +
            "' AND CHARINDEX(TB00109_CAMPO,'" +
            itensfield +
            "') > 0 and TB00109_SYSTEM = " +
            Decode64(sessionStorage.getItem('system'))
        ).then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setListfields(response.data);
          }
        });
        break;
      }
    }
  }, []);

  useEffect(() => {
    let linha = '';
    listgroups.forEach((grupo) => {
      linha = sqlInsGroup;
      linha = linha.replace(/@#INDEX#@/g, grupo.codigo);
      linha = linha.replace(/@#USER#@/g, Decode64(sessionStorage.getItem('user')));
      linha = linha.replace(/@#NOME#@/g, grupo.nome);
      linha = linha.replace(/@#TABELA#@/g, table);
      linha = linha.replace(/@#FORMS#@/g, grupo.forms);
      linha = linha.replace(/@#PADRAO#@/g, grupo.padrao);
      linha = linha.replace(/@#ORDEM#@/g, grupo.ordem);
      linha = linha.replace(/@#SYSTEM#@/g, Decode64(sessionStorage.getItem('system')));
      valuesfield[0] += linha;
      valuesfield[0] += '\n' + '\n';

      setValuesfield([...valuesfield]);
      setCarregando(true);
      let linha2 = '';
      apiList('Form', '*', '', "TB00108_GRUPO = '" + grupo.codigo + "' AND TB00108_SITUACAO = 'A' order by TB00108_ORDEM ").then(
        (response) => {
          if (response.status === 200) {
            setListforms(response.data);
            response.data.forEach((form) => {
              linha2 = sqlInsForm;
              linha2 = linha2.replace(/@#USER#@/g, Decode64(sessionStorage.getItem('user')));
              linha2 = linha2.replace(/@#INDEX#@/g, form.codigo);
              linha2 = linha2.replace(/@#IDXGROUP#@/g, form.grupo);
              linha2 = linha2.replace(/@#NOME#@/g, form.nome);
              linha2 = linha2.replace(/@#TIPO#@/g, form.tipo);
              linha2 = linha2.replace(/@#PADRAO#@/g, form.padrao);
              linha2 = linha2.replace(/@#CODREACT#@/g, form.codreact || '');
              linha2 = linha2.replace(/@#LARGURA#@/g, form.largura);
              linha2 = linha2.replace(/@#ORDEM#@/g, form.ordem);
              linha2 = linha2.replace(/@#TIPOESPECIAL#@/g, form.tipoespecial || '');
              linha2 = linha2.replace(/@#SYSTEM#@/g, Decode64(sessionStorage.getItem('system')));
              valuesfield[0] += linha2;
              valuesfield[0] += '\n' + '\n';
              setValuesfield([...valuesfield]);
              let linha3 = '';
              apiList(
                'FieldForm',
                '*',
                '',
                "TB00109_FORM = '" + form.codigo + "' and TB00109_SELEC = 'S' and TB00109_USER = 0 order by TB00109_ORDEM "
              ).then((response) => {
                if (response.status === 200) {
                  setListfields(response.data);
                  response.data.forEach((fieldselec) => {
                    linha3 = sqlInsField;
                    let tmpdefault = fieldselec.default;
                    if (tmpdefault !== undefined && tmpdefault !== null) {
                      tmpdefault = tmpdefault.replace("('", "(''");
                      tmpdefault = tmpdefault.replace("')", "'')");
                    }
                    linha3 = linha3.replace(/@#IDXFORM#@/g, fieldselec.form);
                    linha3 = linha3.replace(/@#TABELA#@/g, table);
                    linha3 = linha3.replace(/@#VIEW#@/g, view);
                    linha3 = linha3.replace(/@#CAMPO#@/g, fieldselec.campo);
                    linha3 = linha3.replace(/@#FUNCAO#@/g, fieldselec.funcao);
                    linha3 = linha3.replace(/@#ISPRIMARY#@/g, fieldselec.isprimary);
                    linha3 = linha3.replace(/@#SELEC#@/g, fieldselec.selec);
                    linha3 = linha3.replace(/@#ORDEM#@/g, fieldselec.ordem);
                    linha3 = linha3.replace(/@#TIPO#@/g, fieldselec.tipo);
                    linha3 = linha3.replace(/@#TAMANHO#@/g, fieldselec.tamanho);
                    linha3 = linha3.replace(/@#FOREIGN#@/g, fieldselec.foreign || '');
                    linha3 = linha3.replace(/@#KEY#@/g, fieldselec.key || '');
                    linha3 = linha3.replace(/@#TABELAREF#@/g, fieldselec.tabelaref || '');
                    linha3 = linha3.replace(/@#CAMPOREF#@/g, fieldselec.camporef || '');
                    linha3 = linha3.replace(/@#DESCRICAOREF#@/g, fieldselec.descricaoref || '');
                    linha3 = linha3.replace(/@#TIPOOBJECT#@/g, fieldselec.tipoobject);
                    linha3 = linha3.replace(/@#TIPOMASCARA#@/g, fieldselec.tipomascara);
                    linha3 = linha3.replace(/@#DECIMAL#@/g, fieldselec.decimal || 0);
                    linha3 = linha3.replace(/@#VALUECHECKED#@/g, fieldselec.valuechecked || '');
                    linha3 = linha3.replace(/@#VALUEUNCHECKED#@/g, fieldselec.valueunchecked || '');
                    linha3 = linha3.replace(/@#ITENS#@/g, fieldselec.itens || '');
                    linha3 = linha3.replace(/@#VALUES#@/g, fieldselec.values || '');
                    linha3 = linha3.replace(/@#LARGURA#@/g, fieldselec.largura);
                    linha3 = linha3.replace(/@#MASCARA#@/g, fieldselec.mascara || '');
                    linha3 = linha3.replace(/@#ISFOREIGN#@/g, fieldselec.isforeign);
                    linha3 = linha3.replace(/@#DISABLEINSERT#@/g, fieldselec.disableinsert);
                    linha3 = linha3.replace(/@#DISABLEUPDATE#@/g, fieldselec.disableupdate);
                    linha3 = linha3.replace(/@#CAMPOLIST#@/g, fieldselec.campolist || '');
                    linha3 = linha3.replace(/@#CAMPOREFDROP#@/g, fieldselec.camporefdrop || '');
                    linha3 = linha3.replace(/@#FILTERAUX#@/g, fieldselec.filteraux || '');
                    linha3 = linha3.replace(/@#CHARNORMAL#@/g, fieldselec.charnormal);
                    linha3 = linha3.replace(/@#SYSTEM#@/g, Decode64(sessionStorage.getItem('system')));
                    linha3 = linha3.replace(/@#TIPOMULT#@/g, fieldselec.tipomult || '');
                    linha3 = linha3.replace(/@#CHECKDEFAULT#@/g, fieldselec.checkdefault || '');
                    linha3 = linha3.replace(/@#DEFAULT#@/g, tmpdefault || '');
                    valuesfield[0] += linha3;
                    valuesfield[0] += '\n' + '\n';
                    setValuesfield([...valuesfield]);
                  });
                  setCarregando(false);
                }
              });
            });
          }
        }
      );
    });
  }, [listgroups]);

  useEffect(() => {
    if (listfields !== undefined && listfields.length > 0 && option === 2) {
      let linha3 = '';
      valuesfield[0] = '';
      setValuesfield([...valuesfield]);
      listfields.forEach((fieldselec) => {
        if (create && fieldselec.key !== undefined && fieldselec.key !== '' && fieldselec.key !== null) {
          linha3 = sqlDropForeign;
          linha3 = linha3.replace(/@#TABELA#@/g, table);
          linha3 = linha3.replace(/@#FOREIGNKEY#@/g, fieldselec.key);
          valuesfield[0] += linha3;
          valuesfield[0] += '\n' + '\n';
          setValuesfield([...valuesfield]);
        }
        if (create && fieldselec.checkdefault !== undefined && fieldselec.checkdefault !== '' && fieldselec.checkdefault !== null) {
          linha3 = sqlDropDefault;
          linha3 = linha3.replace(/@#TABELA#@/g, table);
          linha3 = linha3.replace(/@#CHECKDEFAULT#@/g, fieldselec.checkdefault);
          valuesfield[0] += linha3;
          valuesfield[0] += '\n' + '\n';
          setValuesfield([...valuesfield]);
        }
        if (create) {
          linha3 = sqlDropField;
          linha3 = linha3.replace(/@#TABELA#@/g, table);
          linha3 = linha3.replace(/@#CAMPO#@/g, fieldselec.campo);
          valuesfield[0] += linha3;
          valuesfield[0] += '\n' + '\n';
          setValuesfield([...valuesfield]);
        }
        if (create) {
          let tipocampo = fieldselec.tipo;
          if (tipocampo === 'varchar' || tipocampo === 'char') {
            tipocampo = tipocampo + '(' + fieldselec.tamanho + ')';
          } else if (tipocampo === 'numeric') {
            tipocampo = tipocampo + '(20,' + fieldselec.decimal + ')';
          } else if (tipocampo === 'varbinary') {
            tipocampo = 'varbinary(MAX)';
          }
          linha3 = sqlCreateField;
          linha3 = linha3.replace(/@#TABELA#@/g, table);
          linha3 = linha3.replace(/@#CAMPO#@/g, fieldselec.campo);
          linha3 = linha3.replace(/@#FUNCAO#@/g, fieldselec.funcao);
          linha3 = linha3.replace(/@#TIPO#@/g, tipocampo);
          valuesfield[0] += linha3;
          valuesfield[0] += '\n' + '\n';
          setValuesfield([...valuesfield]);
        }
        if (create && fieldselec.key !== undefined && fieldselec.key !== '' && fieldselec.key !== null) {
          linha3 = sqlCreateForeign;
          linha3 = linha3.replace(/@#TABELA#@/g, table);
          linha3 = linha3.replace(/@#FOREIGNKEY#@/g, fieldselec.key);
          linha3 = linha3.replace(/@#CAMPO#@/g, fieldselec.campo);
          linha3 = linha3.replace(/@#TABELAREF#@/g, fieldselec.tabelaref);
          linha3 = linha3.replace(/@#CAMPOREF#@/g, fieldselec.camporef);
          valuesfield[0] += linha3;
          valuesfield[0] += '\n' + '\n';
          setValuesfield([...valuesfield]);
        }
        if (create && fieldselec.checkdefault !== undefined && fieldselec.checkdefault !== '' && fieldselec.checkdefault !== null) {
          linha3 = sqlCreateDefault;
          linha3 = linha3.replace(/@#TABELA#@/g, table);
          linha3 = linha3.replace(/@#CHECKDEFAULT#@/g, fieldselec.checkdefault);
          linha3 = linha3.replace(/@#CAMPO#@/g, fieldselec.campo);
          linha3 = linha3.replace(/@#DEFAULT#@/g, fieldselec.default);
          valuesfield[0] += linha3;
          valuesfield[0] += '\n' + '\n';
          setValuesfield([...valuesfield]);
        }

        linha3 = sqlPesqForm;
        linha3 = linha3.replace(/@#TABELA#@/g, table);
        linha3 = linha3.replace(/@#CAMPO#@/g, fieldselec.campo);
        valuesfield[0] += linha3;
        valuesfield[0] += '\n' + '\n';
        setValuesfield([...valuesfield]);

        linha3 = sqlInsField;
        let tmpdefault = fieldselec.default;
        if (tmpdefault !== undefined && tmpdefault !== null) {
          tmpdefault = tmpdefault.replace("('", "(''");
          tmpdefault = tmpdefault.replace("')", "'')");
        }
        linha3 = linha3.replace(/@#IDXFORM#@/g, fieldselec.campo);
        linha3 = linha3.replace(/@#TABELA#@/g, table);
        linha3 = linha3.replace(/@#VIEW#@/g, view);
        linha3 = linha3.replace(/@#CAMPO#@/g, fieldselec.campo);
        linha3 = linha3.replace(/@#FUNCAO#@/g, fieldselec.funcao);
        linha3 = linha3.replace(/@#ISPRIMARY#@/g, fieldselec.isprimary);
        linha3 = linha3.replace(/@#SELEC#@/g, fieldselec.selec);
        linha3 = linha3.replace(/@#ORDEM#@/g, fieldselec.ordem);
        linha3 = linha3.replace(/@#TIPO#@/g, fieldselec.tipo);
        linha3 = linha3.replace(/@#TAMANHO#@/g, fieldselec.tamanho);
        linha3 = linha3.replace(/@#FOREIGN#@/g, fieldselec.foreign || '');
        linha3 = linha3.replace(/@#KEY#@/g, fieldselec.key || '');
        linha3 = linha3.replace(/@#TABELAREF#@/g, fieldselec.tabelaref || '');
        linha3 = linha3.replace(/@#CAMPOREF#@/g, fieldselec.campooref || '');
        linha3 = linha3.replace(/@#DESCRICAOREF#@/g, fieldselec.descricaoref || '');
        linha3 = linha3.replace(/@#TIPOOBJECT#@/g, fieldselec.tipoobject);
        linha3 = linha3.replace(/@#TIPOMASCARA#@/g, fieldselec.tipomascara);
        linha3 = linha3.replace(/@#DECIMAL#@/g, fieldselec.decimal || 0);
        linha3 = linha3.replace(/@#VALUECHECKED#@/g, fieldselec.valuechecked || '');
        linha3 = linha3.replace(/@#VALUEUNCHECKED#@/g, fieldselec.valueunchecked || '');
        linha3 = linha3.replace(/@#ITENS#@/g, fieldselec.itens || '');
        linha3 = linha3.replace(/@#VALUES#@/g, fieldselec.values || '');
        linha3 = linha3.replace(/@#LARGURA#@/g, fieldselec.largura);
        linha3 = linha3.replace(/@#MASCARA#@/g, fieldselec.mascara || '');
        linha3 = linha3.replace(/@#ISFOREIGN#@/g, fieldselec.isforeign);
        linha3 = linha3.replace(/@#DISABLEINSERT#@/g, fieldselec.disableinsert);
        linha3 = linha3.replace(/@#DISABLEUPDATE#@/g, fieldselec.disableupdate);
        linha3 = linha3.replace(/@#CAMPOLIST#@/g, fieldselec.campolist || '');
        linha3 = linha3.replace(/@#CAMPOREFDROP#@/g, fieldselec.camporefdrop || '');
        linha3 = linha3.replace(/@#FILTERAUX#@/g, fieldselec.filteraux || '');
        linha3 = linha3.replace(/@#CHARNORMAL#@/g, fieldselec.charnormal);
        linha3 = linha3.replace(/@#SYSTEM#@/g, Decode64(sessionStorage.getItem('system')));
        linha3 = linha3.replace(/@#TIPOMULT#@/g, fieldselec.tipomult || '');
        linha3 = linha3.replace(/@#CHECKDEFAULT#@/g, fieldselec.checkdefault || '');
        linha3 = linha3.replace(/@#DEFAULT#@/g, tmpdefault || '');
        valuesfield[0] += linha3;
        valuesfield[0] += '\n' + '\n';
        setValuesfield([...valuesfield]);
      });
      setCarregando(false);
    }
  }, [listfields]);

  return (
    <React.Fragment>
      <div id="frmscript" name="frmscript">
        <div id="linear-progress">{carregando && <LinearProgress color="primary" />}</div>
        <Row style={{ marginLeft: '1px', marginRight: '1px' }}>
          {fields.map((field, index) => (
            <CreateObject
              key={index}
              field={field}
              index={index}
              fields={fields}
              valuesfield={valuesfield}
              setValuesfield={(data) => setValuesfield(data)}
            ></CreateObject>
          ))}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Script;
