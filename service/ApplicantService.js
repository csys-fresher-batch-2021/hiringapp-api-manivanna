let ApplicantDao = require('../dao/ApplicantDao.js');
let InputValidator = require('../validator/InputValidator.js');

class ApplicantService{
    /**
     * Function to add new applicant.
     * @param {*} name 
     * @param {*} email 
     * @param {*} password 
     */
    static async addNewApplicant(applicant){
        let name = applicant.name;
        let email = applicant.email;
        let password = applicant.password;
        let isValidName = InputValidator.validateName(name);
        let isValidEmail = InputValidator.validateEmail(email);
        let isValidPassword = InputValidator.validatePassword(password);
        if(!isValidName){
            throw new Error("Invalid Name, Name should only contains alphabets and spaces");
        } else if (!isValidEmail){
            throw new Error("Invalid Email address");
        } else if(!isValidPassword){
            throw new Error("Invalid Password, password should have at least 8 characters");
        }
        let result = await ApplicantDao.findOne(email);
        if(result.length == 0){
            return ApplicantDao.save(name, email, password);
        } else{
            throw new Error("Email address already in use");
        }
    }

    /**
     * Function to authenticate user.
     * @param {*} email 
     * @param {*} password 
     */
    static authenticateUser(user){
        let email = user.email;
        let password = user.password;
        return ApplicantDao.authenticateUser(email, password);
    }

    /**
     * Function to get an applicant profile details.
     * @param {*} req 
     * @param {*} res 
     */
    static async getProfile(email){
        return ApplicantDao.findOne(email);
    }

    /**
     * Function to update an applicant profile details.
     * @param {*} req 
     * @param {*} res 
     */
    static async updateProfile(email, data){
        let isInValidName = InputValidator.checkEmptyData(data.name);
        let isInValidMobile = InputValidator.checkEmptyData(data.mobile);
        let isInValidAddress = InputValidator.checkEmptyData(data.address);
        let isValidYop = InputValidator.validateYearOfPassing(data.yop);
        let isValidExperience = InputValidator.validExperienceYear(data.experience);

        if(isInValidName){
            throw new Error("Invalid Name");
        } else if(isInValidMobile){
            throw new Error("Invalid Mobile number");
        } else if(!isValidYop){
            throw new Error("Invalid Year of Passing");
        } else if(!isValidExperience){
            throw new Error("Invalid Experience");
        } else if(isInValidAddress){
            throw new Error("Invalid Address");
        }
        return ApplicantDao.update(email, data);
    }
}

module.exports = ApplicantService;