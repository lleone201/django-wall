const updateObj = (oldObj, updatedProperties) => {
  return {
    //Use spread to return all the properties from the old object as well as the updated properties
    ...oldObj,
    ...updatedProperties,
  };
};

export default updateObj;
