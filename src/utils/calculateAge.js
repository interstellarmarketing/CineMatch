import React from 'react'

const calculateAge = (birthday) => {
    const date = new Date(birthday);

    if (isNaN(date.getTime())) {
        return ['Invalid Date', NaN]; // Return in case of an invalid date
    }


    // Format the date as "July 10, 2001"x
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();

    // Adjust the age if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
    }

    // Return the formatted date and age as an array
    const result = [formattedDate, age];
    console.log(result);
    return result;  
}

export default calculateAge;