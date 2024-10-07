export const validateEmail = (email) => {
    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    
    if(!isEmail) {
        return "Email is not valid";
    }

    return null
}

export const validatePassword = (password) => {
    const isPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    
    if(!isPassword) {
        return "Password is not valid";
    }
    
    return null;

}

export const validateFullName = (fullName) => {
    const isFullName = /^[a-zA-Z\s]*$/.test(fullName);
    
    if(!isFullName) {
        return "Full Name is not valid";
    }
    
    return null;
}