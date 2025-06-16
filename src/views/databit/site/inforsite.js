import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Row, Col, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import Infor from '../cadastro/infor';
import { getCEP } from '../../../api/correios';
import { getZipCode } from '../../../api/location';
import GoogleMap from 'google-map-react';
import Pointer from '../../../assets/images/databit/pointer_blue.png';
import { Decode64 } from '../../../utils/crypto';

const AnyReactComponent = ({ text }) => <img src={Pointer} alt="pointer" />;

const InforSite = (props) => {
  const { showinfor, setShowinfor } = props;
  const { rowselect, setRowselect } = props;
  const { onupdate, setOnupdate } = props;
  const { addToast } = useToasts();

  const [valuesfield, setValuesfield] = React.useState([]);
  const [valuesfield2, setValuesfield2] = React.useState([]);
  const [valuesdisable, setValuesdisable] = React.useState([]);
  const [valuesinvisible, setValuesinvisible] = React.useState([]);
  const [valuesname, setValuesname] = React.useState([]);
  const [valuesrequired, setValuesrequired] = React.useState([]);
  const [valuesindex, setValuesindex] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);

  const [valuesaddress, setValuesaddress] = React.useState([]);
  const [valuesaddressdisable, setValuesaddressdisable] = React.useState([]);
  const [valuesaddressname, setValuesaddressname] = React.useState([]);
  const [valuesaddressrequired, setValuesaddressrequired] = React.useState([]);
  const [actions, setActions] = React.useState([]);

  const [openmodal, setOpenmodal] = React.useState(props.openmodal);
  const [fieldsauto, setFieldsauto] = React.useState(props.fieldsauto);
  const [events, setEvents] = React.useState([]);
  const [showmapa, setShowmapa] = React.useState(false);
  const handleClosemapa = () => {
    setShowmapa(false);
  };
  const [location, setLocation] = React.useState([]);

  useEffect(() => {
    setActions([
      {
        id: 'btnMapa',
        method: () => Mapa(),
        classicon: 'feather icon-map',
        classbutton: 'btn btn-success shadow-2 mb-3',
        caption: 'Visualizar Mapa'
      }
    ]);
  }, []);

  useEffect(() => {
    const cep = valuesfield[valuesname.indexOf('cep')];
    const posend = valuesname.indexOf('end');
    const posbairro = valuesname.indexOf('bairro');
    const poscidade = valuesname.indexOf('cidade');
    const estado = valuesname.indexOf('estado');
    if (!disabled) {
      if (cep.length === 8) {
        getCEP(cep).then((response) => {
          if (response.status === 200) {
            try {
              valuesfield[posend] = response.data.logradouro.toUpperCase().substring(0, 60);
              valuesfield[posbairro] = response.data.bairro.toUpperCase().substring(0, 30);
              valuesfield[poscidade] = response.data.localidade.toUpperCase().substring(0, 30);
              valuesfield[estado] = response.data.uf.toUpperCase();
            } catch (error) {
              addToast('Endereço não encontrado !', {
                placement: 'bottom-rigth',
                appearance: 'warning',
                autoDismiss: true
              });
            }
          }
        });
      }
    }
  }, [valuesfield[valuesname.indexOf('cep')]]);

  const Mapa = () => {
    getZipCode(valuesfield[valuesname.indexOf('cep')]).then((response) => {
      if (response.status === 200) {
        try {
          let tmplocation = response.data.results[0].geometry.location;
          let locationfim = [];
          tmplocation['name'] = valuesfield[valuesname.indexOf('end')];
          locationfim = locationfim.concat(tmplocation);
          setLocation(locationfim);
          setShowmapa(true);
        } catch (error) {
          setLocation([]);
          addToast('Não foi possível buscar as coordenadas deste Endereço !', {
            placement: 'bottom-rigth',
            appearance: 'warning',
            autoDismiss: true
          });
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Infor
        title="Definição de Sites"
        table="TB02176"
        object="VW02233"
        classname="ContratoSite"
        classobject="ContratoSiteVW"
        termlist="Definição de Sites"
        moduleoption="19"
        address={false}
        primarykey="CODIGO"
        disabled={disabled}
        autoincrement={true}
        setDisabled={(data) => setDisabled(data)}
        showinfor={showinfor}
        setShowinfor={(data) => setShowinfor(data)}
        rowselect={rowselect}
        setRowselect={(data) => setRowselect(data)}
        valuesfield={valuesfield}
        setValuesfield={(data) => setValuesfield(data)}
        valuesfield2={valuesfield2}
        setValuesfield2={(data) => setValuesfield2(data)}
        valuesdisable={valuesdisable}
        setValuesdisable={(data) => setValuesdisable(data)}
        valuesinvisible={valuesinvisible}
        setValuesinvisible={(data) => setValuesinvisible(data)}
        valuesname={valuesname}
        setValuesname={(data) => setValuesname(data)}
        valuesrequired={valuesrequired}
        setValuesrequired={(data) => setValuesrequired(data)}
        valuesindex={valuesindex}
        setValuesindex={(data) => setValuesindex(data)}
        fields={fields}
        setFields={(data) => setFields(data)}
        valuesaddress={valuesaddress}
        setValuesaddress={(data) => setValuesaddress(data)}
        valuesaddressdisable={valuesaddressdisable}
        setValuesaddressdisable={(data) => setValuesaddressdisable(data)}
        valuesaddressname={valuesaddressname}
        setValuesaddressname={(data) => setValuesaddressname(data)}
        valuesaddressrequired={valuesaddressrequired}
        setValuesaddressrequired={(data) => setValuesaddressrequired(data)}
        actions={actions}
        setActions={(data) => setActions(data)}
        openmodal={openmodal}
        setOpenmodal={(data) => setOpenmodal(data)}
        fieldsauto={fieldsauto}
        setFieldsauto={(data) => setFieldsauto(data)}
        onupdate={onupdate}
        setOnupdate={(data) => setOnupdate(data)}
        events={events}
        setEvents={(data) => setEvents(data)}
      />
      <Modal backdrop="static" size="xl" show={showmapa} centered={true} onHide={handleClosemapa}>
        <Modal.Header className="h5" closeButton>
          <i className={'feather icon-map'} />
          &nbsp;Visualização do Mapa
        </Modal.Header>
        <ModalBody>
          <Row
            style={{
              marginTop: '5px',
              marginLeft: '5px',
              marginRight: '5px',
              marginBottom: '5px',
              height: '540px',
              textAlign: 'center'
            }}
          >
            {location !== undefined && location.length > 0 ? (
              <GoogleMap
                bootstrapURLKeys={{ key: Decode64(localStorage.getItem('apikey_maps')) }}
                defaultCenter={{ lat: location[0].lat, lng: location[0].lng }}
                defaultZoom={17}
              >
                {location.map((item, index) => (
                  <AnyReactComponent key={index} lat={item.lat} lng={item.lng} text={item.text} />
                ))}
              </GoogleMap>
            ) : (
              <></>
            )}
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button id="btnFechar" className="btn btn-primary shadow-2 mb-2" onClick={handleClosemapa}>
            <i className={'feather icon-x-circle'} />
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default InforSite;
