import React from 'react';
import _uniqueId from 'lodash/uniqueId';

import './Card.scss';

import Logo from 'data/imgs/logo.svg';
import { Link } from 'react-router-dom';

export default function Card({
  className = '',
  logo = Logo,
  title = { value: '', pos: 'top', size: 'lg' },
  description = { value: '', size: 'sm' },
  contents = [],
  actions = []
}: ICard) {
  // Defaults
  if (!title.value) {
    title.value = '';
  }
  if (!title.pos) {
    title.pos = 'top';
  }
  if (!title.size) {
    title.size = 'lg';
  }

  if (!description.value) {
    description.value = '';
  }
  if (!description.size) {
    description.size = 'sm';
  }

  // TODO: Title & Description should be optionals. And other options should be available to enable customization.

  let response = <></>;

  switch (title.pos) {
    case 'top':
      response = (
        <>
          <span className={`title ${title.size}`}>{title.value}</span>
          <span className={description.size}>{description.value}</span>
        </>
      );
      break;

    case 'bottom':
      response = (
        <>
          <span className={description.size}>{description.value}</span>
          <span className={`title ${title.size}`}>{title.value}</span>
        </>
      );
      break;
  }

  return (
    <div className={`info-card ${className}`}>
      <div className="info">
        <span className="header">
          <img alt="owiki" className="logo" src={logo} />
          <span className="response">{response}</span>
        </span>
      </div>
      <div className="contents">
        {contents.map(content => {
          return (
            <content.value.type
              {...content.value.props}
              key={_uniqueId(`content-`)}
            />
          );
        })}
      </div>
      <div className="actions">
        {actions.map(action => {
          if (action.link) {
            const actionProps = {
              key: _uniqueId(`${action.value}-`),
              className: 'button',
              to: action.link.to
            };

            return <Link {...actionProps}>{action.value}</Link>;
          }

          if (action.button) {
            const actionProps = {
              key: _uniqueId(`${action.value}-`),
              className: 'button',
              onClick: action.button.onClick
            };

            return <span {...actionProps}>{action.value}</span>;
          }

          return <></>;
        })}
      </div>
    </div>
  );
}

export interface ICard {
  className?: string;
  logo?: string;
  title?: {
    value?: string;
    pos?: 'top' | 'bottom';
    size?: 'lg' | 'md' | 'sm';
  };
  description?: {
    value?: string;
    size?: 'lg' | 'md' | 'sm';
  };
  contents?: {
    value: JSX.Element;
  }[];
  actions?: {
    value: string;
    link?: {
      to: string;
    };
    button?: {
      onClick: () => any;
    };
  }[];
}
