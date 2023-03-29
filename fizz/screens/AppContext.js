import React, { useState, createContext } from "react";


export const FizzContext = createContext(null);
 
const item_desc = {
  Item_Name_Eng : '',
  Item_Name_Arb : '',
  Price : '',
  product_image_url : '',
  product_large_image_url : '',
}

const AppContext = ({children}) => {
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [dataSet, setDataSet] = useState([]);


 
  return (
    <FizzContext.Provider value={{ category, setCategory, dataSet,setDataSet }}>
      {children}
    </FizzContext.Provider>
  );
};

export default AppContext;
