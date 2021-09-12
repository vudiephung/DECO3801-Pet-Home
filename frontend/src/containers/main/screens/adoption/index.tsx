import React from 'react';
import { useSelector } from 'react-redux';

import { fromUser } from '../../../../store';
import AdoptionShelter from './Adoption-Shelter';
import AdoptionUser from './Adoption-User';

const Adoption = ({ navigation }: any) => {
  const isShelter = useSelector(fromUser.selectIsShelter);

  return isShelter ? <AdoptionShelter navigation={navigation} /> : <AdoptionUser />;
};

export default Adoption;
