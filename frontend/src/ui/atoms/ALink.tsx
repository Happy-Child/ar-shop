import React, { ReactNode } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { createStyles, makeStyles } from '@material-ui/core/styles';

interface IALinkProps {
  to: string | object;
  children: any;
  className?: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      display: 'block',

      '&:hover:not(.a-link_active)': {
        opacity: 0.8,
      },
    },
  }),
);

const defaultClassName = 'a-link';

const ALink: React.FC<IALinkProps> = ({ to, children, className }: IALinkProps) => {
  const styles = useStyles();

  const location: Location = useLocation();
  const isActive = location.pathname === to;

  const classesArray: Array<string> = [defaultClassName, styles.link];

  if (className) {
    classesArray.push(className);
  }

  const totalClassName: string = classesArray.join(' ');

  return isActive ? (
    <div className={`${totalClassName} a-link_active`}>{children}</div>
  ) : (
    <RouterLink to={to} className={totalClassName}>
      {children}
    </RouterLink>
  );
};

export default ALink;
