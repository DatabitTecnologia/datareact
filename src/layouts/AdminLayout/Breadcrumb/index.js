import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import navigation from '../../../menu-items';
import { BASE_TITLE } from '../../../config/constant';

const Breadcrumb = () => {
  const location = useLocation();

  const [main, setMain] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('user') === undefined || sessionStorage.getItem('user') === '') {
      navigation.items.map((item, index) => {
        if (item.type && item.type === 'group') {
          getCollapse(item, index);
          console.log(item);
        }
        return false;
      });
    }
  });

  const getCollapse = (item, index) => {
    if (item.children) {
      item.children.filter((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse, index);
        } else if (collapse.type && collapse.type === 'item') {
          if (location.pathname === collapse.url) {
            setMain(item);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  let mainContent, itemContent;
  let breadcrumbContent = '';
  let title = '';

  if (main && main.type === 'collapse') {
    mainContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{main.title}</Link>
      </ListGroup.Item>
    );
  }
  console.log(item);
  if (item && item.type === 'item') {
    title = item.title;
    itemContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{title}</Link>
      </ListGroup.Item>
    );

    /*if (item.breadcrumbs !== false) {
      console.log(item);
      breadcrumbContent = (
        <div className="page-header">
          <div className="page-block">
            <div className="row align-items-center">
              <div className="col-md-12">
                <ListGroup as="ul" bsPrefix=" " className="breadcrumb">
                  <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
                    <Link to="/">
                      <i className="bi bi-airplane" />
                    </Link>
                  </ListGroup.Item>
                  {mainContent}
                  {itemContent}
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      );
    }*/

    document.title = title + BASE_TITLE;
  }

  return <React.Fragment>{breadcrumbContent}</React.Fragment>;
};

export default Breadcrumb;
