class helperMethod {
    public groupBy = (arrayInput: any[], key: string) => {
        return arrayInput.reduce((result, currentValue) => {
          //push the present key to the array, otherwise create an array then push the object
          (result[currentValue[key]] = result[currentValue[key]] || [])
            .push(currentValue);
          return result;
        }, {}); 
      };
}

export default helperMethod;
