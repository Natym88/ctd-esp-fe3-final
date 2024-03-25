import React, { ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';

interface cardProps {
    children: ReactNode;
}
const MyCard = ({children}: cardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default MyCard;
