import React from 'react'
import { Select } from '@material-ui/core';

export default  ({onChange ,option,values,className})=>{
    // const defaultValue = (option,values)=>{
    //     return option ? option.find(option=>option.values===values):"active"
       
    // }
    // console.log("hehe "+ values);
    // console.log("hihi "+ option);

    const handelSelectedOptionChange = (selectedOption)=>{
        const selectedValue = selectedOption ? selectedOption.value:selectedOption;
        const changEvent = {
            option : option,
            values: selectedValue
        };
        option.onChange(changEvent);
    }
   
    return(
        
        <div className={className}>
        <Select
        variant="outlined"
        onChange={handelSelectedOptionChange}
        option={option}>
        </Select>
        </div>
    )
}