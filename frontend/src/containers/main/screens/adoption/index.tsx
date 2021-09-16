import React from 'react';
import { useSelector } from 'react-redux';

import { fromUser } from '../../../../store';
import AdoptionShelterNavigator from './AdoptionShelterNavigator';
import AdoptionUser from './AdoptionUser';

const Adoption = () => {
  const isShelter = useSelector(fromUser.selectIsShelter);

  return isShelter ? <AdoptionShelterNavigator /> : <AdoptionUser />;
};

export default Adoption;
