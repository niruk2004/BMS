import UserDetailBlock from "../UI/UserDetails/UserDetailBlock"
import { useSelector } from "react-redux";

export default function Details({userType}) {
    const client = useSelector(state=>state.client.client);
    const employee = useSelector(state=>state.employee.employee);
    var personalInfo,contactInfo,creationTime,lastLogin,employeeDetails;

    if(userType=='client'){
        personalInfo = client.personalInfo;
        contactInfo = client.contactInfo;
        creationTime = client.createdTime;
        lastLogin = client.lastLoginTime;
    }else{
        personalInfo=employee.personalInfo;
        contactInfo=employee.contactInfo;
        creationTime=employee.createdTime;
        lastLogin=employee.lastLoginTime;
        employeeDetails=employee.employeeDetails
    }
    
    
    const personalInfoArray = [
        {label:'ID',value:client.clientId},
        {label:'First_Name',value:personalInfo.firstName},
        {label:'Last_Name',value:personalInfo.lastName},
        {label:'Date Of Birth',value:personalInfo.DOB},
    ]
    
    const contactInfoArray =[
        {label:'Phone-no',value:contactInfo.phone},
        {label:'E-mail',value:contactInfo.email},
        {label:'Address',value:contactInfo.address},
    ]
   
    var employeeDetailsArray; 
    if(userType=='employee'){
        employeeDetailsArray=[
            {label:'Bank_Branch',value:employeeDetails.branch},
            {label:'Position',value:employeeDetails.position}
        ]
    }
    
    return (
        <>
            <UserDetailBlock datas={personalInfoArray} title={'PERSONAL DETAILS'} />
            <UserDetailBlock datas={contactInfoArray} title={'CONTACT INFO'} />
            {userType==='employee' && <UserDetailBlock datas={employeeDetailsArray} title={'EMPLOYEE INFO'}/>}
           

        </>
    )
}